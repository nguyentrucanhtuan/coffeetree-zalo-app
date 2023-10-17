import { atom } from "recoil";

export const addressListState = atom({
  key: "addressList",
  default: [],
});

export const addressSelectState = atom({
  key: "addressSelect",
  default: {
    default: true,
    fullname: "Chọn người nhận",
    phone: "Chọn số điện thoại",
    address: "Chọn địa chỉ",
    typeAddress: "",
  },
});
