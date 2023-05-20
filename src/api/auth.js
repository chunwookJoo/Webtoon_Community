import { ERROR_MESSAGE } from '../utils/constants.jsx';
import showToast from '../utils/toast';
import api from './api';

const postKakaoLogin = async (postKakaoLoginAPIBody) => {
	try {
		const { data } = await api.post('/auth/kakaoLogin', postKakaoLoginAPIBody);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '카카오 로그인 에러');
	}
};

const postNaverLogin = async (postNaverLoginAPIBody) => {
	try {
		const { data } = await api.post('/auth/naverLogin', postNaverLoginAPIBody);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '네이버 로그인 에러');
	}
};

export { postKakaoLogin, postNaverLogin };
