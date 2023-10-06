import React from "react";
import {
  Box
} from '@mui/material';

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper
}
  from '@mui/material';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AppsIcon from '@mui/icons-material/Apps';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';

import HomePage from "./home";
import CollectionPage from "./collection";
import CheckoutPage from "./checkout";
import ProfilePage from "./profile";

const Index = () => {

  const [value, setValue] = React.useState("home");

  return (
    <Box>
      <Box sx={{ marginBottom: "60px" }}>
        {value == "home" && <HomePage />}
        {value == "collection" && <CollectionPage />}
        {value == "checkout" && <CheckoutPage />}
        {value == "profile" && <ProfilePage />}
      </Box>

      <Paper sx={{ position: 'fixed', zIndex: 99, bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value="home" label="Trang chủ" icon={<HomeIcon />} />
          <BottomNavigationAction value="collection" label="Danh mục" icon={<AppsIcon />} />
          <BottomNavigationAction value="checkout" label="Giỏ hàng" icon={<ShoppingBasketIcon />} />
          <BottomNavigationAction value="profile" label="Cá nhân" icon={<AccountBoxIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Index;