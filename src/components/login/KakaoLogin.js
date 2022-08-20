import React from "react";
// import { REDIRECT_URL, REST_API_KEY } from "../../config";
import { KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY } from "./LoginApiData";

const loginWithKakao = () => {
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
	window.location.href = KAKAO_AUTH_URL;
};

const KakaoLogin = () => {
	return (
		<div>
			<a id="custom-login-btn" onClick={loginWithKakao}>
				<img src="/images/kakao_login_medium_wide.png" />
			</a>
		</div>
	);
};

export default KakaoLogin;
