import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Button, Typography, Divider, Drawer, styled, Badge } from "@mui/material";
import { useRecoilValue } from "recoil";
import { allProductListState } from "../recoil-state/product-state";
import ProductPicker from "../components/productPicker";
import { Header } from "zmp-ui";
import { folder_image_url } from "../recoil-state/setting";
import { getStorage } from "zmp-sdk";
import { userInfoState } from "../recoil-state/userInfo-state";
import DrawerPhoneAccess from "../components/drawerPhoneAcess";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { cartTotalQuantityState } from "../recoil-state/cart-state";

export default function ProductPage() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDrawerAccessPhone, setOpenDrawerAccessPhone] = React.useState(false);

  function toggleDrawer(newOpen: boolean) {
    setOpenDrawer(newOpen);
  }

  const userInfo = useRecoilValue(userInfoState);

  const handleClickOrder = () => {

    // if(userInfo.phone == null || userInfo.phone == "") {
    //   setOpenDrawerAccessPhone(true);
    // } else {
    //   toggleDrawer(true)
    // }

    toggleDrawer(true)
  }

  let { productId } = useParams();

  const allProductList = useRecoilValue(allProductListState);

  const currentProduct = allProductList.find(
    (item) => Number(item.id) === Number(productId),
  );

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const navigate = useNavigate();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 2,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 5px',
    },
  }));
  
  const cartQuantity = useRecoilValue(cartTotalQuantityState);

  return (
    <>
      <Header title="Chi tiết sản phẩm" />
      <Box sx={{ marginBottom: "55px", marginTop: "43px" }}>
        <img
          src={folder_image_url + currentProduct?.images}
          style={{ width: "100%" }}
        />
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h5" sx={{ marginBottom: "10px" }}>
            {currentProduct?.name}
          </Typography>
          <Typography variant="h6">
            {currencyFormat.format(currentProduct?.price)}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "10px" }}>
            <div dangerouslySetInnerHTML={{__html: currentProduct?.description}} />
        </Box>
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box sx={{ display: "flex" }}>

          <Button
            onClick={() => {
              navigate('/index/checkout')
            }}
            variant="outlined"
            size="large"
            startIcon={<StyledBadge badgeContent={cartQuantity} color="secondary"><ShoppingBasketIcon /></StyledBadge >}
            sx={{ margin: "5px", width: "100%" }}
          >
            Giỏ hàng
          </Button>
          <Button
            onClick={() => {
              handleClickOrder();
            }}
            variant="contained"
            size="large"
            color="success"
            sx={{ margin: "5px", width: "100%" }}
          >
            Thêm vào giỏ
          </Button>
        </Box>
      </Paper>

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <ProductPicker product={currentProduct} toggleDrawer={toggleDrawer} />
      </Drawer>

      <DrawerPhoneAccess open={openDrawerAccessPhone} setOpenDrawerAccessPhone={setOpenDrawerAccessPhone} setOpenDrawer={setOpenDrawer}/>
    </>
  );
}
