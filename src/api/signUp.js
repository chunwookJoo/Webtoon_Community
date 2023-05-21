import { ERROR_MESSAGE } from '../utils/constants.jsx';
import showToast from '../utils/toast';
import api from './api';

const postSignUp = async (platform, signUpApiBody) => {
	try {
		const { data } = await api.post('/auth/signUp', signUpApiBody);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, `${platform} 회원가입 에러`);
	}
};

export { postSignUp };
