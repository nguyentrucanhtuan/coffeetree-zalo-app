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
import { clearStorage, getAccessToken, getStorage, getUserID, getUserInfo } from "zmp-sdk/apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState, saveZaloInfoToCache } from "../recoil-state/userInfo-state";
import { cartTotalQuantityState } from "../recoil-state/cart-state";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/topBar";
import DrawerPhoneAccess from "../components/drawerPhoneAccess";

const Index = () => {

  const [openDrawerAccessPhone, setOpenDrawerAccessPhone] = React.useState(false);
  let { tabParam } = useParams();

  const clearData = async () => {
    try {
      await clearStorage({});
    } catch (error) {
      console.log(error);
    }
  };

  let tabDefault = "home";
  if (tabParam != null) {
    tabDefault = tabParam;
  }

  const [tab, setTab] = React.useState(tabDefault);
  const [tabRedirect, setTabRedirect] = React.useState();
  const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

  const [zaloLogin, setZaloLogin] = React.useState(false);

  React.useEffect(() => {
    
    getStorage({
      keys: ["zaloNumber"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { zaloNumber } = data;

        setUserInfoData({
          ...userInfoData,
          phone: zaloNumber
        })
        
        if(zaloNumber != null && zaloNumber != ""){
          setZaloLogin(true);
        }
        
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });
    
    console.log('userInfoData.phone', userInfoData.phone);
    console.log('zaloLogin', zaloLogin);

    getAccessToken({
      success: (accessToken) => {
        // xử lý khi gọi api thành công
        getUserInfo({
          success: (data) => {
            const { userInfo } = data;
            setUserInfoData({
              ...userInfoData,
              id: userInfo.id,
              name: userInfo.name,
              avatar: userInfo.avatar,
              idByOA: userInfo.idByOA
            })
            //console.log('getUserInfo', userInfo);
            saveZaloInfoToCache(userInfo.id, userInfo.idByOA, userInfo.name, userInfo.avatar)
          },
          fail: (error) => {
            console.log(error);
          }
        });
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      }
    });

  }, [zaloLogin]);

  const handleBottomNavigation = (event: any, newTab: any) => {
    if((newTab == "checkout" || newTab == "profile") && zaloLogin == false) {
      setTabRedirect(newTab);
      setOpenDrawerAccessPhone(true);
    } else {
      setTab(newTab);
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

  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <Box>
        {/* <Button sx={{ marginTop: "50px" }} onClick={() => navigate(`/checkout_success/139`)}> Test Link</Button> */}
        {/* <Button sx={{ marginTop: "50px" }} onClick={() => { clearData() }}>Clear Data</Button> */}
        <Box sx={{ marginBottom: "60px", marginTop: "48px" }}>
          {tab == "home" && <HomePage />}
          {tab == "collection" && <CollectionPage />}
          {tab == "checkout" && <CheckoutPage />}
          {tab == "profile" && <ProfilePage />}
        </Box>
        <Paper
          sx={{ position: "fixed", zIndex: 99, bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={tab}
            onChange={(event, newTab) =>
              handleBottomNavigation(event, newTab)
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

      <DrawerPhoneAccess 
        open={openDrawerAccessPhone} 
        setOpenDrawerAccessPhone={setOpenDrawerAccessPhone} 
        setZaloLogin={setZaloLogin}
        setTab={setTab}
        tabRedirect={tabRedirect}
      />
    </>
  );

};

export default Index;