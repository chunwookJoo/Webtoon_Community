import { postCheckNickName } from "../api/profile";

const isNicknameCheck = async (nickname) => {
  const postCheckNickNameAPIBody = {
    nickname,
  };

  if (nickname === "") return "empty";

  const response = await postCheckNickName(postCheckNickNameAPIBody);
  if (response.RESULT === 200) return "available";
  else if (response.RESULT === 403) return "unavailable";
};

export default isNicknameCheck;
