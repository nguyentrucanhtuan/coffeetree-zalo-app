import { atom, selector } from "recoil";

export const cartState = atom({
  key: "cart",
  default: [],
});

export const cartTotalState = selector({
  key: "cartTotal",

  get: ({ get }) => {
    const cart = get(cartState);

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      let subTotal = 0;

      subTotal = subTotal + Number(cart[i].price);

      for (let x = 0; x < cart[i]["addTopping"].length; x++) {
        subTotal = subTotal + Number(cart[i]["addTopping"][x]["price"]);
      }

      total = total + subTotal * Number(cart[i].quantity);
    }

    return total;
  },
});

export const addCart = (cart, product) => {
  const newCart = [...cart];

  const foundIndex = cart.findIndex((item) => item.id === product.id);

  if (foundIndex >= 0) {
    newCart[foundIndex] = product;

    return newCart;
  }

  newCart.push({ ...product });

  return newCart;
};
