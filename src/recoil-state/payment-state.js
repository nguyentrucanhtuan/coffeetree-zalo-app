import { selector, selectorFamily } from "recoil";
import { APILink } from "./setting";

const linkPaymentMethodAPI = APILink + "/payment_list";

export const paymentMethodListState = selector({
  key: "paymentMethodList",
  get: async () => {
    const response = await fetch(linkPaymentMethodAPI, {
      method: "POST",
    });
    const res = await response.json();
    return res;
  },
});


export const paymentMethodByIdState = selectorFamily({
  key: "paymentMethodById",
  get: (paymentId) => ({ get }) => {
    const paymentList = get(paymentMethodListState);
    return paymentList.filter(function (item) {
      return Number(item.id) == Number(paymentId);
    });
  }
})