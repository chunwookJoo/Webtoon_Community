import React from "react";
import { KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY } from "./LoginApiData";

const loginWithKakao = () => {
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
	window.location.href = KAKAO_AUTH_URL;
};

const KakaoLogin = () => {
	return (
		<a id="custom-login-btn" className="kakao-btn" onClick={loginWithKakao}>
			<div>
				<img src="/images/kakao_login_medium_narrow.png" />
				{/* <span>카카오로 시작하기</span> */}
			</div>
		</a>
	);
};

export default KakaoLogin;
