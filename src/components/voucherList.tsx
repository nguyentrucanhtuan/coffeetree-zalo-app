import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { voucherSelectState } from "../recoil-state/voucher-state";
import { promotionPublicListState } from "../recoil-state/promotion-state";
import { useSnackbar } from "zmp-ui";
import { cartState, cartTotalQuantityState, cartTotalState } from "../recoil-state/cart-state";

export default function VoucherList(props: any) {
  const cartTotal = useRecoilValue(cartTotalState);
  const cartQuantity = useRecoilValue(cartTotalQuantityState);

  const [voucherSelect, setVoucherSelect] = useRecoilState<any>(voucherSelectState);

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const timmerId = React.useRef();

  React.useEffect(
    () => () => {
      closeSnackbar();
      clearInterval(timmerId.current);
    }, []);
        
  const handleApplyVoucher = (voucherCode: any) => {

    //tạo điều kiện đúng
    if(cartTotal >= parseInt(voucherCode.minimum_total) && cartQuantity >= parseInt(voucherCode.minimum_quantity)) {

      //console.log()
      setVoucherSelect({
        code: voucherCode.code,
        type: voucherCode.type,
        discount: voucherCode.discount,
        limit_collection: voucherCode.limit_collection
      });
  
      openSnackbar({
        text: "Thêm mã giảm giá thành công",
        type: "success",
        position: "bottom",
        duration: 100000,
      });
  
      props.setOpenDrawerVoucher(false);
  
    } else {

      openSnackbar({
        text: "Thêm mã giảm giá không thành công",
        type: "warning",
        position: "bottom",
        duration: 100000,
        zIndex: 99
      });
    }

    console.log(voucherCode);
  
  }

  const promotionList = useRecoilValue(promotionPublicListState);

  return (
    <Box>
      {promotionList.map((promotion) => (
        <Paper key={promotion.id} elevation={3} sx={{ margin: "10px", padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginRight: "10px" }}>
                <img style={{width: "60px"}} src="https://images.bloggiamgia.vn/full//07-07-2022/Ellipse-16-1657165581865.png" />
              </Box>

              <Box>
                <Typography variant="subtitle2">Mã: {promotion.code}</Typography>
                <Typography variant="body2">{promotion.name}</Typography>
                <Typography variant="caption">{promotion.description}</Typography>
              </Box>
            </Box>

            <Box sx={{ marginLeft: "20px" }}>
              { 
                cartTotal >= parseInt(promotion.minimum_total) && cartQuantity >= parseInt(promotion.minimum_quantity)
                ? <Button variant="contained" size="small" onClick={() => { handleApplyVoucher(promotion) }}>Áp dụng</Button>
                : <Button disabled variant="contained" size="small">Áp dụng</Button>
              }
            </Box>
          </Box>
        </Paper>
      ))}

    </Box>
  );
}
