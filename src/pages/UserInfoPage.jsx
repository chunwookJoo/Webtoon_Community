import '../assets/scss/pages/userinfo.scss';

import { Avatar, Input, Select } from '@mantine/core';
import { useRef, useState } from 'react';

import { postUserProfileImg, updateUserProfile } from '../api/profile';
import Loading from '../components/Loading';
import useFetchUserInfo from '../hooks/apis/useFetchUserInfo';
import {
	AGE_RANGE,
	GENDER,
	NICKNAME_CHECK_WARNING,
	UPDATE_PROFILE_SUCCESS,
} from '../utils/constants.jsx';
import { compressImage } from '../utils/imageCompressor';
import showToast from '../utils/toast';
import isNicknameCheck from '../utils/user';

const UserInfoPage = () => {
	const { data: userInformation, isLoading } = useFetchUserInfo();
	const nicknameInput = useRef();
	const profileImgInput = useRef();

	const [age, setAge] = useState(null);
	const [gender, setGender] = useState(null);
	const [nickname, setNickName] = useState('');

	const [profileImagePreview, setProfileImagePreview] = useState(null);
	const [nicknameChecked, setNicknameChecked] = useState('');

	const onChangeHandler = (e, state) => {
		if (state === 'nickname') setNickName(e.target.value);
		else if (state === 'age') setAge(e);
		else if (state === 'gender') setGender(e);
	};

	const onChangeImage = async (e) => {
		const file = e.target.files[0];

		if (file) {
			const compressedImage = await compressImage(file);
			encodeFileToBase64(compressedImage);

			const formData = new FormData();
			formData.append('images', compressedImage);
			const imageResponse = await postUserProfileImg(
				userInformation?._id,
				formData,
			);
		}
	};

	// 프로필 사진 미리보기 인코딩
	const encodeFileToBase64 = (fileBlob) => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
		return new Promise((resolve) => {
			reader.onload = () => {
				setProfileImagePreview(reader.result);
				resolve();
			};
		});
	};

	const onClickNicknameCheck = async () => {
		setNicknameChecked(await isNicknameCheck(nickname));
	};

	const onClickUserInfoUpdate = async () => {
		const updateUserProfileAPIBody = {
			nickname,
			age: age ? age : userInformation.age,
			gender: gender ? gender : userInformation.gender,
		};

		if (nicknameChecked === 'available') {
			const response = await updateUserProfile(
				userInformation?._id,
				updateUserProfileAPIBody,
			);

			if (response.RESULT === 200) {
				return showToast(UPDATE_PROFILE_SUCCESS, 'green');
			}
		} else {
			nicknameInput.current.focus();
			showToast(NICKNAME_CHECK_WARNING, 'yellow');
		}
	};

	if (isLoading) return <Loading />;

	return (
		<>
			{userInformation && (
				<div className="userinfo-container">
					<div className="profile-img-container">
						<Avatar
							alt="사용자 프로필 이미지"
							size={120}
							src={
								profileImagePreview
									? profileImagePreview
									: userInformation.profileImage
							}
							radius="xl"
							className="profile-img"
						/>

						<div style={{ fontWeight: 'bold' }}>{userInformation.email}</div>
						<div className="profile-img-edit">
							<input
								style={{ display: 'none' }}
								ref={profileImgInput}
								type="file"
								className="imgInput"
								accept="image/*"
								name="file"
								onChange={(e) => onChangeImage(e)}></input>
							<button onClick={() => profileImgInput.current.click()}>
								사진 수정
							</button>
						</div>
					</div>
					<div className="profile-input">
						<Input.Wrapper label="닉네임" required>
							&nbsp;
							<span style={{ fontSize: '12px' }}>({nickname?.length}/8자)</span>
							<Input
								maxLength={8}
								placeholder="닉네임을 입력하세요."
								onChange={(e) => onChangeHandler(e, 'nickname')}
								defaultValue={userInformation.nickname}
								ref={nicknameInput}
							/>
						</Input.Wrapper>
						<div className="nickname-check">
							<button onClick={(e) => onClickNicknameCheck(e)}>중복체크</button>
							{nicknameChecked === 'empty' ? (
								<span className="unavailable">닉네임 중복체크를 해주세요.</span>
							) : nicknameChecked === 'available' ? (
								<span className="available">사용할 수 있는 닉네임입니다.</span>
							) : (
								<span className="unavailable">이미 사용중인 닉네임입니다.</span>
							)}
						</div>
					</div>
					<div className="profile-input">
						<Input.Wrapper label="나이" required>
							<Select
								placeholder="본인 연령대를 선택하세요."
								data={AGE_RANGE}
								defaultValue={userInformation && userInformation.age}
								onChange={(e) => onChangeHandler(e, 'age')}
							/>
						</Input.Wrapper>
					</div>
					<div className="profile-input">
						<Input.Wrapper label="성별" required>
							<Select
								placeholder="성별을 선택하세요."
								data={GENDER}
								defaultValue={userInformation.gender}
								onChange={(e) => onChangeHandler(e, 'gender')}
							/>
						</Input.Wrapper>
					</div>
					<div className="profile-btn">
						<button onClick={onClickUserInfoUpdate}>프로필 수정하기</button>
					</div>
				</div>
			)}
		</>
	);
};

export default UserInfoPage;
