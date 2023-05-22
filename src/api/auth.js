import { ERROR_MESSAGE } from '../utils/constants.jsx';
import showToast from '../utils/toast';
import api from './api';

export const postOauthLogin = async (postOauthLoginBody, platform) => {
	try {
		const { data } = await api.post(
			`/auth/${platform}Login`,
			postOauthLoginBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '간편 로그인 에러');
	}
};
