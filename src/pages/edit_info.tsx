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

    React.useEffect(() => {
        getStorage({
            keys: ["zaloPhone"],
            success: (data) => {
                //Lưu vào Recoil State
                console.log('data.zaloPhone editInfo', data.zaloPhone);

                setUserInfoData({
                    id: null,
                    idByOA: null,
                    name: null,
                    avatar: null,
                    phone: data.zaloPhone,
                });
            },
            fail: (error) => {
                console.log(error);
            },
        });
    },[])
    return (
        <Box sx={{ background: "#fff" }}>
            <Header title="Chỉnh sửa thông tin" />
            <Box sx={{ marginTop: "43px", padding: "15px" }}>
                <Avatar src="http://mui.com/static/images/avatar/1.jpg" style={{ width: "56px", height: "56px", marginBottom: "10px" }} />

                <TextField label="Họ và tên" placeholder="Nhập họ và tên" variant="outlined" fullWidth sx={{ mb: 2 }} />
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
