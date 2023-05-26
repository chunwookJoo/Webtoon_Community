import { ERROR_MESSAGE } from '../utils/constants.jsx';
import showToast from '../utils/toast';
import api from './api';

const postUploadCloudinaryImage = async (formData) => {
	const cloudName = import.meta.env.VITE_CLOUD_NAME;
	try {
		const data = await api.post(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
			formData,
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

/**
 * 프로필 사진 변경
 * @param {string} userId
 * @param {body} imageBody imagePublicId, imageUrl
 */
const postUserProfileImg = async (userId, imageBody) => {
	try {
		const data = await api.post(
			`/auth/userinfo/profileimg/upload/${userId}`,
			imageBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '프로필 사진 업로드 에러');
	}
};
/**
 * 프로필 사진 변경
 * @param {string} userId
 * @param {any} formData
 */
// const postUserProfileImg = async (userId, formData) => {
// 	try {
// 		const data = await api.post(
// 			`/auth/userinfo/profileimg/upload/${userId}`,
// 			formData,
// 			{
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 				},
// 			},
// 		);
// 		return data;
// 	} catch (error) {
// 		showToast(ERROR_MESSAGE, 'red');
// 		throw new Error(error, '프로필 사진 업로드 에러');
// 	}
// };

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

export {
	postCheckNickName,
	postUploadCloudinaryImage,
	postUserProfileImg,
	updateUserProfile,
};
