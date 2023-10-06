import { selector, selectorFamily } from "recoil";
//import a

const linkProductAPI = "http://localhost:81/api/product_list";

export const allProductListState = selector({
    key: 'allProductList',
    get: async () => {
        const response = await fetch(linkProductAPI, {
            method: "POST",
        });
        const res = await response.json();
        return res;
    }
})

export const productPublicListState = selector({
    key: 'productPublicList',
    get: ({ get }) => {
        const list = get(allProductListState);
        const result = list.filter(function (item) {
            return item.is_publish == 1;
        });

        return result;
    }
})

export const productsByCollectionState = selectorFamily({
    key: 'productsByCollection',
    get: (collectionId) => ({ get }) => {
        const allProducts = get(productPublicListState);
        return allProducts.filter(function (item) {
            return item.collection_id == collectionId;
        })
    }
})
