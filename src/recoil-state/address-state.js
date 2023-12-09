import { atom } from "recoil";

export const addressListState = atom({
  key: "addressList",
  default: [],
});

export const addressSelectState = atom({
  key: "addressSelect",
  default: {
    default: true,
    fullname: "",
    phone: "",
    address: "",
    typeAddress: "",
  },
});
