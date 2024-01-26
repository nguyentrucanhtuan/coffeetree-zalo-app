import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { CallAndSaveZaloNumberPromise, saveZaloNumberToCache, userInfoState } from "../recoil-state/userInfo-state";
import { useRecoilState } from "recoil";
import logoImage from "../static/logo.png";

export default function DrawerPhoneAccess(props: any) {

    const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

    const handleOpenPhoneAccess = () => {

        CallAndSaveZaloNumberPromise().then((phoneZalo) => {

            setUserInfoData({
                ...userInfoData,
                phone: phoneZalo,
            });
            saveZaloNumberToCache(phoneZalo);
            
            props.setOpenDrawerAccessPhone(false);
            props.setZaloLogin(true);
            props.setTab(props.tabRedirect);
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