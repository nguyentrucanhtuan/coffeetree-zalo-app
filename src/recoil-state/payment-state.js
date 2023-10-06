import { selector } from "recoil";

const linkPaymentMethodAPI = "http://localhost:81/api/payment_list";

export const paymentMethodListState = selector({
  key: 'paymentMethodList',
  get: async () => {
    const response = await fetch(linkPaymentMethodAPI, {
      method: "POST",
    });
    const res = await response.json();
    return res;
  }
})