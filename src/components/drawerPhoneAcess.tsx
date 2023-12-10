import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { CallAndSaveZaloNumber, saveZaloInfoToCache, userInfoState } from "../recoil-state/userInfo-state";
import { getStorage, getUserInfo } from "zmp-sdk";
import { useRecoilState } from "recoil";
import logoImage from "../static/logo.png";

export default function DrawerPhoneAccess(props: any) {

    const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

    const handleOpenPhoneAccess = () => {

        CallAndSaveZaloNumber();

        getStorage({
            keys: ["zaloNumber"],
            success: (data) => {
                const { zaloNumber } = data;

                setUserInfoData({
                    ...userInfoData,
                    phone: zaloNumber
                })

                //Đóng popup
                props.setOpenDrawerAccessPhone(false);

                //Mở product Picker
                props.setOpenDrawer(true);
            },
            fail: (error) => {
                console.log(error);
            }
        });

        getUserInfo({
            success: (data) => {
                const { userInfo } = data;
                setUserInfoData({
                    ...userInfoData,
                    id: userInfoData.id,
                    name: userInfoData.name,
                    avatar: userInfoData.avatar,
                })
                saveZaloInfoToCache(userInfo.id, userInfo.idByOA, userInfo.name, userInfo.avatar)
            },
            fail: (error) => {
                console.log(error);
            }
        });
    };

    return (
        <Drawer
            anchor="bottom"
            open={props.open}
            onClose={() => props.setOpenDrawerAccessPhone(false)}
        >
            <Box
                sx={{
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingRight: "25px",
                    paddingLeft: "25px",
                    textAlign: "center",
                }}
            >
                <img
                    src={logoImage}
                    style={{ width: 56, height: 56, borderRadius: "50%" }}
                />
                <Typography variant="h6">
                    Tính năng cần kích hoạt tài khoản
                </Typography>

                <Typography variant="caption">
                    Cho phép CoffeeTree xác minh số điện thoại để xem đầy đủ thông tin
                    và quyền lợi
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    onClick={() => handleOpenPhoneAccess()}
                >
                    Đã hiểu
                </Button>
            </Box>
        </Drawer>
    )
}