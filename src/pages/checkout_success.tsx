import React from 'react';

import { useParams } from "react-router-dom";

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
    Button
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DraftsIcon from '@mui/icons-material/Drafts';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import AppBottomNavigation from '../components/appBottomNavigation';
import DeliveryInfo from '../components/deliveryInfo';
import ProductCartList from '../components/productCartList';
import PaymentMethod from '../components/paymentMethod';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

export default function CheckoutSuccessPage() {

    let { orderId } = useParams();

    const currencyFormat = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const folder_image_url = "http://localhost:81/storage/";
    const payment_image = "U8rG4scAzZ0dArokqWummod1ehy6Bj-metaY3JlZGl0LnBuZw==-.png"

    return (
        <Box sx={{ backgroundColor: "#fff" }}>

            <Paper elevation={2} sx={{ margin: "10px", padding: "10px" }}>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>

                    <Typography variant="subtitle2">Thông tin người nhận hàng</Typography>

                </Box>

                <Box sx={{ display: 'flex' }}>
                    <AccountBoxIcon />
                    <Box sx={{ marginLeft: "5px", display: "flex" }}>
                        <Typography variant="subtitle2">Nguyễn Trúc Anh Tuấn - 0347479295</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex' }}>
                    <FmdGoodIcon />
                    <Box sx={{ marginLeft: "5px" }}>
                        <Typography variant="caption">220 Nguyễn Hoàng, An Phú, Quận 2</Typography>
                    </Box>
                </Box>
            </Paper>

            <Divider />

            <Box>
                <Typography variant="subtitle2" sx={{ paddingLeft: "15px", paddingTop: "10px" }}>
                    Danh sách giỏ hàng
                </Typography>
                <ProductCartList />
            </Box>

            <Divider />

            <Box >
                <Box sx={{ display: "flex", margin: "10px", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <Typography variant="body1">Tạm tính</Typography>
                    <Typography variant="body1">{currencyFormat.format(500000)}</Typography>
                </Box>
                <Box sx={{ display: "flex", margin: "10px", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <Typography variant="body1">Phí vận chuyển</Typography>
                    <Typography variant="body1">{currencyFormat.format(25000)}</Typography>
                </Box>
                <Box sx={{ display: "flex", margin: "10px", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <Typography variant="body1">Tổng cộng</Typography>
                    <Typography variant="body1">{currencyFormat.format(500000 + 25000)}</Typography>
                </Box>
            </Box>

            <Divider />

            <Box sx={{ margin: "10px" }}>
                <Typography variant="subtitle2" sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
                    Phương thức thanh toán
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", paddingBottom: "10px" }}>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ paddingLeft: "10px" }}>
                            <img src={folder_image_url + payment_image} width="40" height="40" />
                        </Box>
                        <Box sx={{ paddingTop: "10px", paddingLeft: "15px" }}>
                            <Typography variant='subtitle2'>Thanh toán chuyển khoản </Typography>
                        </Box>
                    </Box>
                    
                </Box>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", paddingBottom: "10px" }}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ paddingLeft: "10px" }}>
                  <img width="64" height="64" src="https://img.icons8.com/cute-clipart/64/chat.png" alt="chat"/>


                  </Box>
                  <Box sx={{ paddingTop: "10px", paddingLeft: "15px", paddingRight: "10px" }}>
                    <Button variant="outlined" fullWidth>Chat với hỗ trợ</Button>
                    <Typography sx={{marginTop: "5px"}} variant='body1'>Nếu bạn có vấn đề về sản phẩm, vận chuyển, trả hàng & hoàn tiền</Typography>
                  </Box>
                </Box>
               
              </Box>

        </Box>
    );
}