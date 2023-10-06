import { getStorage, setStorage } from 'zmp-sdk';

export const loadAddressList = () => new Promise(resolve => {
    getStorage({
      keys: ['addressList'],
      success: ({ addressList }) => {
        if (addressList) {
          if (addressList.filter) {
            resolve(addressList.filter(a => !!a && !!a.addressList))
          }
        }
        resolve([])
      },
      fail: (error) => {
        console.log('Failed to get addresses from storage. Details: ', error)
        resolve([])
      }
    })
  })

  export const saveAddressList = async address => {

    const addressList = await loadAddressList();
    addressList.push(address);
    setStorage({
      data: { addressList },
      fail: (error) => console.log('Failed to save new address to storage. Details: ', error)
    })

    return addressList;
  }