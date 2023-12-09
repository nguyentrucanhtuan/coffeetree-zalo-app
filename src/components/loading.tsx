import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import React from "react";

export default function AppLoading() {
    return (
        <Box sx={{ width: '100%', textAlign: "center", marginTop: "150px" }}>
            <CircularProgress size={60}  sx={{marginBottom: "30px"}}/>
            <Typography variant="h5">Đang tải trang ...</Typography>
        </Box>
    );
}
