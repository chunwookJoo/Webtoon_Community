import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { postNaverLogin } from '../../api/auth';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { jwtTokenState, userInfoState } from '../../store/recoilAuthState';
import { LOGIN_SUCCESS, LOGIN_TOKEN, USER_ID } from '../../utils/constants.jsx';
import { setLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';
import Loading from '../Loading';
import {
	NAVER_CLIENT_ID,
	NAVER_CLIENT_SECRET,
	NAVER_REDIRECT_URL,
} from './LoginApiData';

const NaverRedirecting = () => {
	const navigate = useNavigate();

	const setJwtToken = useSetRecoilState(jwtTokenState);
	const setUserInfo = useSetRecoilState(userInfoState);

	// 네이버 access_token 얻기
	const location = useLocation().hash.substr(1);
	const postNaverLoginAPIBody = location.split('&').reduce((res, item) => {
		let parts = item.split('=');
		res[parts[0]] = parts[1];
		return res;
	}, {});
	postNaverLoginAPIBody.naver_client_id = NAVER_CLIENT_ID;
	postNaverLoginAPIBody.naver_client_secret = NAVER_CLIENT_SECRET;
	postNaverLoginAPIBody.naver_redirect_url = NAVER_REDIRECT_URL;

	useEffect(() => {
		const fetchNaverLogin = async () => {
			const response = await postNaverLogin(postNaverLoginAPIBody);
			if (response.RESULT === 200) {
				setJwtToken(response.user.jwtToken);
				setUserInfo(response.user);
				setLocalStorage(LOGIN_TOKEN, response.user.jwtToken);
				setLocalStorage(USER_ID, response.user.user.id);
				navigate('/');
				showToast(response.user.user_data.nickname + LOGIN_SUCCESS, 'green');
				return;
			} else if (response.RESULT === 401) {
				navigate(`/regist/naver?token=${response.user.access_token}`, {
					state: {
						data: response.user,
						platform: 'naver',
					},
					replace: true,
				});
			}
		};
		fetchNaverLogin();
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

export default NaverRedirecting;
