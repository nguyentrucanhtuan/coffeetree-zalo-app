import { atom, useRecoilValue, useRecoilState } from "recoil";
import {
  getPhoneNumber,
  getAccessToken,
  setStorage,
  getStorage,
  getUserInfo,
  followOA,
} from "zmp-sdk/apis";
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
    gender: "",
  },
});

export const checkPhoneAccess = () => {
  const userInfo = useRecoilValue(userInfoState);

  if (userInfo.phone != "") {
    return true;
  }

  return false;
};

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
};

export const saveZaloInfoToCache = (id, idByOA, name, avatar, isSensitive) => {
  setStorage({
    data: {
      zaloId: id,
      zaloIdByOA: idByOA,
      zaloName: name,
      zaloAvatar: avatar,
      zaloIsSensitive: isSensitive,
    },
    success: (data) => {
      const { errorKeys } = data;
      console.log("errorKeys", errorKeys);
    },
    fail: (error) => {
      console.log(error);
    },
  });
};

export const CallServerGetPhoneNumber = (accessToken, token) => {
  fetch(APILink + "/get_phone_number_by_zalo_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: accessToken, code: token }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      //Lưu vào cache
      saveZaloNumberToCache(res.data.number);
    });
};

export const CallAndSaveZaloNumber = () => {
  //Bước 1: Lấy access token
  getAccessToken({
    success: (accessToken) => {
      //Bước 2: Lấy token code
      getPhoneNumber({
        success: async (data) => {
          const { token } = data;
          //Bước 3: Gọi lên server để trả về zaloNumber và lưu vào Cache
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
    },
  });
};

export const getAccessTokenZalo = () => {
  getAccessToken({
    success: (accessToken) => {
      // xử lý khi gọi api thành công
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    },
  });
};

export const callFollowOA = () => {
  followOA({
    id: "1610121007405920472",
    success: (res) => {},
    fail: (err) => {},
  });
};
