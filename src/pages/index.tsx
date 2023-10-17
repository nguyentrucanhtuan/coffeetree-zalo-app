import React from "react";
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
import { getPhoneNumber } from "zmp-sdk/apis";

const Index = () => {
  const [value, setValue] = React.useState("home");
  const [checkAccess, setCheckAccess] = React.useState(false);

  const handleBottomNavigation = (event: any, newValue: any) => {
    setValue(newValue);

    if (newValue == "profile" || newValue == "checkout") {
      toggelDrawerAccessPhone(true);
    }
  };

  const [openDrawerAccessPhone, setOpenDrawerAccessPhone] =
    React.useState(false);

  function toggelDrawerAccessPhone(newOpen: boolean) {
    setOpenDrawerAccessPhone(newOpen);
  }

  const handleOpenPhoneAccess = () => {
    getPhoneNumber({
      success: async (data) => {
        let { token } = data;

        toggelDrawerAccessPhone(false);

        setCheckAccess(true);

        console.log("data zalo", data);
      },
      fail: (error) => {
        // Xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: "60px" }}>
          {value == "home" && <HomePage />}
          {value == "collection" && <CollectionPage />}
          {value == "checkout" && checkAccess && <CheckoutPage />}
          {value == "profile" && checkAccess && <ProfilePage />}
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
