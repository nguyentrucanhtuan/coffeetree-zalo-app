import React from "react";

import {
    TextField,
    Box,
    Typography,
    Grid,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Switch,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { setStorage, getStorage } from "zmp-sdk";
import { saveAddressList } from "../service/localStorage";
import { useRecoilState, useRecoilValue } from "recoil";
import { addAddressState, addressListState, localAddressListState, saveAddressListToLocal } from "../recoil-state/address-state";

export default function AddressPicker(props: any) {

    const [addressList, setAddressList] = useRecoilState<any>(addressListState);

    let addressDataInit: any = {}

    const addressEditId = Number(props.addressEditId);

    if (props.addressEditId != null) {

        addressDataInit = {
            default: false,
            fullname: addressList[addressEditId]?.fullname ? addressList[addressEditId].fullname : '',
            phone: addressList[addressEditId]?.phone ? addressList[addressEditId].phone : '',
            address: addressList[addressEditId]?.address ? addressList[addressEditId].address : '',
            typeAddress: ""
        }
        console.log('props.addressEditId', props.addressEditId)

    } else {
        addressDataInit = {
            default: false,
            fullname: "",
            phone: "",
            address: "",
            typeAddress: ""
        }
    }

    //console.log(props.addressEditId);

    // const addressDataInit = {
    //     default: false,
    //     fullname: "",
    //     phone: "",
    //     address: "",
    //     typeAddress: ""
    // }

    const [addressInfo, setAddressInfo] = React.useState(addressDataInit);

    const handleAddAddress = async (address: any) => {

        if (props.addressEditId == null) {

            let addressListData: any = [...addressList];

            addressListData.push(address);

            //Lưu vào cache của zalo
            setStorage({
                data: {
                    addressList: addressListData,
                },
                success: (data) => {
                    //Lưu vào Recoil State
                    setAddressList(addressListData);

                    const { errorKeys } = data;
                    console.log('errorKeys', errorKeys);
                },
                fail: (error) => {
                    console.log(error);
                }
            })

        } else {

            let addressListData: any = [...addressList];

            addressListData[props.addressEditId] = address;

            //Lưu vào cache của zalo
            setStorage({
                data: {
                    addressList: addressListData,
                },
                success: (data) => {
                    //Lưu vào Recoil State
                    setAddressList(addressListData);

                    const { errorKeys } = data;
                    console.log('errorKeys', errorKeys);
                },
                fail: (error) => {
                    console.log(error);
                }
            })
        }

        props.toggelDrawerAddress(false);
    }

    const [deleteID, setDeleteID] = React.useState();

    function handleDelete(addressId: any) {

        setDeleteID(addressId);
        setOpenDialog(true);
    }

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteOK = (id: any) => {

        const addressListData: any = addressList.filter(function (item: any, index: any) {
            return index != id;
        });

        //Lưu vào cache của zalo
        setStorage({
            data: {
                addressList: addressListData,
            },
            success: (data) => {
                //Lưu vào Recoil State
                setAddressList(addressListData);

                const { errorKeys } = data;
                console.log('errorKeys', errorKeys);
            },
            fail: (error) => {
                console.log(error);
            }
        })

        setOpenDialog(false);
        props.toggelDrawerAddress(false);
    }


    function handleCloseAddress(){
        props.toggelDrawerAddress(false);
    }
    

    return (
        <>
            <Box sx={{ padding: "10px", height: screen.height - 150 }}>
                <Typography variant="h6" sx={{ paddingBottom: "5px" }}>Địa chỉ giao hàng</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            id="outlined-size-small"
                            size="small"
                            value={addressInfo.fullname}
                            onChange={event => {
                                setAddressInfo({
                                    ...addressInfo,
                                    fullname: event.target.value
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            id="outlined-size-small"
                            size="small"
                            type="number"
                            value={addressInfo.phone}
                            onChange={event => {
                                setAddressInfo({
                                    ...addressInfo,
                                    phone: event.target.value
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Địa chỉ cụ thể (số nhà/đường/phường/xã/thành phố)"
                            id="outlined-size-small"
                            size="small"
                            multiline
                            rows={2}
                            value={addressInfo.address}
                            onChange={event => {
                                setAddressInfo({
                                    ...addressInfo,
                                    address: event.target.value
                                })
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: "20px" }}>
                            <Box>
                                <Typography variant="body1">Đặt làm mặt định</Typography>
                            </Box>

                            <Box>
                                <Switch
                                    //checked={checked}
                                    //onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: "10px" }}>
                        <Box >
                            <Divider />
                            <Button onClick={() => handleDelete(addressEditId)}>Xóa</Button>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Loại địa chỉ</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="vp"
                            >
                                <FormControlLabel value="vp" control={<Radio />} label="Văn phòng" />
                                <FormControlLabel value="nr" control={<Radio />} label="Nhà riêng" />

                            </RadioGroup>
                        </FormControl>
                    </Grid> */}


                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <Box sx={{ display: "flex" }}>

                                <Button onClick={() => { handleCloseAddress()}} variant="outlined" size="large" sx={{ margin: "10px", width: "100%" }}>
                                    Đóng
                                </Button>
                                <Button onClick={() => { handleAddAddress(addressInfo) }} variant="contained" size="large" sx={{ margin: "10px", width: "100%" }}>
                                    Lưu
                                </Button>
                            </Box>
                        </Paper>
                    </Paper>
                </Grid>
            </Box>


            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận xóa địa chỉ"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc muốn xóa địa chỉ này
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog()}>Không</Button>
                    <Button onClick={() => handleDeleteOK(deleteID)}>Đồng Ý</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}