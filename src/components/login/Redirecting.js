import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { KAKAO_REST_API_KEY } from "./LoginApiData";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading";

// 인가코드 서버에 전송
const Redirecting = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState(null);

	let code = new URL(window.location.href).searchParams.get("code");

	const body = {
		rest_api_key: KAKAO_REST_API_KEY,
		auth_code: code,
		domain: window.location.origin,
	};

	useEffect(() => {
		axios.post(API_URL + "/auth/kakaoLogin", body).then((response) => {
			if (response.data.RESULT === 200) {
				setLoginData(response.data.user);
			}
		});
	}, [code]);

	useEffect(() => {
		if (loginData === null) {
			return;
		} else {
			navigate(`/regist?token=${loginData?.access_token}`, {
				state: loginData,
				replace: true,
			});
		}
	}, [loginData]);

	return (
		<div
			style={{
				textAlign: "center",
				marginTop: "10rem",
			}}
		>
			<h3>잠시만 기다려주세요.</h3>
			<Loading />
		</div>
	);
};

export default Redirecting;
