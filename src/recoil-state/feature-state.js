import { selector } from "recoil";
import { allProductListState } from "./product-state";

export const featureListState = selector({
  key: "featureList",
  get: ({ get }) => {
    const list = get(allProductListState);
    const result = list.filter(function (item) {
      return item.collection_code == "FEATURE";
    });
    return result;
  },
});
