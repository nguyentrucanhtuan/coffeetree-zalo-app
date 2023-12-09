import React from "react";
import { Box, Tabs, Tab, Typography, Divider, Chip } from "@mui/material";
import { Header } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";
import {
  orderListByStatusState,
  orderListState,
} from "../recoil-state/orderList-state";
import {
  allProductListState,
  productById,
} from "../recoil-state/product-state";
import { APILink, folder_image_url } from "../recoil-state/setting";
import { useNavigate } from "react-router-dom";
import { cartTotal } from "../recoil-state/cart-state";
import AppLoading from "../components/loading";

export default function OrderListPage() {
  const [loading, setLoading] = React.useState(true);
  const [statusOrderTab, setStatusOrderTab] = React.useState("all");

  const handleChange = (event: React.SyntheticEvent, value: string) => {
    setStatusOrderTab(value);
  };

  const userInfoData = useRecoilValue(userInfoState);
  const [listOrderRecoil, setListOrderRecoil] = useRecoilState(orderListState);

  const linkOrderAPI = APILink + "/order_list";

  React.useEffect(() => {
    fetch(linkOrderAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zalo_number: userInfoData.phone }),
    })
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .then((response) => {
        setListOrderRecoil(response);
      });
  }, []);

  const listOrderByStatus = useRecoilValue(
    orderListByStatusState(statusOrderTab)
  );

  let listOrder: any = [];

  if (statusOrderTab == "all") {
    listOrder = listOrderRecoil;
  } else {
    listOrder = listOrderByStatus;
  }

  const productAllList = useRecoilValue(allProductListState);

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Header title="Lịch sử đơn hàng" />
      <Box sx={{ bgcolor: "background.paper", marginTop: "43px" }}>
        <Tabs
          value={statusOrderTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="all" label="Tất cả" />
          <Tab value="pending" label="Chờ thanh toán" />
          <Tab value="processing" label="Đang giao" />
          <Tab value="completed" label="Hoàn thành" />
          <Tab value="declined" label="Đã hủy" />
        </Tabs>
      </Box>

      {loading ? (
        <AppLoading />
      ) : (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          {listOrder.map((order: any) => {
            const orderCart = JSON.parse(order.cart);
            let quantity = 0;
            const totalPrice = cartTotal(orderCart);

            for (var i = 0; i < orderCart.length; i++) {
              quantity += Number(orderCart[i].quantity);
            }

            const productFirst = productById(
              productAllList,
              Number(orderCart[0].product_id)
            );

            let colorStatus = "#f44336";
            let colorBackgroundStatus = "#ffebee";
            let orderStatus = "Chờ xác nhận";

            if (order.status == "pending") {
              colorStatus = "#f44336";
              colorBackgroundStatus = "#ffebee";
              orderStatus = "Chờ xác nhận";
            }

            if (order.status == "processing") {
              colorStatus = "#2196f3";
              colorBackgroundStatus = "#e3f2fd";
              orderStatus = "Đang sử lý";
            }

            if (order.status == "completed") {
              colorStatus = "#009688";
              colorBackgroundStatus = "#e0f2f1";
              orderStatus = "Đã hoàn thành";
            }

            if (order.status == "declined") {
              colorStatus = "#607d8b";
              colorBackgroundStatus = "#eceff1";
              orderStatus = "Đã hủy";
            }

            return (
              <Box
                key={order.id}
                onClick={() => navigate(`/checkout_success/${order.id}`)}
              >
                <Divider sx={{ borderWidth: "4px" }} />
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "5px",
                      paddingLeft: "15px",
                      paddingRight: "10px",
                    }}
                  >
                    <Typography variant="subtitle2">A00{order.id}</Typography>
                    <span
                      style={{
                        color: colorStatus,
                        background: colorBackgroundStatus,
                        fontSize: "11px",
                        fontWeight: "bold",
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        border: "1px solid",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        borderRadius: "16px",
                      }}
                    >
                      {orderStatus}
                    </span>
                  </Box>

                  <Box sx={{ display: "flex", padding: "10px" }}>
                    <img
                      src={folder_image_url + productFirst[0].images}
                      style={{ width: 80, height: 80 }}
                    />
                    <Box sx={{ padding: "8px" }}>
                      <Typography variant="subtitle2">
                        {productFirst[0].name}
                      </Typography>
                      <Typography variant="body2">
                        {quantity} sản phẩm
                      </Typography>
                      <Typography variant="caption">
                        Tổng {currencyFormat.format(totalPrice + 25000)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
