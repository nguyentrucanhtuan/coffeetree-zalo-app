import React from "react";
import { Box, Tabs, Tab, Typography, Divider, Chip } from "@mui/material";
import { Header } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";
import { orderListByStatusState, orderListByZaloNumberState } from "../recoil-state/orderList-state";

export default function OrderListPage() {

    const [curentTab, setCurentTab] = React.useState("all");

    const handleChange = (event: React.SyntheticEvent, value: string) => {
        setCurentTab(value);
    }

    const userInfoData = useRecoilValue(userInfoState);

    const listOrder = useRecoilValue(orderListByZaloNumberState(userInfoData.phone));

    const listOrderByStatus = useRecoilValue(orderListByStatusState({zaloNumber: userInfoData.phone, status: curentTab}));

    console.log('listOrderByStatus Complete', listOrderByStatus); 
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
                                <Typography variant="subtitle2">A0{order.id}</Typography>

                                <Chip label={order.status} color="success" size="small" variant="outlined" />
                            </Box>

                            <Box sx={{ display: "flex", padding: "10px" }}>
                                <img
                                    src="https://order.coffeetree.vn/storage/product/6Ua5TRBmUF6nammxF1jWz6LMibSzBG-metaY2EtcGhlLWJhYy1zaXUucG5n-.png"
                                    style={{ width: 80, height: 80 }}
                                />
                                <Box sx={{ padding: "8px" }}>
                                    <Typography variant="subtitle2">Ca phe nguyen chhuyen</Typography>
                                    <Typography variant="body2">11 Sarn pham adkjlalkfd</Typography>
                                    <Typography variant="caption">Tong 100.0000</Typography>
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
