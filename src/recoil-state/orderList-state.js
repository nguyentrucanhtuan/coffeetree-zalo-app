import { selector } from "recoil";
import { APILink } from "./setting";

const linkOrderAPI = APILink + "/order_list";

export const orderListState = selector({
  key: "orderList",
  get: async () => {
    const response = await fetch(linkOrderAPI, {
      method: "POST",
    });
    const res = await response.json();
    return res;
  }
});
