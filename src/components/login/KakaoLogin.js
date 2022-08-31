import React from "react";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY } from "./LoginApiData";
import "../../assets/scss/components/login.scss";

const loginWithKakao = () => {
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
	window.location.href = KAKAO_AUTH_URL;
};

const KakaoLogin = () => {
	return (
		<div className="login-modal">
			<div className="logo">
				<Logo />
				<p>간편하게 로그인하세요!</p>
			</div>
			<div className="oauth-login-btns">
				<a id="custom-login-btn" className="kakao-btn" onClick={loginWithKakao}>
					<img src="/images/kakao_login_medium_wide.png" />
				</a>
				{/* <a id="custom-login-btn" onClick={loginWithKakao}>
					<img src="/images/kakao_login_medium_wide.png" />
				</a> */}
				<div id="naverIdLogin"></div>
			</div>
		</div>
	);
};

export default KakaoLogin;
