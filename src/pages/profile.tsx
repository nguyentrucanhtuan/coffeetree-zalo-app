import React from "react";
import { useNavigate } from "react-router";
import { openChat, followOA } from "zmp-sdk/apis";
import { useRecoilValue } from "recoil";

import {
  Box,
  List,
  ListItem,
  Paper,
  Typography,
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";

import DraftsIcon from "@mui/icons-material/Drafts";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddressList from "../components/addressList";
import { userInfoState } from "../recoil-state/userInfo-state";
import { zaloChatUserId, zaloOAId } from "../recoil-state/setting";

const openChatScreen = async () => {
  try {
    await openChat({
      type: "user",
      id: zaloChatUserId,
      message: "Xin Chào, tôi muốn hỏi",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

const followZaloOA = async () => {
  try {
    await followOA({
      id: zaloOAId,
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};

export default function ProfilePage() {

  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const userInfoData = useRecoilValue(userInfoState);

  function toggelDrawerAddress(newOpen: boolean) {
    setOpenDrawer(newOpen);
  }
  
  return (
    <>
      <Box>
        <Paper
          elevation={3}
          sx={{
            margin: "55px 10px 10px 10px",
            padding: "10px",
            backgroundImage:
              "linear-gradient(to right, #0ba360 0%, #3cba92 100%)",
          }}
        >
          <Box sx={{ display: "flex" }} onClick={() => followZaloOA()}>
            <Avatar
              alt={userInfoData.name}
              src={userInfoData.avatar}
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ marginLeft: "10px" }}>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Follow Zalo để đăng ký thành viên
              </Typography>
              <Typography variant="caption" sx={{ color: "#fff" }}>
                Tích điểm đổi thưởng các phần quà hấp dẫn
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Divider style={{ borderWidth: "4px" }} />
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/orderList')} >
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Đơn hàng" />
                  <Typography variant="caption">Xem tất cả</Typography>
                  <NavigateNextIcon />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggelDrawerAddress(true)}>
                  <ListItemIcon>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sổ địa chỉ"
                  />
                  <NavigateNextIcon />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => openChatScreen()} >
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Nhắn tin cho CoffeeTree"
                  />
                  <NavigateNextIcon />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </nav>
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => toggelDrawerAddress(false)}
      >
        <AddressList toggelDrawerAddress={toggelDrawerAddress} />
      </Drawer>
    </>
  );
}