import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { voucherSelectState } from "../recoil-state/voucher-state";
import { promotionPublicListState } from "../recoil-state/promotion-state";
import { useSnackbar } from "zmp-ui";

export default function VoucherList(props: any) {

  const [voucherSelect, setVoucherSelect] = useRecoilState<any>(voucherSelectState);

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const timmerId = React.useRef();

  React.useEffect(
    () => () => {
      closeSnackbar();
      clearInterval(timmerId.current);
    }, []);
    
  const handleApplyVoucher = (voucherCode: any) => {


    console.log(voucherCode);
    
    setVoucherSelect({
      code: voucherCode.code,
      type: voucherCode.type,
      discount: voucherCode.discount
    });

    props.setOpenDrawerVoucher(false);

    openSnackbar({
      text: "Thêm mã giảm giá thành công",
      type: "success",
      position: "bottom",
      duration: 100000,
    });
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
              <Box sx={{ marginRight: "20px" }}>
                <img src="https://images.bloggiamgia.vn/full//07-07-2022/Ellipse-16-1657165581865.png" />
              </Box>

              <Box>
                <Typography variant="subtitle2">Mã: {promotion.code}</Typography>
                <Typography variant="body2">{promotion.name}</Typography>
                <Typography variant="caption">{promotion.description}</Typography>
              </Box>
            </Box>

            <Box sx={{ marginLeft: "20px" }}>
              <Button variant="contained" size="small" onClick={() => { handleApplyVoucher(promotion) }}>Áp dụng</Button>
            </Box>
          </Box>
        </Paper>
      ))}

    </Box>
  );
}
