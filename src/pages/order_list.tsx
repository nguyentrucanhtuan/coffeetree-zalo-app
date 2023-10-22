import React from "react";
import { Box, Tabs, Tab, Typography, Divider, Chip } from "@mui/material";
import { Header } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";
import { orderListByStatusState, orderListByZaloNumberState } from "../recoil-state/orderList-state";
import { allProductListState, productById, productPublicListState } from "../recoil-state/product-state";
import { folder_image_url } from "../recoil-state/setting";

export default function OrderListPage() {

    const [curentTab, setCurentTab] = React.useState("all");

    const handleChange = (event: React.SyntheticEvent, value: string) => {
        setCurentTab(value);
    }

    const userInfoData = useRecoilValue(userInfoState);
    const listOrderAll = useRecoilValue(orderListByZaloNumberState(userInfoData.phone));
    const listOrderByStatus = useRecoilValue(orderListByStatusState({ zaloNumber: userInfoData.phone, status: curentTab }));

    let listOrder = [];

    if (curentTab == "all") {
        listOrder = listOrderAll;
    } else {
        listOrder = listOrderByStatus;
    }

    const productAllList = useRecoilValue(allProductListState);

    const currencyFormat = new Intl.NumberFormat("de-DE", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <Box sx={{ width: "100%" }}>
            <Header title="Lịch sử đơn hàng" />
            <Box sx={{ bgcolor: "background.paper", marginTop: "43px" }}>
                <Tabs
                    value={curentTab}
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

            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                {listOrder.map((order: any) => {

                    const orderCart = JSON.parse(order.cart);
                    let quantity = 0;
                    let total = 0;

                    for (var i = 0; i < orderCart.length; i++) {
                        quantity += Number(orderCart[i].quantity);
                        total += Number(orderCart[i].price) * Number(orderCart[i].quantity);
                    }

                    const productFirst = productById(productAllList, Number(orderCart[0].product_id));

                    return (
                        <Box key={order.id}>
                            <Divider sx={{ borderWidth: "4px" }} />
                            <Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingTop: "5px",
                                    paddingLeft: "15px",
                                    paddingRight: "10px"
                                }}>
                                    <Typography variant="subtitle2">A00{order.id}</Typography>
                                    <Chip label={order.status} color="success" size="small" variant="outlined" />
                                </Box>

                                <Box sx={{ display: "flex", padding: "10px" }}>
                                    <img
                                        src={folder_image_url + productFirst[0].images}
                                        style={{ width: 80, height: 80 }}
                                    />
                                    <Box sx={{ padding: "8px" }}>
                                        <Typography variant="subtitle2">{productFirst[0].name}</Typography>
                                        <Typography variant="body2">{quantity} sản phẩm</Typography>
                                        <Typography variant="caption">Tổng {currencyFormat.format(total)}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    );
}
