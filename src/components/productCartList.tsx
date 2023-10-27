import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../recoil-state/cart-state";
import { folder_image_url } from "../recoil-state/setting";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function ProductCartList() {
  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState();

  const [cartList, setCartList] = useRecoilState(cartState);
  //console.log('cartList', cartList)

  const handleOpenDialogDeleteCart = (id) => {
    setOpenDialog(true);
    setDeleteID(id);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteProductOK = (id) => {

    const cartListNew: any = cartList.filter(function (item: any, index: any) {
      return index != id;
    });

    setCartList(cartListNew);

    setOpenDialog(false);
  }

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {cartList.map((item: any, itemIndex) => {

          let totalTopping = 0;

          return (
            <ListItem
              key={itemIndex}
              alignItems="flex-start"
              sx={{ paddingTop: "4px", paddingBottom: "4px" }}
            >
              <Card sx={{ display: "flex", width: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80 }}
                  image={folder_image_url + item.images}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent
                    sx={{
                      padding: "0px",
                      paddingTop: "8px",
                      paddingLeft: "5px",
                      flex: "1 0 auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        minWidth: "260px"
                      }}
                    >
                      <Typography component="div" variant="subtitle2">
                        {item.name} x {item.quantity}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => { handleOpenDialogDeleteCart(itemIndex) }}
                        sx={{ padding: "0px" }}
                      >
                        <HighlightOffIcon sx={{ fontSize: "20px" }} />
                      </Button>

                    </Box>


                    <Stack direction="row" spacing={0.3}>
                      {item.addTopping.map((topping: any, i: number) => {
                        totalTopping += Number(topping.price);
                        return (
                          <Chip key={i} size="small" label={topping.name} variant="outlined" />
                        );
                      })}
                    </Stack>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      {currencyFormat.format(Number(item.price) + totalTopping)}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </ListItem>
          )
        }
        )}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()}>Không</Button>
          <Button onClick={() => handleDeleteProductOK(deleteID)}>Đồng Ý</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
