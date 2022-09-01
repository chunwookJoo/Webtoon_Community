import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
// import { Select } from "@mantine/core";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
import "../assets/scss/pages/registPage.scss";
import axios from "axios";
import { API_URL } from "../config";
import { useRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../utils/atom";

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

const RegistPage = (props) => {
	const navigate = useNavigate();
	const nicknameInput = useRef();
	const { platform, account, token, id } = props;

	const email = account.email;
	const profileImage =
		platform === "kakao"
			? account.profile.thumbnail_image_url
			: account.profile_image;
	const [ageRange, setAgeRange] = useState(
		platform === "kakao" ? account.age_range : account.age.replace("-", "~"),
	);
	const [gender, setGender] = useState(
		account.gender === "M" ? "male" : "female",
	);

	/**
	 * 공통으로 쓰이는 state
	 */
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [nickName, setNickName] = useState("");
	const [nicknameChecked, setNicknameChecked] = useState("empty");

	const onChangeHandler = (e, state) => {
		if (state === "nickname") setNickName(e.target.value);
		else if (state === "age") setAgeRange(e);
		else if (state === "gender") setGender(e);
	};

	const nicknameBody = {
		nickname: nickName,
	};

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

	const kakaoBody = {
		kakaoToken: token,
		id,
		email,
		profileImage,
		nickname: nickName,
		age: ageRange,
		gender,
	};

	const naverBody = {
		naverToken: token,
		id,
		email,
		profileImage,
		nickname: nickName,
		age: ageRange,
		gender,
	};

	const onClickSignup = (e, platform) => {
		if (nicknameChecked === "available") {
			if (platform === "kakao") {
				axios
					.post(API_URL + "/auth/kakaoSignUp", kakaoBody)
					.then((response) => {
						if (response.data.RESULT === 200) {
							setJwtToken(response.data.jwtToken);
							setUserInfo(response.data.user_data);
							localStorage.setItem("Authentication", response.data.jwtToken);
							navigate("/");
							showNotification({
								message: "정상적으로 회원가입되었습니다.",
								autoClose: 2000,
								radius: "md",
								color: "green",
							});
							return;
						}
					});
			} else if (platform === "naver") {
				axios
					.post(API_URL + "/auth/naverSignUp", naverBody)
					.then((response) => {
						console.log(response);
						if (response.data.RESULT === 200) {
							setJwtToken(response.data.jwtToken);
							setUserInfo(response.data.user_data);
							localStorage.setItem("Authentication", response.data.jwtToken);
							navigate("/");
							showNotification({
								message: "정상적으로 회원가입되었습니다.",
								autoClose: 2000,
								radius: "md",
								color: "green",
							});
							return;
						}
					});
			}
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
		<div className="regist-container">
			<div className="regist-form-group">
				<div className="regist-title">
					<Logo />
					<h3>회원가입</h3>
				</div>
				<div className="regist-form">
					<div className="regist-input">
						<Input.Wrapper label="이메일" required>
							<Input defaultValue={account.email} disabled />
						</Input.Wrapper>
					</div>
					<div className="regist-input">
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
							{nicknameChecked === "empty" ? (
								<span className="unavailable">닉네임을 입력해주세요.</span>
							) : nicknameChecked === "available" ? (
								<span className="available">사용할 수 있는 닉네임입니다.</span>
							) : (
								<span className="unavailable">이미 사용중인 닉네임입니다.</span>
							)}
							<button onClick={(e) => onClickNicknameCheck(e)}>중복체크</button>
						</div>
					</div>
					<div className="regist-input">
						<Input.Wrapper label="나이" required>
							<Select
								placeholder="본인 연령대를 선택하세요."
								data={AGE_RANGE}
								defaultValue={ageRange}
								onChange={(e) => onChangeHandler(e, "age")}
							/>
						</Input.Wrapper>
					</div>
					<div className="regist-input">
						<Input.Wrapper label="성별" required>
							<Select
								placeholder="성별을 선택하세요."
								data={GENDER}
								defaultValue={gender}
								onChange={(e) => onChangeHandler(e, "gender")}
							/>
						</Input.Wrapper>
					</div>
				</div>
				<div className="regist-btn">
					<button onClick={(e) => onClickSignup(e, platform)}>
						회원가입하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegistPage;
