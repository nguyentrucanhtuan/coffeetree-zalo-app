import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React from "react";
import { CallAndSaveZaloNumber, saveZaloInfoToCache, userInfoState } from "../recoil-state/userInfo-state";
import welcomeImage from "../static/welcome-image.jpg";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getStorage, getUserInfo } from "zmp-sdk";
import { useRecoilState } from "recoil";

export default function AccessZaloPage() {

    const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

    const understandHandle = () => {
        
        CallAndSaveZaloNumber();

        getStorage({
            keys: ["zaloNumber"],
            success: (data) => {
                const { zaloNumber } = data;

                setUserInfoData({
                    ...userInfoData,
                    phone: zaloNumber
                })
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
    }

    return (
        <Box sx={{paddingTop: "80px", height: screen.height, textAlign: "center", background: "#fff"}}>
            <Typography variant="h6" sx={{ marginBottom: "20px"}}>CoffeeTree cần thông tin của bạn</Typography>
            <img
                style={{borderRadius: "30px", padding: "15px", width: "100%"}}
                src={welcomeImage}
            />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonOutlineIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Tên và ảnh đại diện" secondary="Được sử dụng để định danh và truy cập các tính năng từ Zalo" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PhoneInTalkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Số điện thoại" secondary="Được sử dụng để định danh và liên lạc khi giao hàng" />
                </ListItem>
                
            </List>

            <Button variant="contained" size="large" color="success" sx={{width: "200px", marginTop: "10px"}} onClick={() => {understandHandle()}}>Đã hiểu</Button>
        </Box>
    );
}
