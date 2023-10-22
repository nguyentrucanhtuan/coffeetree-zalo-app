import React from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField } from "@mui/material";
import { Avatar, Header } from "zmp-ui";
import { getStorage, getUserInfo, setStorage } from "zmp-sdk";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil-state/userInfo-state";

import { useSnackbar } from "zmp-ui";


const EditInfoPage = () => {

    const { openSnackbar, closeSnackbar } = useSnackbar();
    const timmerId = React.useRef();
    React.useEffect(
        () => () => {
            closeSnackbar();
            clearInterval(timmerId.current);
        },
        []
    );

    const [userInfoData, setUserInfoData] = useRecoilState(userInfoState);

    //Lấy dữ liệu từ cache
    React.useEffect(() => {
        getStorage({
            keys: ["zaloNumber", "zaloId", "zaloIdByOA", "zaloName", "zaloAvatar", "zaloIsSensitive", "email", "gender"],
            success: (data) => {
                //Lưu vào Recoil State
                setUserInfoData({
                    id: data.zaloId,
                    idByOA: data.zaloIdByOA,
                    name: data.zaloName,
                    avatar: data.zaloAvatar,
                    phone: data.zaloNumber,
                    email: data.email,
                    gender: data.gender
                });
            },
            fail: (error) => {
                console.log(error);
            },
        });
    }, []);

    const userInfoDefault = {
        name: userInfoData.name,
        email: userInfoData.email,
        gender: userInfoData.gender,
    };

    const [userInfoForm, setUserInfoForm] = React.useState(userInfoDefault);

    const handleSaveUserInfo = () => {

        setStorage({
            data: {
                email: userInfoForm.email,
                gender: userInfoForm.gender,
                zaloName: userInfoForm.name
            },
            success: (data) => {
                const { errorKeys } = data;

                setUserInfoData({
                    ...userInfoData,
                    name: userInfoForm.name,
                    email: userInfoForm.email,
                    gender: userInfoForm.gender,
                });

                openSnackbar({
                    text: "Lưu thông tin thành công",
                    type: "success",
                    position: "top",
                });

                console.log("errorKeys", errorKeys);
            },
            fail: (error) => {
                console.log(error);
            },
        });
    }

    return (
        <Box sx={{ background: "#fff" }}>
            <Header title="Chỉnh sửa thông tin" />
            <Box sx={{ marginTop: "43px", padding: "15px" }}>

                <Avatar src={userInfoData.avatar} style={{ width: "56px", height: "56px", marginBottom: "10px" }} />

                <TextField
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={userInfoForm.name}

                    onChange={(event) => {
                        setUserInfoForm({
                            ...userInfoForm,
                            name: event.target.value,
                        });
                    }}
                />

                <TextField label="Số điện thoại" variant="outlined" disabled fullWidth sx={{ mb: 2 }} value={userInfoData.phone} />

                <TextField label="Email"
                    placeholder="Nhập Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={userInfoForm.email}

                    onChange={(event) => {
                        setUserInfoForm({
                            ...userInfoForm,
                            email: event.target.value,
                        });
                    }}
                />

                <FormControl>
                    <FormLabel>Giới tính</FormLabel>
                    <RadioGroup
                        row
                        value={userInfoForm.gender}
                        onChange={(event) => {
                            setUserInfoForm({
                                ...userInfoForm,
                                gender: event.target.value,
                            })

                        }}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Nam" />
                        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
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
                            handleSaveUserInfo();
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
