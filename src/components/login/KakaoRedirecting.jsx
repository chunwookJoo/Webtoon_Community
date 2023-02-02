import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { KAKAO_REST_API_KEY } from "./LoginApiData";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import Loading from "../Loading";
import { useRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../../utils/atom";
import { showNotification } from "@mantine/notifications";

/**
 * 발급받은 인가코드 서버로 전송
 */
const KakaoRedirecting = () => {
	const navigate = useNavigate();

	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	// 카카오 인가코드
	let kakaoCode = new URL(window.location.href).searchParams.get("code");

	const kakaoBody = {
		rest_api_key: KAKAO_REST_API_KEY,
		auth_code: kakaoCode,
		domain: window.location.origin,
	};

	/**
	 * 서버에 인가코드 보내고 액세스 토큰 받아옴
	 */
	useEffect(() => {
		axios.post(API_URL + "/auth/kakaoLogin", kakaoBody).then((response) => {
			if (response.data.RESULT === 200) {
				setJwtToken(response.data.user.jwtToken);
				setUserInfo(response.data.user);
				localStorage.setItem("Authentication", response.data.user.jwtToken);
				localStorage.setItem("userId", response.data.user.user.id);
				navigate("/");
				showNotification({
					message: `${response.data.user.user_data.nickname}님, 환영합니다.`,
					autoClose: 2000,
					radius: "md",
					color: "green",
				});
				return;
			} else if (response.data.RESULT === 401) {
				navigate(`/regist/kakao?token=${response.data.user.access_token}`, {
					state: {
						data: response.data.user,
						platform: "kakao",
					},
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
						marginTop: "10rem",
					}}
				>
					<h3>잠시만 기다려주세요.</h3>
					<Loading />
				</div>
			</div>
		</div>
	);
};

export default KakaoRedirecting;
