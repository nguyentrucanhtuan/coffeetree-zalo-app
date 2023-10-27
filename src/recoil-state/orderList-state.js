import { atom, selector, selectorFamily } from "recoil";
import { APILink } from "./setting";

const linkOrderAPI = APILink + "/order_list";

export const orderListState = atom({
  key: "orderList",
  default: [],
});


export const orderListByStatusState = selectorFamily({
  key: 'OrderListByStatus',
  get: (orderStatus) => ({ get }) => {
    const list = get(orderListState);
    const result = list.filter(function (item) {
      return item.status == orderStatus;
    });

    return result;
  }
})
