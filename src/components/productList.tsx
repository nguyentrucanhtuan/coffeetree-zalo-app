import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { useNavigate } from "react-router";
import { folder_image_url } from "../recoil-state/setting";

export default function ProductList(props: any) {
  const navigate = useNavigate();

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Box m={1}>
      <Grid container spacing={1} mt={1}>
        {props.listProduct.map((product: any) => (
          <Grid item xs={6} key={product.id}>
            <Card
              variant="outlined"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="181"
                width="181"
                image={folder_image_url + product.images}
              />
              <CardContent sx={{ padding: "8px" }}>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currencyFormat.format(product.price)}
                </Typography>
              </CardContent>
              {/* <CardActions>
                                <Button size="small">Đặt ngay</Button>
                            </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
