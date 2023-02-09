// npm package
import React from "react";
import { useLocation } from "react-router-dom";

// components
import SignUpPage from "../SignUpPage";

const KakaoSignUp = () => {
  const { state } = useLocation();
  const userData = state.data;
  const platform = state.platform;

  /**
   * 카카오 액세스 토큰
   * 카카오 회원 정보
   */
  const kakaoAccount = userData.kakao_account;
  const kakaoToken = userData.access_token;
  const kakaoId = userData.id;

  return (
    <SignUpPage
      platform={platform}
      account={kakaoAccount}
      token={kakaoToken}
      id={kakaoId}
    />
  );
};

export default KakaoSignUp;
