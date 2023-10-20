import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { Header } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";

export default function OrderListPage() {

    const [curentTab, setCurentTab] = React.useState("1");

    const handleChange = (event: React.SyntheticEvent, value: string) => {
        setCurentTab(value);
    }

    const userInfoData = useRecoilValue(userInfoState);

    fetch('https://order.coffeetree.vn/api/order_list', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({zalo_number: userInfoData.phone})
    }).then((response) => {
        console.log('response from coffeetree server', response);
        return response.json();
    }).then((res) => {
        console.log('data server', res)

    })


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
                    <Tab
                        value="1"
                        label="Tất cả"
                    />

                    <Tab
                        value="2"
                        label="Chờ thanh toán"
                    />

                    <Tab
                        value="3"
                        label="Đã giao"
                    />

                    <Tab
                        value="4"
                        label="Hoàn thành"
                    />

                    <Tab
                        value="5"
                        label="Đã hủy"
                    />

                </Tabs>
            </Box>

            <Box>
                Jljf
            </Box>
        </Box>
    );
}
