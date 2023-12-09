import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Button, Drawer } from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AddressList from "./addressList";
import { useRecoilValue } from "recoil";
import { addressSelectState } from "../recoil-state/address-state";

export default function DeliveryInfo() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const addressSelect = useRecoilValue(addressSelectState);

  function toggelDrawerAddress(newOpen: boolean) {
    setOpenDrawer(newOpen);
  }

  return (
    <>
      <Paper elevation={3} sx={{ margin: "10px", padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Typography variant="subtitle2">Thông tin người nhận hàng</Typography>

          <Button
            variant="text"
            size="small"
            onClick={() => toggelDrawerAddress(true)}
          >
            Thay đổi
          </Button>
        </Box>

        <Box sx={{ display: "flex" }}>
          <AccountBoxIcon />
          <Box sx={{ marginLeft: "5px", display: "flex" }}>
            <Typography variant="subtitle2">
              {addressSelect.fullname == '' ? "Chọn người nhận" : addressSelect.fullname } - {addressSelect.phone == '' ? "Chọn số điện thoại" : addressSelect.phone}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <FmdGoodIcon />
          <Box sx={{ marginLeft: "5px" }}>
            <Typography variant="caption">{addressSelect.address == '' ? "Chọn địa chỉ" : addressSelect.address }</Typography>
          </Box>
        </Box>
      </Paper>

      <Drawer
        anchor="bottom"
        open={openDrawer}
        onClose={() => toggelDrawerAddress(false)}
      >
        <AddressList toggelDrawerAddress={toggelDrawerAddress} />
      </Drawer>
    </>
  );
}
