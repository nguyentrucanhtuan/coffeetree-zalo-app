import React, { useState } from "react";
import { Avatar, Box, Drawer, Typography } from "@mui/material";

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
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";


const Index = () => {
  const [value, setValue] = React.useState("home");

  

  const [openDrawerAccessPhone, setOpenDrawerAccessPhone] =
    React.useState(false);

  function toggelDrawerAccessPhone(newOpen: boolean) {
    setOpenDrawerAccessPhone(newOpen);
  }


  const [accessTokenState, setAccessTokenState] = useState("");
  const [tokenState, setTokenState] = useState("");


  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);



  const handleOpenPhoneAccess = () => {

    getAccessToken({
      success: (accessToken) => {
        // xử lý khi gọi api thành công
        console.log('accessToken nè', accessToken);

        setAccessTokenState(accessToken);
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });

    getPhoneNumber({
      success: async (data) => {
        let { token } = data;

        setTokenState(token);

        toggelDrawerAccessPhone(false);

        console.log("data zalo token", token);
      },
      fail: (error) => {
        // Xử lý khi gọi api thất bại
        console.log(error);
      },
    });

    const zaloData = { access_token: accessTokenState, code: tokenState };

    fetch('https://order.coffeetree.vn/api/get_phone_number_by_zalo_token', {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(zaloData)

    }).then((response) => {

      console.log('response from coffeetree server', response);

      return response.json();

    }).then((res) => {

      console.log('data server', res)
      console.log('so dien thoai', res.data.number);

      setStorage({
        data: {
          zaloPhone: res.data.number,
        },
        success: (data) => {
          //Lưu vào Recoil State
          setUserInfoData({
            id: null,
            idByOA: null,
            name: null,
            avatar: null,
            phone: res.data.number,
          });

          const { errorKeys } = data;
          console.log("errorKeys Luu zalo phone", errorKeys);
        },
        fail: (error) => {
          console.log(error);
        },
      });

      getStorage({
        keys: ["zaloPhone"],
        success: (data) => {
          //Lưu vào Recoil State
          console.log('data.zaloPhone', data.zaloPhone);
          setUserInfoData({
            id: null,
            idByOA: null,
            name: null,
            avatar: null,
            phone: data.zaloPhone,
          });
        },
        fail: (error) => {
          console.log(error);
        },
      });

      getUserInfo({
        success: (data) => {
          // xử lý khi gọi api thành công
          const { userInfo } = data;

          setUserInfoData({
            ...userInfoData,
            id: userInfo.id,
            name: userInfo.name,
            avatar: userInfo.avatar,
            idByOA: userInfo.idByOA
          })

          console.log('userInfo', userInfo);
        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        }
      });
    })

  };

  let checkAccessPhone = false;

  if(userInfoData.phone != null || userInfoData.phone != ''){
    checkAccessPhone = true;
  }

  const handleBottomNavigation = (event: any, newValue: any) => {
    setValue(newValue);

    if (newValue == "profile" || newValue == "checkout" && checkAccessPhone == false) {
      toggelDrawerAccessPhone(true);
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: "60px" }}>
          {value == "home" && <HomePage />}
          {value == "collection" && <CollectionPage />}
          {value == "checkout" && checkAccessPhone && <CheckoutPage />}
          {value == "profile" && checkAccessPhone && <ProfilePage />}
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
              icon={<ShoppingBasketIcon />}
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
