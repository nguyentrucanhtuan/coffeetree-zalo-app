import { selector } from "recoil";
import { APILink } from "./setting";

const linkPostApi = APILink + "/post_list";

export const allPostListState = selector({
  key: "postList",

  get: async () => {
    const response = await fetch(linkPostApi, {
      method: "POST",
    });

    const res = await response.json();

    return res;
  },
});

export const postPublicListState = selector({
  key: "postPublicList",
  get: ({ get }) => {
    const list = get(allPostListState);
    const result = list.filter(function (item) {
      return item.is_publish == 1;
    });

    return result;
  },
});
