import { ERROR_MESSAGE } from '../utils/constants.jsx';
import showToast from '../utils/toast';
import api from './api';

const cloudName = import.meta.env.VITE_CLOUD_NAME;

/**
 * cloudinary에 사진 업로드
 * @param {body} formData
 */
const postUploadCloudinaryImage = async (formData) => {
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
 * cloudinary에 있는 사진 삭제
 * @param {body} formData imagePublicId
 */
// const destroyUserProfileImg = async (
// 	imagePublicId,
// 	imageSignature,
// 	timestamp,
// ) => {
// 	console.log(imagePublicId);
// 	console.log(imageSignature);
// 	const formData = new FormData();
// 	formData.append('public_id', imagePublicId);
// 	formData.append('signature', imageSignature);
// 	formData.append('api_key', cloudApiKey);
// 	// formData.append('timestamp', timestamp);
// 	console.log(formData);
// 	try {
// 		const data = await api.post(
// 			`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
// 			formData,
// 		);
// 		console.log(data);
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		showToast(ERROR_MESSAGE, 'red');
// 		throw new Error(error, '사진 삭제 에러');
// 	}
// };

/**
 * DB에 image저장
 * @param {string} userId
 * @param {body} imageBody
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
	// destroyUserProfileImg,
	postCheckNickName,
	postUploadCloudinaryImage,
	postUserProfileImg,
	updateUserProfile,
};
