import React, { useState } from "react";
import { Badge, Box, Drawer, Typography, styled } from "@mui/material";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
} from "@mui/material";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AppsIcon from "@mui/icons-material/Apps";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";

import HomePage from "./home";
import CollectionPage from "./collection";
import CheckoutPage from "./checkout";
import ProfilePage from "./profile";
import { clearStorage, getPhoneNumber, getStorage, getUserInfo } from "zmp-sdk/apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { CallAndSaveZaloNumber, userInfoState, checkPhoneAccess, saveZaloInfoToCache } from "../recoil-state/userInfo-state";
import { cartTotalQuantityState } from "../recoil-state/cart-state";

const Index = () => {

  const clearData = async () => {
    try {
      await clearStorage({});
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const [value, setValue] = React.useState("home");

  const [openDrawerAccessPhone, setOpenDrawerAccessPhone] = React.useState(false);

  function toggelDrawerAccessPhone(newOpen: boolean) {
    setOpenDrawerAccessPhone(newOpen);
  }

  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  const [checkAccess, setcheckAccess] = useState(false);

  React.useEffect(() => {
    getStorage({
      keys: ["zaloNumber", "zaloIdByOA", "zaloId", "zaloName", "zaloAvatar"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { zaloNumber, zaloIdByOA, zaloId, zaloName, zaloAvatar} = data;

        setUserInfoData({
          ...userInfoData,
          phone: zaloNumber,
          idByOA: zaloIdByOA,
          id : zaloId,
          name : zaloName,
          avatar: zaloAvatar,
        })

        if(zaloNumber != "" && zaloNumber != null) {
          setcheckAccess(true)
        }
        
        console.log("zaloNumber cache", data)
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });
  }, []);
  
  const handleOpenPhoneAccess = () => {

    //Lấy zalo number và lưu vào cache
    CallAndSaveZaloNumber();

    //load Phone From Cache To Recoil;
    getStorage({
      keys: ["zaloNumber"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { zaloNumber } = data;
  
        setUserInfoData({
          ...userInfoData,
          phone: zaloNumber
        })

        if(zaloNumber != "" && zaloNumber != null ) {
          setcheckAccess(true)
        }
  
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });

    getUserInfo({
      success: (data) => {
        // xử lý khi gọi api thành công
        const { userInfo } = data;
  
        console.log('userInfo', userInfo);

        setUserInfoData({
          ...userInfoData,
          id: userInfoData.id,
          name: userInfoData.name,
          avatar: userInfoData.avatar,
        })

        saveZaloInfoToCache(userInfo.id, userInfo.idByOA, userInfo.name, userInfo.avatar)
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });

    toggelDrawerAccessPhone(false);
  };

  const handleBottomNavigation = (event: any, newValue: any) => {

    //setValue(newValue);
    if ((newValue == "profile" || newValue == "checkout") && checkAccess == false ) { // (userInfoData.phone != "" && userInfoData.phone != null))
      toggelDrawerAccessPhone(true);
    }

    if (newValue == "home" || newValue == "collection" || checkAccess == true)  { //  (userInfoData.phone != "" && userInfoData.phone != null))
      setValue(newValue);
    }

  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 5px',
    },
  }));

  const cartQuantity = useRecoilValue(cartTotalQuantityState);

  
  
  return (
    <>
      <Box>
        <Button onClick={()=> {clearData()}}>Clear Data </Button>
        <Box sx={{ marginBottom: "60px" }}>
          {value == "home" && <HomePage />}
          {value == "collection" && <CollectionPage />}
          {value == "checkout" && <CheckoutPage />}
          {value == "profile" && <ProfilePage />}
        </Box>

        <Paper
          sx={{ position: "fixed", zIndex: 99, bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) =>
              handleBottomNavigation(event, newValue)
            }
          >
            <BottomNavigationAction
              value="home"
              label="Trang chủ"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              value="collection"
              label="Danh mục"
              icon={<AppsIcon />}
            />
            <BottomNavigationAction
              value="checkout"
              label="Giỏ hàng"
              icon={<StyledBadge badgeContent={cartQuantity} color="secondary"><ShoppingBasketIcon /></StyledBadge >}
            />
            <BottomNavigationAction
              value="profile"
              label="Cá nhân"
              icon={<AccountBoxIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>

      <Drawer
        anchor="bottom"
        open={openDrawerAccessPhone}
        onClose={() => toggelDrawerAccessPhone(false)}
      >
        <Box
          sx={{
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: "25px",
            paddingLeft: "25px",
            textAlign: "center",
          }}
        >
          <img
            src="https://designs.vn/wp-content/images/09-08-2013/logo_lagi_8_resize.JPG"
            style={{ width: 56, height: 56, borderRadius: "50%" }}
          />
          <Typography variant="h6">
            Tính năng cần kích hoạt tài khoản
          </Typography>

          <Typography variant="caption">
            Cho phép CoffeeTree xác minh số điện thoại để xem đầy đủ thông tin
            và quyền lợi
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "10px" }}
            onClick={() => handleOpenPhoneAccess()}
          >
            Đã hiểu
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Index;