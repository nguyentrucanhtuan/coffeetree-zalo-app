import { selector, selectorFamily } from "recoil";
import { APILink } from "./setting";

const linkOrderAPI = APILink + "/order_list";

export const orderListByZaloNumberState = selectorFamily({
  key: 'OrderListByZaloNumber',
  get: (zaloNumber) => async ({ get }) => {
    const response = await fetch(linkOrderAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zalo_number: zaloNumber })
    });

    const res = await response.json();
    return res;
  }
});

export const orderListByStatusState = selectorFamily({
  key: 'OrderListByStatus',
  get: (data) => ({ get }) => {
    const list = get(orderListByZaloNumberState(data.zaloNumber));
    const result = list.filter(function (item) {
      return item.status == data.status;
    });

    return result;
  },
})
