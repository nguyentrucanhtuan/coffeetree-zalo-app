import { atom, useRecoilValue } from "recoil";
import { getPhoneNumber, getAccessToken, setStorage, getStorage, getUserInfo } from "zmp-sdk/apis";
import { APILink } from "./setting";

export const userInfoState = atom({
  key: "UserInfo",
  default: {
    id: "",
    idByOA: "",
    name: "",
    avatar: "",
    phone: "",
    email: "",
    gender: ""
  },
});

export const checkPhoneAccess = () => {

  const userInfo = useRecoilValue(userInfoState);

  if (userInfo.phone != "") {
    return true;
  }

  return false;
}

export const saveZaloNumberToCache = (phoneNumber) => {
  setStorage({
    data: {
      zaloNumber: phoneNumber,
    },
    success: (data) => {
      const { errorKeys } = data;
      console.log("errorKeys", errorKeys);
    },
    fail: (error) => {
      console.log(error);
    },
  });
}

export const saveZaloInfoToCache = (id, idByOA, name, avatar, isSensitive) => {
  setStorage({
    data: {
      zaloId: id,
      zaloIdByOA: idByOA,
      zaloName: name,
      zaloAvatar: avatar,
      zaloIsSensitive: isSensitive
    },
    success: (data) => {
      const { errorKeys } = data;
      console.log("errorKeys", errorKeys);
    },
    fail: (error) => {
      console.log(error);
    },
  })
}

export const CallServerGetPhoneNumber = (accessToken, token) => {
  fetch(APILink + '/get_phone_number_by_zalo_token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: accessToken, code: token })
  }).then((response) => {
    return response.json();
  }).then((res) => {
    //Lưu vào cache
    saveZaloNumberToCache(res.data.number)
    console.log('zalo_number', res.data.number);
  })
}

export const CallAndSaveZaloNumber = () => {
  //Bước 1: Lấy accessToken Zalo
  getAccessToken({
    success: (accessToken) => {
      //Bước 2: Lấy token code Zalo
      getPhoneNumber({
        success: async (data) => {
          const { token } = data;
          CallServerGetPhoneNumber(accessToken, token);
        },
        fail: (error) => {
          // Xử lý khi gọi api thất bại
          console.log(error);
        },
      });
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  });
}