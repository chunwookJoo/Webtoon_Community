import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@mantine/core";
import { Select } from "@mantine/core";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
import "../assets/scss/pages/registPage.scss";

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
	const location = useLocation();
	const userData = location.state.user_data;
	const kakaoAccount = userData.kakao_account;

	// 카카오 토큰, 카카오 회원 정보
	const kakaoToken = location.state.access_token;
	const kakaoId = userData.id;
	const [nickName, setNickName] = useState();
	const [ageRange, setAgeRange] = useState(kakaoAccount.age_range);
	const [gender, setGender] = useState(kakaoAccount.gender);

	const onChangeHandler = (e, state) => {
		if (state === "nickname") setNickName(e.target.value);
		else if (state === "age") setAgeRange(e);
		else if (state === "gender") setGender(e);
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
							<Input
								placeholder="닉네임을 입력하세요."
								onChange={(e) => onChangeHandler(e, "nickname")}
								defaultValue={nickName}
							/>
						</Input.Wrapper>
						<div className="nickname-check">
							<button>중복체크</button>
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
					<button>회원가입하기</button>
				</div>
			</div>
		</div>
	);
};

export default RegistPage;
