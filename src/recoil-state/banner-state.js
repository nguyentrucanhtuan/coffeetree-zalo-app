import { selector } from "recoil";
import { allProductListState } from "./product-state";

export const bannerListState = selector({
    
    key: 'bannerList',

    get: ({ get }) => {

        const list = get(allProductListState);
        
        const result = list.filter(function(item){

            return item.collection_code == "BANNER";

        });

        return result;
    }
});
