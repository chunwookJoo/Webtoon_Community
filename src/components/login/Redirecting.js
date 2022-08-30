import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { KAKAO_REST_API_KEY } from "./LoginApiData";
import { Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import Loading from "../Loading";
import { useRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../../utils/atom";

/**
 * 발급받은 인가코드 서버로 전송
 */
const Redirecting = () => {
	const navigate = useNavigate();
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	// 인가코드
	let code = new URL(window.location.href).searchParams.get("code");

	const body = {
		rest_api_key: KAKAO_REST_API_KEY,
		auth_code: code,
		domain: window.location.origin,
	};

	/**
	 * 서버에 인가코드 보내고 액세스 토큰 받아옴
	 */
	useEffect(() => {
		axios.post(API_URL + "/auth/kakaoLogin", body).then((response) => {
			if (response.data.RESULT === 200) {
				setJwtToken(response.data.user.jwtToken);
				setUserInfo(response.data.user);
				localStorage.setItem("Authentication", response.data.user.jwtToken);
				// navigate("/", {
				// 	state: response.data.user,
				// 	replace: true,
				// });
				navigate("/");
				return;
			} else if (response.data.RESULT === 401) {
				navigate(`/regist?token=${response.data.user.access_token}`, {
					state: response.data.user,
					replace: true,
				});
			}
		});
	}, []);

	return (
		<div className="regist-container">
			<div className="regist-form-group">
				<div className="regist-title">
					<Logo />
					<h3>로그인</h3>
				</div>
				<div
					style={{
						textAlign: "center",
						marginTop: "7rem",
					}}
				>
					<h3>잠시만 기다려주세요.</h3>
					<Loading />
				</div>
			</div>
		</div>
	);
};

export default Redirecting;
