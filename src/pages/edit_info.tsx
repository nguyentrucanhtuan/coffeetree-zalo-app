import React from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import { Avatar, Header } from "zmp-ui";
import { getStorage, getUserInfo } from "zmp-sdk";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";

const EditInfoPage = () => {

    const saveUserInfo = () => {
        console.log('okie');
    }

    const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

    //Lấy dữ liệu từ cache
    React.useEffect(() => {
        getStorage({
            keys: ["zaloNumber", "zaloId", "zaloIdByOA", "zaloName", "zaloAvatar", "zaloIsSensitive"],
            success: (data) => {
                //Lưu vào Recoil State
                setUserInfoData({
                    id: data.zaloId,
                    idByOA: data.zaloIdByOA,
                    name: data.zaloName,
                    avatar: data.zaloAvatar,
                    phone: data.zaloNumber,
                });
            },
            fail: (error) => {
                console.log(error);
            },
        });
    },[]);

    return (
        <Box sx={{ background: "#fff" }}>
            <Header title="Chỉnh sửa thông tin" />
            <Box sx={{ marginTop: "43px", padding: "15px" }}>
                <Avatar src={userInfoData.avatar} style={{ width: "56px", height: "56px", marginBottom: "10px" }} />

                <TextField label="Họ và tên" placeholder="Nhập họ và tên" variant="outlined" fullWidth sx={{ mb: 2 }} value={userInfoData.name}/>
                <TextField label="Số điện thoại" variant="outlined" disabled fullWidth sx={{ mb: 2 }} value={userInfoData.phone} />
                <TextField label="Email" placeholder="Nhập Email" variant="outlined" fullWidth sx={{ mb: 2 }} />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                    <RadioGroup row name="row-radio-buttons-group">
                        <FormControlLabel value="nam" control={<Radio />} label="Nam" />
                        <FormControlLabel value="nu" control={<Radio />} label="Nữ" />
                        <FormControlLabel value="other" control={<Radio />} label="Khác" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={1}
            >
                <Box sx={{ display: "flex" }}>
                    <Button
                        onClick={() => {
                            saveUserInfo();
                        }}
                        variant="contained"
                        size="large"
                        color="success"
                        sx={{ margin: "10px", width: "100%" }}
                    >
                        Lưu
                    </Button>
                </Box>
            </Paper>
        </Box>
    );

};

export default EditInfoPage;
