import * as React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import ProductCartList from "../components/productCartList";
import DeliveryInfo from "../components/deliveryInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartDiscountState, cartState, cartTotalState } from "../recoil-state/cart-state";
import { useNavigate } from "react-router";
import { addressSelectState } from "../recoil-state/address-state";
import { paymentMethodListState } from "../recoil-state/payment-state";
import { folder_image_url, APILink } from "../recoil-state/setting";
import { userInfoState } from "../recoil-state/userInfo-state";
import { useSnackbar } from "zmp-ui";
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

import cartImage from "../static/cart-image.png";
import VoucherList from "../components/voucherList";
import { voucherSelectState } from "../recoil-state/voucher-state";

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export default function CheckoutPage() {
  const [cartList, setCartList] = useRecoilState(cartState);

  console.log(cartList);

  const cartDiscount = useRecoilValue(cartDiscountState);
  console.log(cartDiscount);

  const navigate = useNavigate();

  const cartTotal = useRecoilValue(cartTotalState);
  const shippingFee = 25000;

  const addressSelect = useRecoilValue(addressSelectState);

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const listPaymentMethod = useRecoilValue(paymentMethodListState);

  const [paymentId, setPaymentId] = React.useState(listPaymentMethod[0].id);

  const handleChangePayment = (event) => {
    setPaymentId(event.target.value);
  };

  const userInfoData = useRecoilValue(userInfoState);

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const timmerId = React.useRef();

  React.useEffect(
    () => () => {
      closeSnackbar();
      clearInterval(timmerId.current);
    }, []);

  const handleCheckOut = async () => {

    const APILinkAddOrder = APILink + "/add_customer_order";

    const cart: any = [];

    if (addressSelect.phone != '') {

      for (var i = 0; i < cartList["length"]; i++) {
        const addonList: any = [];

        for (var x = 0; x < cartList[i]["addTopping"]["length"]; x++) {
          addonList.push({
            product_id: cartList[i]["addTopping"][x]["id"],
            price: cartList[i]["addTopping"][x]["price"],
          });
        }

        cart.push({
          product_id: cartList[i]["id"],
          price: cartList[i]["price"],
          quantity: cartList[i]["quantity"],
          addon: addonList,
        });
      }

      const data = {
        fullname: addressSelect.fullname,
        phone: addressSelect.phone,
        email: "email@gmail.com",
        address: addressSelect.address,
        zalo_number: userInfoData.phone,
        shipping_price: shippingFee,
        promotion_code: voucherSelect.code, 
        discount: discountTotal,
        cart: JSON.stringify(cart),
        payment_id: paymentId,
        note: "ghi chú đơn hàng",
      };

      const response = await fetch(APILinkAddOrder, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      setCartList([]);

      navigate("/checkout_success/" + res);

    } else {
      openSnackbar({
        text: "Vui lòng chọn địa chỉ giao hàng",
        type: "warning",
        position: "bottom",
      });
    }
  };

  const [openDrawerVoucher, setOpenDrawerVoucher] = React.useState(false);

  const handleClickVoucher = async () => {
    setOpenDrawerVoucher(true);
  }

  const [voucherSelect, setVoucherSelect] = useRecoilState<any>(voucherSelectState);

  let discountTotal = 0;

  if (voucherSelect.type == "number") {
    discountTotal = parseInt(voucherSelect.discount);
  }

  if (voucherSelect.type == "percent") {
    discountTotal = parseInt(voucherSelect.discount) / 100 * cartTotal;
  }

  const handleDeletePromotion = () => {
    setVoucherSelect([]);
  }

  if (cartList.length > 0)
    return (
      <>
        <Box sx={{ marginBottom: "115px", backgroundColor: "#fff" }}>
          <DeliveryInfo />

          <Divider style={{ borderWidth: "4px" }} />

          <Box>
            <Typography
              variant="subtitle2"
              sx={{ paddingLeft: "15px", paddingTop: "10px" }}
            >
              Danh sách giỏ hàng
            </Typography>

            <ProductCartList />
          </Box>

          <Divider style={{ borderWidth: "4px" }} />

          <Box>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Tạm tính</Typography>
              <Typography variant="body1">
                {currencyFormat.format(cartTotal)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Phí vận chuyển</Typography>
              <Typography variant="body1">
                {currencyFormat.format(shippingFee)}
              </Typography>
            </Box>

            {
              discountTotal > 0 &&
              <Box
                sx={{
                  display: "flex",
                  margin: "10px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <Typography variant="body1">
                  Giảm giá : {voucherSelect.code}
                  {voucherSelect.type == "percent" ? " (-" + voucherSelect.discount + "%)" : ""}
                  <IconButton aria-label="delete" size="small" onClick={() => handleDeletePromotion()}>
                    <HighlightOffOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Typography>
                <Typography variant="body1">
                  - {currencyFormat.format(discountTotal)}
                </Typography>
              </Box>
            }

            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography variant="body1">Tổng cộng</Typography>
              <Typography variant="body1">
                {currencyFormat.format(cartTotal + shippingFee - discountTotal)}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <DiscountOutlinedIcon sx={{ marginRight: "5px" }} />
                <Typography variant="body1">Khuyến mãi</Typography>
              </Box>

              <Box sx={{ display: "flex" }} onClick={() => handleClickVoucher()}>
                <Button variant="outlined">
                  <Typography variant="body1">
                    {voucherSelect.code ? voucherSelect.code : "Nhập hoặc chọn mã"}
                  </Typography>

                </Button>
              </Box>

            </Box>
          </Box>

          <Divider style={{ borderWidth: "4px" }} />

          <Box sx={{ margin: "10px" }}>
            <Typography
              variant="subtitle2"
              sx={{ paddingLeft: "10px", paddingTop: "10px" }}
            >
              Phương thức thanh toán
            </Typography>

            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <RadioGroup
                defaultValue={listPaymentMethod[0].id}
                name="payment-raido-group"
                onChange={handleChangePayment}
              >
                {listPaymentMethod.map((payment, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ paddingLeft: "10px" }}>
                          <img
                            src={folder_image_url + payment.image}
                            width="40"
                            height="40"
                          />
                        </Box>
                        <Box sx={{ paddingTop: "10px", paddingLeft: "15px" }}>
                          <Typography variant="subtitle2">
                            {payment.name}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ paddingRight: "10px" }}>
                        <FormControlLabel
                          value={payment.id}
                          control={<Radio />}
                          label=""
                          sx={{ paddingRight: "0px" }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </RadioGroup>
            </List>
          </Box>

          <Box
            sx={{
              backgroundColor: "#f4f5f6",
              padding: "8px",
              position: "fixed",
              zIndex: 999,
              bottom: 56,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ lineHeight: "36px" }}>
              Tổng thanh toán: {currencyFormat.format(cartTotal + shippingFee)}
            </Typography>

            <Button variant="contained" onClick={() => handleCheckOut()}>
              Đặt hàng
            </Button>
          </Box>
        </Box>

        <Drawer
          anchor="bottom"
          open={openDrawerVoucher}
          onClose={() => setOpenDrawerVoucher(false)}
        >
          <VoucherList setOpenDrawerVoucher={setOpenDrawerVoucher} />
        </Drawer>

      </>
    );
  else {
    return (
      <Box>
        <Box
          sx={{
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <img
            style={{ width: "300px" }}
            src={cartImage}
          />
          <Typography variant="h6">Hổng có gì trong giỏ hết</Typography>
          <Typography variant="subtitle1">
            Lướt CoffeeTree, lựa cà phê ngay đi!
          </Typography>
          {/* <Button variant="outlined" onClick={() => navigate("/")}>
            Mua sắm ngay
          </Button> */}
        </Box>
      </Box>
    );
  }
}
