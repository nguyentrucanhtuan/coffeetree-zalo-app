import { atom } from "recoil";

export const userInfoState = atom({
  key: "UserInfo",
  default: {
    id: null,
    idByOA: null,
    name: null,
    avatar: null,
    phone: null,
  },
});
