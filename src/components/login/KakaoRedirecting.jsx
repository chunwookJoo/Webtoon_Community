// npm package
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// api
import { KAKAO_REST_API_KEY } from "./LoginApiData";
import { postKakaoLogin } from "../../api/auth";

// recoil
import { useSetRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../../store/recoilAuthState";

// components
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import Loading from "../Loading";

// utils
import { setLocalStorage } from "../../utils/storage";
import { LOGIN_SUCCESS, LOGIN_TOKEN, USER_ID } from "../../utils/constants";
import showToast from "../../utils/toast";

/**
 * 발급받은 인가코드 서버로 전송
 */
const KakaoRedirecting = () => {
  const navigate = useNavigate();

  const setJwtToken = useSetRecoilState(jwtTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);

  // 카카오 인가코드
  let kakaoCode = new URL(window.location.href).searchParams.get("code");

  const postKakaoLoginAPIBody = {
    rest_api_key: KAKAO_REST_API_KEY,
    auth_code: kakaoCode,
    domain: window.location.origin,
  };

  /**
   * 서버에 인가코드 보내고 액세스 토큰 받아옴
   */
  useEffect(() => {
    const fetchKakaoLogin = async () => {
      const response = await postKakaoLogin(postKakaoLoginAPIBody);
      if (response.RESULT === 200) {
        setJwtToken(response.user.jwtToken);
        setUserInfo(response.user);
        setLocalStorage(LOGIN_TOKEN, response.user.jwtToken);
        setLocalStorage(USER_ID, response.user.user.id);
        navigate("/");
        showToast(response.user.user.nickname + LOGIN_SUCCESS, "green");
        return;
      } else if (response.RESULT === 401) {
        navigate(`/regist/kakao?token=${response.user.access_token}`, {
          state: {
            data: response.user,
            platform: "kakao",
          },
          replace: true,
        });
      }
    };

    fetchKakaoLogin();
  }, []);

  return (
    <div className="regist-container">
      <div className="regist-form-group">
        <div className="regist-title">
          <Logo />
          <h3>로그인</h3>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "10rem",
          }}
        >
          <h3>잠시만 기다려주세요.</h3>
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default KakaoRedirecting;
