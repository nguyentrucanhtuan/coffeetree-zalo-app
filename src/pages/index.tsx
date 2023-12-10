import React from "react";
import { Badge, Box, styled } from "@mui/material";

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
import { clearStorage, getAccessToken, getStorage, getUserInfo } from "zmp-sdk/apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState, getAccessTokenZalo, CallAndSaveZaloNumber } from "../recoil-state/userInfo-state";
import { cartTotalQuantityState } from "../recoil-state/cart-state";
import { useParams } from "react-router-dom";
import TopBar from "../components/topBar";
import AccessZaloPage from "./accessZaloPage";

const Index = () => {

  getAccessTokenZalo();
  
  let { tabValue } = useParams();

  const clearData = async () => {
    try {
      await clearStorage({});
    } catch (error) {
      console.log(error);
    }
  };

  let tabDefault = "home";

  if (tabValue != null) {
    tabDefault = tabValue;
  }

  const [value, setValue] = React.useState(tabDefault);

  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  React.useEffect(() => {
    getStorage({
      keys: ["zaloNumber", "zaloIdByOA", "zaloId", "zaloName", "zaloAvatar"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { zaloNumber, zaloIdByOA, zaloId, zaloName, zaloAvatar } = data;

        setUserInfoData({
          ...userInfoData,
          phone: zaloNumber,
          idByOA: zaloIdByOA,
          id: zaloId,
          name: zaloName,
          avatar: zaloAvatar,
        })

        console.log("zalo cache", data)
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });
  }, []);

  const handleBottomNavigation = (event: any, newValue: any) => {
    setValue(newValue);
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

  if (userInfoData.phone == null) {
    return (
      <AccessZaloPage />
    )
  } else {
    return (
      <>
        <TopBar />
        <Box>
          <Button sx={{ marginTop: "50px" }} onClick={() => { clearData() }}>Clear Data</Button>
          <Box sx={{ marginBottom: "60px", marginTop: "48px" }}>
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
      </>
    );
  }
};

export default Index;