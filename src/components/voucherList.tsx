import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useRecoilState } from "recoil";
import { voucherSelectState } from "../recoil-state/voucher-state";

export default function VoucherList(props: any) {

  const [voucherSelect, setVoucherSelect] = useRecoilState<any>(voucherSelectState);

  const handleApplyVoucher = (voucherCode : any) => {
    
    setVoucherSelect({
      code: voucherCode.code,
      type: voucherCode.type,
      discount: voucherCode.discount
    });

    props.setOpenDrawerVoucher(false);
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ margin: "10px", padding: "10px" }}>
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
              <Typography variant="subtitle2">Mã: ZLP50KT12</Typography>
              <Typography variant="body2">Giảm 50K</Typography>
              <Typography variant="caption">Cho đơn hàng từ 2 triệu</Typography>
            </Box>
          </Box>

          <Box sx={{ marginLeft: "20px" }}>
            <Button variant="contained" size="small" onClick={() => {handleApplyVoucher({code: "GIANGSINH30", type: "percent", discount: "30"})}}>Áp dụng</Button>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ margin: "10px", padding: "10px" }}>
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
              <Typography variant="subtitle2">Mã: ZLP50KT12</Typography>
              <Typography variant="body2">Giảm 50K</Typography>
              <Typography variant="caption">Cho đơn hàng từ 2 triệu</Typography>
            </Box>
          </Box>

          <Box sx={{ marginLeft: "20px" }}>
            <Button variant="contained" size="small" onClick={() => {handleApplyVoucher({code: "FREESHIP25K", type: "number", discount: "25000"})}}>Áp dụng</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
