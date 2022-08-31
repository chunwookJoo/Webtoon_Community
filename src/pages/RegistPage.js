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

const RegistPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const nicknameInput = useRef();
	const userData = location.state.user_data;
	const kakaoAccount = userData.kakao_account;
	const [nicknameChecked, setNicknameChecked] = useState("empty");
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	/**
	 * 카카오 액세스 토큰
	 * 카카오 회원 정보
	 */
	const kakaoToken = location.state.access_token;
	const kakaoId = userData.id;
	const email = kakaoAccount.email;
	const profileImage = kakaoAccount.profile.thumbnail_image_url;
	const [nickName, setNickName] = useState("");
	const [ageRange, setAgeRange] = useState(kakaoAccount.age_range);
	const [gender, setGender] = useState(kakaoAccount.gender);

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

	const body = {
		kakaoToken,
		id: kakaoId,
		email,
		profileImage,
		nickname: nickName,
		age: ageRange,
		gender,
	};

	const onClickSignup = (e, domain) => {
		if (nicknameChecked === "available") {
			if (domain === "kakao") {
				axios.post(API_URL + "/auth/kakaoSignUp", body).then((response) => {
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
							<Input defaultValue={kakaoAccount.email} disabled />
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
					<button onClick={(e) => onClickSignup(e, "kakao")}>
						회원가입하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegistPage;
