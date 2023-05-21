import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postKakaoLogin } from '../../api/auth';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import {
	AUTH_TOKEN,
	LOGIN_SUCCESS,
	LOGIN_TOKEN,
} from '../../utils/constants.jsx';
import { setLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';
import Loading from '../Loading';
// import { KAKAO_REST_API_KEY } from './LoginApiData';

const KakaoRedirecting = () => {
	const navigate = useNavigate();

	const kakaoCode = new URL(window.location.href).searchParams.get('code');

	const postKakaoLoginAPIBody = {
		rest_api_key: import.meta.env.VITE_KAKAO_REST_API_KEY,
		auth_code: kakaoCode,
		domain: window.location.origin,
	};

	useEffect(() => {
		const fetchKakaoLogin = async () => {
			const response = await postKakaoLogin(postKakaoLoginAPIBody);
			if (response.RESULT === 200) {
				setLocalStorage(AUTH_TOKEN, response.user.user.authToken);
				setLocalStorage(LOGIN_TOKEN, response.user.jwtToken);
				navigate('/');
				showToast(response.user.user.nickname + LOGIN_SUCCESS, 'green');
				return;
			} else if (response.RESULT === 401) {
				navigate('/regist/kakao', {
					state: {
						data: response.user,
						platform: 'kakao',
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

export default KakaoRedirecting;
