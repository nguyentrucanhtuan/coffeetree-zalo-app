import React from 'react';

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

import { useNavigate } from "react-router";

export default function AppBottomNavigation() {

  const [value, setValue] = React.useState("home");
  
  const navigate = useNavigate();

  console.log(value);

  return (
    <Paper sx={{ position: 'fixed', zIndex: 99, bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction value="home" label="Trang chủ" icon={<HomeIcon />} onClick = {() => navigate('/')} />
        <BottomNavigationAction value="collection" label="Danh mục" icon={<AppsIcon />} onClick = {() => navigate('/collection')} />
        <BottomNavigationAction value="cart" label="Giỏ hàng" icon={<ShoppingBasketIcon />} onClick = {() => navigate('/checkout')} />
        <BottomNavigationAction value="profile" label="Cá nhân" icon={<AccountBoxIcon />} onClick = {() => navigate('/profile')} />
      </BottomNavigation>
    </Paper>
  );
}