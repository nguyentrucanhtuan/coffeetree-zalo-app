import { selector, useRecoilState, useRecoilValue, atom } from "recoil";
import { setStorage, getStorage } from "zmp-sdk";

export const addressListState = atom({
    key: "addressList",
    default: [],
});

export const addressSelectState = atom({
    key: "addressSelect",
    default: {
        default: true,
        fullname: "Chọn người nhận",
        phone: "Chọn số điện thoại",
        address: "Chọn địa chỉ",
        typeAddress: ""
    }
})

/////////////////////////////////////////////////////////////////

export const addAddressState = (listAddress, address) => {
    const newListAddress = [...listAddress];
    
    newListAddress.push(address);

    return newListAddress;
}

export const loadAddressLocalState = (listAddressState, listAddress) => {

}

////////////////////////////////////////////////////////////////////

export const localAddressListState = selector({
    key: 'localAddressList',
    get: async () => {

        const { addressList } = await getStorage({
            keys: ["addressList"]
        });

        return addressList;
    }
})

export const saveAddressListToLocal = async (address) => {

    const addressList = useRecoilValue(localAddressListState);
    addressList.push(address);

    setStorage({
      data: { addressList },
      fail: (error) => console.log('Failed to save new address to storage. Details: ', error)
    })

    return addressList;
}

export const getAddressList = async () => {
    
    const { addressList } = await getStorage({
        keys: ["addressList"]
    });

    return addressList;
}