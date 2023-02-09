import { ERROR_MESSAGE } from "../utils/constants";
import api from "./api";

const postSignUP = async (platform, signUpApiBody) => {
  const platformUrl = platform === "kakao" ? "kakaoSignUp" : "naverSignUp";
  try {
    const { data } = await api.post(`/auth/${platformUrl}`, signUpApiBody);
    return data;
  } catch (error) {
    showToast(ERROR_MESSAGE, "red");
    throw new Error(error, `${platform} 회원가입 에러`);
  }
};

export { postSignUP };
