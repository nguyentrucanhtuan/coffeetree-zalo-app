import React, { useState } from "react";
import { Avatar, Badge, Box, Drawer, Typography, styled } from "@mui/material";

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
import { getPhoneNumber, getAccessToken, setStorage, getStorage, getUserInfo } from "zmp-sdk/apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { CallServerGetPhoneNumber, CallAndSaveZaloNumber, checkPhoneAccess, saveZaloInfoToCache, saveZaloNumberToCache, userInfoState } from "../recoil-state/userInfo-state";
import { cartTotalQuantityState } from "../recoil-state/cart-state";


const Index = () => {

  const [value, setValue] = React.useState("home");

  const [openDrawerAccessPhone, setOpenDrawerAccessPhone] = React.useState(false);

  function toggelDrawerAccessPhone(newOpen: boolean) {
    setOpenDrawerAccessPhone(newOpen);
  }

  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  const [accessTokenState, setAccessTokenState] = useState("");
  const [tokenState, setTokenState] = useState("");

  const handleOpenPhoneAccess = () => {

    //Lấy zalo number và lưu vào cache
    CallAndSaveZaloNumber();

    getStorage({
      keys: ["zaloNumber"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { zaloNumber } = data;

        setUserInfoData({
          ...userInfoData,
          phone: zaloNumber
        })
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
    if ((newValue == "profile" || newValue == "checkout") && userInfoData.phone == "") {
      toggelDrawerAccessPhone(true);
    }

    if (newValue == "home" || newValue == "collection" || userInfoData.phone != "") {
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
          {/* <img
            src="https://designs.vn/wp-content/images/09-08-2013/logo_lagi_8_resize.JPG"
            style={{ width: 56, height: 56, borderRadius: "50%" }}
          /> */}
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
