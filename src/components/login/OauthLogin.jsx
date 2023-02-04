// npm package
import React from "react";

// api
// design library (mantine)
// recoil
// components
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";

// hooks
// icon
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import "../../assets/scss/components/login.scss";

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
