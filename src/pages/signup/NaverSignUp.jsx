// npm package
import React from "react";
import { useLocation } from "react-router-dom";

// components
import SignUpPage from "../SignUpPage";

const NaverSignUp = () => {
  const { state } = useLocation();
  const naverAccount = state.data;
  const platform = state.platform;

  /**
   * 네이버 액세스 토큰
   * 네이버 회원 정보
   */
  const naverToken = naverAccount.access_token;
  const naverId = naverAccount.id;

  return (
    <SignUpPage
      platform={platform}
      account={naverAccount}
      token={naverToken}
      id={naverId}
    />
  );
};

export default NaverSignUp;
