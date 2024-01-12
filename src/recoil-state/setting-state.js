import { selector } from "recoil";
import { APILink } from "./setting";

const linkPostApi = APILink + "/setting_list";

export const settingListState = selector({
    key: "settingList",
    get: async () => {
        const response = await fetch(linkPostApi, {
            method: "POST",
        });
        const res = await response.json();

        return res;
    },
});

export const freeshipMinimumState = selector({
    key: "freeshipMinimum",
    get: ({ get }) => {
        const list = get(settingListState);
        const result = list.filter(function (item) {
            return item.key == "freeship_minimum";
        });

        return result[0].value;
    },
});

export const shippingFeeState = selector({
    key: "shippingFee",
    get: ({ get }) => {
        const list = get(settingListState);
        const result = list.filter(function (item) {
            return item.key == "shipping_fee";
        });

        return result[0].value;
    },
});