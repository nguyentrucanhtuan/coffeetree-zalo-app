import React from 'react';
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
    Divider
} from '@mui/material';

import DraftsIcon from '@mui/icons-material/Drafts';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function ProfilePage() {
  return (
    <Box>
        <Paper elevation={3} sx={{margin: "10px", padding: "10px", backgroundImage: "linear-gradient(to right, #0ba360 0%, #3cba92 100%)"}}>
            <Box sx={{display: 'flex'}} >
                <Avatar
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{ width: 56, height: 56 }}
                />
                <Box sx={{ marginLeft: "10px" }}>
                    <Typography variant="h6" sx={{color: "#fff"}}>Nguyễn Trúc Anh Tuấn</Typography>
                    <Typography variant="body2" sx={{color: "#fff"}}>Thành Viên Hạng Kim Cương</Typography>
                </Box>
            </Box>
        </Paper>

        <Divider style={{borderWidth: "4px"}}/>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ContactPhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Thông tin tài khoản" />
                            <NavigateNextIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Lịch sử đơn hàng" />
                            <NavigateNextIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HelpOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sổ địa chỉ" />
                            <NavigateNextIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Liên hệ và góp ý" />
                            <NavigateNextIcon />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </nav>
        </Box>

    </Box>
  );
}