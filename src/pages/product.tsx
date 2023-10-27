import React from "react";
import { useParams } from "react-router-dom";
import { Box, Paper, Button, Typography, Divider, Drawer } from "@mui/material";
import { useRecoilValue } from "recoil";
import { allProductListState } from "../recoil-state/product-state";
import ProductPicker from "../components/productPicker";
import { Header } from "zmp-ui";
import { folder_image_url } from "../recoil-state/setting";

export default function ProductPage() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  function toggleDrawer(newOpen: boolean) {
    setOpenDrawer(newOpen);
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
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {currentProduct?.description}
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => {
              toggleDrawer(true);
            }}
            variant="contained"
            size="large"
            color="success"
            sx={{ margin: "5px", width: "100%" }}
          >
            Mua ngay
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
    </>
  );
}
