import * as React from "react";
import List from "@mui/material/List";
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import AddressPicker from "./addressPicker";
import { getStorage } from "zmp-sdk";
import {
  addressListState,
  addressSelectState,
} from "../recoil-state/address-state";
import { useRecoilState, useRecoilValue } from "recoil";

export default function AddressList(props: any) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  function toggelDrawerAddress(newOpen: boolean) {
    setOpenDrawer(newOpen);
  }

  const [addressList, setAddressList] = useRecoilState<any>(addressListState);
  const [addressSelect, setAddressSelect] =
    useRecoilState<any>(addressSelectState);

  React.useEffect(() => {
    getStorage({
      keys: ["addressList"],
      success: (data) => {
        //Lưu vào Recoil State
        setAddressList(data.addressList);
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }, []);

  const addressRecoil = useRecoilValue(addressListState);
  //console.log('addressRecoil', addressRecoil);
  //console.log('addressList', addressList);

  const [addressId, setAddressId] = React.useState(0);

  const handleRadioChange = (event: any) => {
    const address = Number(event.target.value);
    setAddressId(address);
  };

  const handleConfirm = () => {
    setAddressSelect(addressList[addressId]);
    props.toggelDrawerAddress(false);
  };

  const handleClose = () => {
    props.toggelDrawerAddress(false);
  };

  const [addressEditId, setAddressEditId] = React.useState(null);

  function handleOpenEditAddress(addressId = null) {
    setAddressEditId(addressId);

    toggelDrawerAddress(true);
  }

  function handleAddAddress() {
    setAddressEditId(null);

    toggelDrawerAddress(true);
  }

  return (
    <Box>
      <Box sx={{ marginBottom: "55px" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            height: screen.height - 200,
          }}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={0}
            name="radio-buttons-group"
            onChange={handleRadioChange}
          >
            {addressList.length > 0 &&
              addressList.map((address: any, index) => (
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
                    <Box sx={{ paddingLeft: "15px" }}>
                      <FormControlLabel
                        value={index}
                        control={<Radio />}
                        label=""
                      />
                    </Box>
                    <Box>
                      <Typography>
                        {address.fullname} - {address.phone}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#00000099" }}
                      >
                        {address.address}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ paddingRight: "10px" }}
                    onClick={() => {
                      handleOpenEditAddress(index);
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </Box>
                </Box>
              ))}

            <Divider />
          </RadioGroup>

          <Divider style={{ borderWidth: "4px" }} />

          {addressList.length < 3 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
              onClick={() => {
                handleAddAddress();
              }}
            >
              <Box sx={{ paddingLeft: "10px" }}>
                <Typography>Thêm địa chỉ mới</Typography>
              </Box>
              <Box sx={{ paddingRight: "10px" }}>
                <AddIcon />
              </Box>
            </Box>
          )}

          <Divider />
        </List>
      </Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => {
              handleClose();
            }}
            variant="outlined"
            size="large"
            sx={{ margin: "10px", width: "100%" }}
          >
            Đóng
          </Button>
          <Button
            onClick={() => {
              handleConfirm();
            }}
            variant="contained"
            size="large"
            color="success"
            sx={{ margin: "10px", width: "100%" }}
          >
            Xác nhận
          </Button>
        </Box>
      </Paper>

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => toggelDrawerAddress(false)}
      >
        <AddressPicker
          addressEditId={addressEditId}
          toggelDrawerAddress={toggelDrawerAddress}
        />
      </Drawer>
    </Box>
  );
}
