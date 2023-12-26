import { selector } from "recoil";
import { APILink } from "./setting";

const linkPromotionApi = APILink + "/promotion_list";

export const allPromotionListState = selector({
  key: "promotionList",

  get: async () => {
    const response = await fetch(linkPromotionApi, {
      method: "POST",
    });

    const res = await response.json();

    return res;
  },
});

export const promotionPublicListState = selector({
  key: "promotionPublicList",
  get: ({ get }) => {
    const list = get(allPromotionListState);
    const result = list.filter(function (item) {
      return item.is_publish == 1;
    });

    return result;
  },
});
