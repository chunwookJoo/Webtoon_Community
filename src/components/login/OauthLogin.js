import React from "react";
import KakaoLogin from "./KakaoLogin";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import "../../assets/scss/components/login.scss";
import NaverLogin from "./NaverLogin";

const OauthLogin = () => {
	return (
		<div className="login-modal">
			<div className="logo">
				<Logo />
				<p>간편하게 로그인하세요!</p>
			</div>
			<div className="oauth-login-btns">
				<KakaoLogin />
				<NaverLogin />
			</div>
		</div>
	);
};

export default OauthLogin;
