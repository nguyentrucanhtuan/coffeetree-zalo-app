import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HomeIcon from "@mui/icons-material/Home";
import { openChat } from "zmp-sdk/apis";
import { useRecoilValue } from "recoil";
import { APILink, folder_image_url } from "../recoil-state/setting";
import {
  allProductListState,
  productById,
} from "../recoil-state/product-state";
import { cartTotal } from "../recoil-state/cart-state";
import { Header } from "zmp-ui";
import { paymentMethodByIdState } from "../recoil-state/payment-state";

import chatIcon from "../static/chat-icon.png";
import AppLoading from "../components/loading";

const zaloOAId = "1610121007405920472";

export default function CheckoutSuccessPage() {
  let { orderId } = useParams();

  const [loading, setLoading] = React.useState(true);

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const navigate = useNavigate();

  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: zaloOAId,
        message: "Xin Chào, Tôi muốn hỏi về đơn hàng A00" + orderId,
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const linkOrderAPI = APILink + "/order";

  const [orderInfo, setOrderInfo] = React.useState([]);
  const [cartList, setCartList] = React.useState([]);

  React.useEffect(() => {
    fetch(linkOrderAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id: orderId }),
    })
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .then((response) => {
        setOrderInfo(response[0]);
        setCartList(JSON.parse(response[0].cart));
      });
  }, []);

  const productAllList = useRecoilValue(allProductListState);

  const cartTotalPrice = cartTotal(cartList);

  const paymentType = useRecoilValue(
    paymentMethodByIdState(orderInfo?.payment_id)
  );

  return (
    <Box>
      <Header title="Chi tiết đơn hàng" />

      {loading ? (
        <AppLoading />
      ) : (
        <Box sx={{ backgroundColor: "#fff" }}>
          <Paper
            elevation={2}
            sx={{ margin: "10px", marginTop: "50px", padding: "10px" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="subtitle2">
                Thông tin người nhận hàng
              </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <AccountBoxIcon />
              <Box sx={{ marginLeft: "5px", display: "flex" }}>
                <Typography variant="subtitle2">
                  {orderInfo?.fullname} - {orderInfo?.phone}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              <FmdGoodIcon />
              <Box sx={{ marginLeft: "5px" }}>
                <Typography variant="caption">{orderInfo?.address}</Typography>
              </Box>
            </Box>
          </Paper>
          <Divider />
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ paddingLeft: "15px", paddingTop: "10px" }}
            >
              Danh sách giỏ hàng
            </Typography>

            {cartList?.map((item: any, index) => {
              const product = productById(
                productAllList,
                Number(item.product_id)
              )[0];
              let totalTopping = 0;

              return (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{ paddingTop: "4px", paddingBottom: "4px" }}
                >
                  <Card sx={{ display: "flex", width: "100%" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80 }}
                      image={folder_image_url + product.images}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          padding: "0px",
                          paddingTop: "8px",
                          paddingLeft: "5px",
                          flex: "1 0 auto",
                        }}
                      >
                        <Typography component="div" variant="subtitle2">
                          {product.name} x {item.quantity}
                        </Typography>

                        <Stack direction="row" spacing={0.3}>
                          {item.addon.map((item: any, i: number) => {
                            const topping = productById(
                              productAllList,
                              Number(item.product_id)
                            )[0];
                            totalTopping += Number(topping.price);
                            return (
                              <Chip
                                key={i}
                                size="small"
                                label={topping.name}
                                variant="outlined"
                              />
                            );
                          })}
                        </Stack>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="div"
                        >
                          {currencyFormat.format(
                            Number(item.price) + totalTopping
                          )}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </ListItem>
              );
            })}
          </Box>
          <Divider />
          <Box>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Tạm tính</Typography>
              <Typography variant="body1">
                {currencyFormat.format(cartTotalPrice)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Phí vận chuyển</Typography>
              <Typography variant="body1">
                {currencyFormat.format(25000)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Tổng cộng</Typography>
              <Typography variant="body1">
                {currencyFormat.format(cartTotalPrice + 25000)}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ margin: "10px" }}>
            <Typography
              variant="subtitle2"
              sx={{ paddingLeft: "10px", paddingTop: "10px" }}
            >
              Phương thức thanh toán
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ paddingLeft: "10px" }}>
                  <img
                    src={folder_image_url + paymentType[0]?.image}
                    width="40"
                    height="40"
                  />
                </Box>
                <Box sx={{ paddingTop: "10px", paddingLeft: "15px" }}>
                  <Typography variant="subtitle2">
                    {paymentType[0]?.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1">
                {paymentType[0]?.description}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ paddingLeft: "10px" }}>
                <img width="64" height="64" src={chatIcon} />
              </Box>
              <Box
                sx={{
                  paddingTop: "10px",
                  paddingLeft: "15px",
                  paddingRight: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => openChatScreen()}
                >
                  Chat với hỗ trợ
                </Button>
                <Typography sx={{ marginTop: "5px" }} variant="body1">
                  Nếu bạn có vấn đề về sản phẩm, vận chuyển, trả hàng & hoàn
                  tiền
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: "15px" }}>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              variant="outlined"
              fullWidth
            >
              Trở về trang chủ
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
