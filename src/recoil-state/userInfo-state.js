import { atom } from "recoil";
import { getPhoneNumber, getAccessToken, setStorage, followOA } from "zmp-sdk/apis";
import { APILink, zaloOAId } from "./setting";

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

export const CallServerGetPhoneNumberPromise = (accessToken, token) => new Promise(function (resolve, reject) {
  fetch(APILink + '/get_phone_number_by_zalo_token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: accessToken, code: token })
  }).then((response) => {
    return response.json();
  }).then((res) => {
    resolve(res.data.number);
  })
})

export const CallAndSaveZaloNumberPromise = () => new Promise(function (resolve, reject) {
  //Bước 1: Lấy access token
  getAccessToken({
    success: (accessToken) => {
      //Bước 2: Lấy token code
      getPhoneNumber({
        success: async (data) => {
          const { token } = data;
          //Bước 3: Gọi lên server để trả về zaloNumber và lưu vào Cache
          CallServerGetPhoneNumberPromise(accessToken, token).then((result) => {
            resolve(result);
          });
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
})

export const callFollowOA = () => {
  followOA({
    id: zaloOAId,
    success: (res) => { },
    fail: (err) => { }
  });
}