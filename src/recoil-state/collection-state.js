import { selector } from "recoil";

const linkCollectionApi = "http://localhost:81/api/collection_list";

export const allCollectionListState = selector({
  key: 'collectionList',

  get: async () => {

    const response = await fetch(linkCollectionApi, {
      method: "POST",
    });

    const res = await response.json();

    return res;
  }
})

export const collectionPublicListState = selector({
  key: 'collectionPublicList',
  get: ({ get }) => {
      const list = get(allCollectionListState);
      const result = list.filter(function(item){
          return item.is_publish == 1;
      });

      return result;
  }
})