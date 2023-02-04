// npm package
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// api
import axios from "axios";
import { API_URL } from "../../config";
import {
	NAVER_CLIENT_ID,
	NAVER_CLIENT_SECRET,
	NAVER_REDIRECT_URL,
} from "./LoginApiData";

// design library (mantine)
import { showNotification } from "@mantine/notifications";

// recoil
import { useRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../../store/recoilAuthState";

// components
import Loading from "../Loading";

// hooks
// icon
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const NaverRedirecting = () => {
	const navigate = useNavigate();
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	// 네이버 access_token 얻기
	const location = useLocation().hash.substr(1);
	const body = location.split("&").reduce((res, item) => {
		let parts = item.split("=");
		res[parts[0]] = parts[1];
		return res;
	}, {});
	body.naver_client_id = NAVER_CLIENT_ID;
	body.naver_client_secret = NAVER_CLIENT_SECRET;
	body.naver_redirect_url = NAVER_REDIRECT_URL;

	useEffect(() => {
		axios.post(API_URL + "/auth/naverLogin", body).then((response) => {
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
				navigate(`/regist/naver?token=${response.data.user.access_token}`, {
					state: {
						data: response.data.user,
						platform: "naver",
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

export default NaverRedirecting;
