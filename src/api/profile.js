import { ERROR_MESSAGE } from '../utils/constants';
import showToast from '../utils/toast';
import api from './api';

/**
 * 프로필 사진 변경
 * @param {string} userId
 * @param {any} formData
 */
const postUserProfileImg = async (userId, formData) => {
	try {
		const { data } = await api.post(
			`/auth/userinfo/profileimg/upload/${userId}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '프로필 사진 업로드 에러');
	}
};

const updateUserProfile = async (userId, updateUserProfileAPIBody) => {
	try {
		const { data } = await api.post(
			`/auth/userinfo/update/${userId}`,
			updateUserProfileAPIBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '프로필 변경 에러');
	}
};

const postCheckNickName = async (postCheckNickNameAPIBody) => {
	try {
		const { data } = await api.post(
			'/auth/nickname/check',
			postCheckNickNameAPIBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '닉네임 체크 에러');
	}
};

export { postCheckNickName, postUserProfileImg, updateUserProfile };
