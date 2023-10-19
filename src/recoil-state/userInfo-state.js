import { atom, useRecoilValue } from "recoil";

export const userInfoState = atom({
  key: "UserInfo",
  default: {
    id: "",
    idByOA: "",
    name: "",
    avatar: "",
    phone: "",
  },
});


export const checkPhoneAccess = () => {

  const userInfo = useRecoilValue(userInfoState);

  if (userInfo.phone != "") {
    return true;
  }

  return false;
}

export const CallAndSaveZaloNumber = () => {

  //LƯU TẠM CODE NÀY Ở ĐÂY

  // //Bước 1: Lấy accessToken Zalo
  // getAccessToken({
  //   success: (accessToken) => {
  //     // xử lý khi gọi api thành công
  //     setAccessTokenState(accessToken);
  //   },
  //   fail: (error) => {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   }
  // });

  // //Bước 2: Lấy token code Zalo
  // getPhoneNumber({
  //   success: async (data) => {
  //     const { token } = data;
  //     setTokenState(token);
  //     toggelDrawerAccessPhone(false);
  //   },
  //   fail: (error) => {
  //     // Xử lý khi gọi api thất bại
  //     console.log(error);
  //   },
  // });

  // const zaloToken = { access_token: accessTokenState, code: tokenState };

  // //Bước 3: Gọi lên server để lấy ZaloNumber
  // fetch('https://order.coffeetree.vn/api/get_phone_number_by_zalo_token', {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(zaloToken)
  // }).then((response) => {
  //   console.log('response from coffeetree server', response);
  //   return response.json();
  // }).then((res) => {
  //   console.log('data server', res)
  //   console.log('so dien thoai', res.data.number);
  //   const zaloNumber_demo = "84834234734_demo";
    
  //   //Lưu vào cache
  //   setStorage({
  //     data: {
  //       zaloNumber: zaloNumber_demo,
  //     },
  //     success: (data) => {
  //       const { errorKeys } = data;
  //       console.log("errorKeys", errorKeys);
  //     },
  //     fail: (error) => {
  //       console.log(error);
  //     },
  //   });

  //   //Lưu vào recoil
  //   setUserInfoData({
  //     ...userInfoData,
  //     phone: zaloNumber_demo,
  //   });

  // })
}