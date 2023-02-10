import { ERROR_MESSAGE, USER_ID } from "../utils/constants";
import { getLocalStorage } from "../utils/storage";
import showToast from "../utils/toast";
import api from "./api";

const getUserInfo = async () => {
  try {
    const { data } = await api.get(`/auth/userinfo/${getLocalStorage(USER_ID)}`);
    return data;
  } catch (error) {
    showToast(ERROR_MESSAGE, "red");
    throw new Error(error, "사용자 조회 에러");
  }
};

export { getUserInfo };
