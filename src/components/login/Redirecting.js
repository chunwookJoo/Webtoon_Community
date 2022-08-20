import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { KAKAO_REST_API_KEY } from "./LoginApiData";
import { Navigate, useNavigate } from "react-router-dom";

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
		console.log(loginData);
		if (loginData === null) {
			return;
		} else {
			navigate(
				{
					pathname: "/regist",
					search: `?token=${loginData?.access_token}`,
				},
				{ replace: true },
				{ state: loginData },
			);
		}
	}, [loginData]);

	return <div>잠시만 기다려주세요.</div>;
};

export default Redirecting;
