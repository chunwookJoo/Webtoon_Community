import React from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import usePostOauthLogin from '../../hooks/apis/usePostOauthLogin';
import Loading from '../Loading';
import {
	KAKAO_REST_API_KEY,
	NAVER_CLIENT_ID,
	NAVER_CLIENT_SECRET,
	NAVER_REDIRECT_URL,
} from './LoginApiData';

const LoginRedirecting = ({ platform }) => {
	const location = useLocation().hash.substr(1);
	const postNaverLoginAPIBody = location.split('&').reduce((res, item) => {
		let parts = item.split('=');
		res[parts[0]] = parts[1];
		return res;
	}, {});
	postNaverLoginAPIBody.naver_client_id = NAVER_CLIENT_ID;
	postNaverLoginAPIBody.naver_client_secret = NAVER_CLIENT_SECRET;
	postNaverLoginAPIBody.naver_redirect_url = NAVER_REDIRECT_URL;

	const kakaoCode = new URL(window.location.href).searchParams.get('code');
	const postKakaoLoginAPIBody = {
		rest_api_key: KAKAO_REST_API_KEY,
		auth_code: kakaoCode,
		domain: window.location.origin,
	};

	const postOauthLoginBody =
		platform === 'kakao' ? postKakaoLoginAPIBody : postNaverLoginAPIBody;

	usePostOauthLogin(postOauthLoginBody, platform);

	return (
		<div className="regist-container">
			<div className="regist-form-group">
				<div className="regist-title">
					<Logo />
					<h3>로그인</h3>
				</div>
				<div
					style={{
						textAlign: 'center',
						marginTop: '10rem',
					}}>
					<h3>잠시만 기다려주세요.</h3>
					<Loading />
				</div>
			</div>
		</div>
	);
};

export default LoginRedirecting;
