import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";

export default function VoucherList(props: any) {

  return (
    <Paper elevation={3} sx={{ margin: "10px", padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Box sx={{display: "flex"}}>
            <Box sx={{marginRight: "20px"}}>
              <img src="https://images.bloggiamgia.vn/full//07-07-2022/Ellipse-16-1657165581865.png" />
            </Box>
            
            <Box>
              <Typography variant="subtitle2">Mã: ZLP50KT12</Typography>
              <Typography variant="body2">Giảm 50K</Typography>
              <Typography variant="caption">Cho đơn hàng từ 2 triệu</Typography>
            </Box>
          </Box>

          <Box sx={{marginLeft: "20px"}}>
            <Button variant="contained" size="small">Áp dụng</Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Box sx={{display: "flex"}}>
            <Box sx={{marginRight: "20px"}}>
              <img src="https://images.bloggiamgia.vn/full//07-07-2022/Ellipse-16-1657165581865.png" />
            </Box>
            
            <Box>
              <Typography variant="subtitle2">Mã: ZLP50KT13</Typography>
              <Typography variant="body2">Giảm 100K</Typography>
              <Typography variant="caption">Cho đơn hàng từ 2 triệu</Typography>
            </Box>
          </Box>

          <Box sx={{marginLeft: "20px"}}>
            <Button variant="contained" size="small">Áp dụng</Button>
          </Box>
        </Box>

    </Paper>
  );
}
