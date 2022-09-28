import { Avatar, Input, Select } from "@mantine/core";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../utils/atom";
import "../assets/scss/pages/userinfo.scss";
import axios from "axios";
import { API_URL } from "../config";
import { showNotification } from "@mantine/notifications";

const UserInfo = () => {
	const { state } = useLocation();
	const user = state;
	const nicknameInput = useRef();
	const profileImgInput = useRef();

	const AGE_RANGE = [
		{ value: "10~19", label: "10대" },
		{ value: "20~29", label: "20대" },
		{ value: "30~39", label: "30대" },
		{ value: "40~49", label: "40대" },
		{ value: "50~59", label: "50대" },
		{ value: "60~69", label: "60대" },
	];

	const GENDER = [
		{ value: "male", label: "남자" },
		{ value: "female", label: "여자" },
	];

	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [profileImage, setProfileImage] = useState(user.profileImage);

	const [nickName, setNickName] = useState(user.nickname);
	const [nicknameChecked, setNicknameChecked] = useState("empty");
	const [ageRange, setAgeRange] = useState(user.age);
	const [gender, setGender] = useState(user.gender);

	const onChangeHandler = (e, state) => {
		if (state === "nickname") setNickName(e.target.value);
		else if (state === "age") setAgeRange(e);
		else if (state === "gender") setGender(e);
	};

	const onImgChange = async (e) => {
		const formData = new FormData();
		encodeFileToBase64(e.target.files[0]);
		formData.append("file", e.target.files[0]);
	};

	// 프로필 사진 미리보기 인코딩
	const encodeFileToBase64 = (fileBlob) => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
		return new Promise((resolve) => {
			reader.onload = () => {
				setProfileImage(reader.result);
				resolve();
			};
		});
	};

	// 프로필 사진 수정 버튼 클릭
	const onProfileImgBtnClick = (e) => {
		e.preventDefault();
		profileImgInput.current.click();
	};

	const nicknameBody = {
		nickname: nickName,
	};

	// 닉네임 중복 체크
	const onClickNicknameCheck = () => {
		if (nickName === "") {
			setNicknameChecked("empty");
			return;
		} else {
			axios
				.post(API_URL + "/auth/nickname/check", nicknameBody)
				.then((response) => {
					if (response.data.RESULT === 200) {
						setNicknameChecked("available");
						return;
					} else if (response.data.RESULT === 403) {
						setNicknameChecked("unavailable");
						return;
					}
				});
		}
	};

	// 회원정보 수정 데이터
	const updateBody = {
		profileImage,
		nickname: nickName,
		age: ageRange,
		gender,
	};

	console.log(updateBody);

	// 회원정보 수정하기 버튼
	const onClickUserInfoUpdate = () => {
		if (nicknameChecked === "available") {
			axios
				.post(API_URL + `/auth/userinfo/update/${user.id}`, updateBody)
				.then((response) => {
					if (response.data.RESULT === 200) {
						setUserInfo(response.data.user);
						showNotification({
							message: "프로필이 수정되었습니다.",
							autoClose: 2000,
							radius: "md",
							color: "green",
						});
					}
				});
		} else {
			nicknameInput.current.focus();
			showNotification({
				message: "닉네임 중복체크를 해주세요.",
				autoClose: 2000,
				radius: "md",
				color: "red",
			});
		}
	};

	return (
		<div className="userinfo-container">
			<div className="profile-img-container">
				<Avatar
					size={120}
					src={profileImage}
					radius="xl"
					className="profile-img"
				/>

				<div style={{ fontWeight: "bold" }}>{user.email}</div>
				<div className="profile-img-edit">
					<input
						style={{ display: "none" }}
						ref={profileImgInput}
						type="file"
						className="imgInput"
						accept="image/*"
						name="file"
						onChange={(e) => onImgChange(e)}
					></input>
					<button onClick={onProfileImgBtnClick}>사진 수정</button>
				</div>
			</div>
			<div className="profile-input">
				<Input.Wrapper label="닉네임" required>
					&nbsp;
					<span style={{ fontSize: "12px" }}>({nickName.length}/8자)</span>
					<Input
						maxLength={8}
						placeholder="닉네임을 입력하세요."
						onChange={(e) => onChangeHandler(e, "nickname")}
						defaultValue={nickName}
						ref={nicknameInput}
					/>
				</Input.Wrapper>
				<div className="nickname-check">
					<button onClick={(e) => onClickNicknameCheck(e)}>중복체크</button>
					{nicknameChecked === "empty" ? (
						<span className="unavailable">닉네임을 입력해주세요.</span>
					) : nicknameChecked === "available" ? (
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
						defaultValue={ageRange}
						onChange={(e) => onChangeHandler(e, "age")}
					/>
				</Input.Wrapper>
			</div>
			<div className="profile-input">
				<Input.Wrapper label="성별" required>
					<Select
						placeholder="성별을 선택하세요."
						data={GENDER}
						defaultValue={gender}
						onChange={(e) => onChangeHandler(e, "gender")}
					/>
				</Input.Wrapper>
			</div>
			<div className="profile-btn">
				<button onClick={onClickUserInfoUpdate}>프로필 수정하기</button>
			</div>
		</div>
	);
};

export default UserInfo;
