import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useRecoilValue } from "recoil";
import { cartState } from "../recoil-state/cart-state";
import { folder_image_url } from "../recoil-state/setting";
import { Chip, Stack } from "@mui/material";

export default function ProductCartList() {
  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const cartList = useRecoilValue(cartState);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {cartList.map((item: any, index) => {

        let totalTopping = 0; 

        return (
          <ListItem
            key={index}
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
                  <Typography component="div" variant="subtitle2">
                    {item.name} x {item.quantity}
                  </Typography>

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
        )}
      )}
    </List>
  );
}
