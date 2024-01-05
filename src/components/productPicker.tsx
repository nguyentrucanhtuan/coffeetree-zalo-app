import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { useRecoilState, useRecoilValue } from "recoil";
import { allProductListState } from "../recoil-state/product-state";
import { addCart, cartState } from "../recoil-state/cart-state";
import useSnackbar from "zmp-ui/useSnackbar";

export default function productPicker(props: any) {
  const allProduct = useRecoilValue(allProductListState);

  const listSize = JSON.parse(props.product.size);
  const listTopping = JSON.parse(props.product.addon);

  const defaultPrice = props.product.price;

  const [total, setTotal] = React.useState(defaultPrice);
  const [price, setPrice] = React.useState(defaultPrice);

  const [productAddCart, setProductAddCart] = React.useState(props.product);
  const [toppingList, setToppingList] = React.useState([]);

  const [quantity, setQuantity] = React.useState(1);

  // Nếu sản phẩm có 1 size thì mặc định size đầu tiên
  React.useEffect(() => {
    if (listSize.length > 0) {
      const sizeProduct: any = allProduct.filter(function (item: any) {
        return item.id == listSize[0].product_id;
      });
      setProductAddCart(sizeProduct[0]);
      setPrice(sizeProduct[0].price);
    }
  }, []);

  // Thay đổi size
  function handleChangeSize(event: any) {
    const sizeProduct: any = allProduct.filter(function (item: any) {
      return item.id == event.target.value;
    });

    setProductAddCart(sizeProduct[0]);
    setPrice(sizeProduct[0].price);

    let newPrice = Number(sizeProduct[0].price);

    for (var i = 0; i < toppingList.length; i++) {
      newPrice = Number(newPrice) + Number(toppingList[i]["price"]);
    }

    const newTotal = newPrice * quantity;
    setTotal(newTotal);
  }

  //Thêm Topping
  function handleChangeTopping(event: any) {
    const addonProduct: any[] = allProduct.filter(function (item: any) {
      return item.id == event.target.value;
    });

    let toppingListNew = [];

    if (event.target.checked == true) {
      toppingListNew = [...toppingList, addonProduct[0]];
    } else {
      toppingListNew = toppingList.filter(function (item: any) {
        return item.id != event.target.value;
      });
    }

    setToppingList(toppingListNew);

    let newPrice = Number(price);

    for (var i = 0; i < toppingListNew.length; i++) {
      newPrice = Number(newPrice) + Number(toppingListNew[i]["price"]);
    }

    const newTotal = newPrice * quantity;
    setTotal(newTotal);
  }

  //Thay đổi số lượng
  function handleChangeQuantity(value: number) {
    setQuantity(value);

    const quantity = value;

    let newPrice = Number(price);

    for (var i = 0; i < toppingList.length; i++) {
      newPrice = Number(newPrice) + Number(toppingList[i]["price"]);
    }

    const newTotal = newPrice * quantity;
    setTotal(newTotal);
  }

  const [cartList, setCartList] = useRecoilState<any>(cartState);

  const { openSnackbar } = useSnackbar();

  function handleAddToCart() {

    const product = {
      ...productAddCart,
      addTopping: toppingList,
      quantity: quantity,
    };

    const newCart = addCart(cartList, product);

    setCartList(newCart);

    props.toggleDrawer(false);

    openSnackbar({
      text: "Đã thêm vào giỏ hàng",
      type: "success",
      position: "bottom",
      duration: 1000,
    });
  }

  const currencyFormat = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <Box sx={{ padding: "10px" }}>
        <Box>
          <Typography variant="h6">{props.product.name}</Typography>
          <Typography variant="h6">{currencyFormat.format(total)}</Typography>
        </Box>

        {listSize.length > 0 && (
          <Box>
            <Typography>Size</Typography>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={listSize[0].product_id}
              onChange={handleChangeSize}
            >
              {listSize.map((size: any) => (
                <FormControlLabel
                  key={size.product_id}
                  value={size.product_id}
                  control={<Radio />}
                  label={size.name}
                />
              ))}
            </RadioGroup>
          </Box>
        )}

        {listTopping != null && (
          <Box>
            <Typography>Topping</Typography>
            <FormGroup>
              {listTopping.map((topping: any) => (
                <FormControlLabel
                  key={topping.product_id}
                  control={<Checkbox />}
                  label={topping.name}
                  value={topping.product_id}
                  onChange={handleChangeTopping}
                />
              ))}
            </FormGroup>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            size="small"
            onClick={() =>
              handleChangeQuantity(quantity == 1 ? 1 : quantity - 1)
            }
          >
            <RemoveCircleOutlineIcon />
          </Button>
          <Box sx={{ marginLeft: "5px", marginRight: "5px" }}>
            <Typography variant="h6">{quantity}</Typography>
          </Box>
          <Button
            variant="text"
            size="small"
            onClick={() => handleChangeQuantity(quantity + 1)}
          >
            <AddCircleOutlineIcon />
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="error"
            onClick={() => handleAddToCart()}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </>
  );
}
