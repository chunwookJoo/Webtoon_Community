import React from 'react';

import { KAKAO_REDIRECT_URL, KAKAO_REST_API_KEY } from './LoginApiData';

const loginWithKakao = () => {
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
	window.location.href = KAKAO_AUTH_URL;
};

const KakaoLogin = () => {
	return (
		<div
			id="custom-login-btn"
			className="kakao-btn"
			style={{ cursor: 'pointer' }}
			onClick={loginWithKakao}>
			<div>
				<img alt="kakao" src="/images/kakao_login_medium_narrow.png" />
			</div>
		</div>
	);
};

export default KakaoLogin;
