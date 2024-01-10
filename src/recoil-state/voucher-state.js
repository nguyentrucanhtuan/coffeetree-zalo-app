import { atom } from "recoil";

export const voucherListState = atom({
  key: "voucherList",
  default: [],
});

export const voucherSelectState = atom({
  key: "voucherSelect",
  default: {
    code: "",
    type: "",
    discount: "",
    limit_count: 0,
    limit_date: "",
    collection_id: 0
  },
});