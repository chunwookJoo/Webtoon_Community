// 모바일 화면에서 보이는 뒤로가기 버튼

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../utils/atom";
import { LogoComponent, SignIn, UserInfo } from "./Nav";
import { IconChevronLeft } from "@tabler/icons";
import "../assets/scss/components/navback.scss";
import axios from "axios";
import { API_URL } from "../config";

const NavBack = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

	useEffect(() => {
		setJwtToken(localStorage.getItem("Authentication"));

		axios
			.get(API_URL + `/auth/userinfo/${localStorage.getItem("userId")}`)
			.then((response) => {
				setUserInfo(response.data);
			});
	}, [location]);

	const onClickBackPage = () => {
		navigate(-1);
	};

	return (
		<section className="nav-section">
			<div className="nav-container">
				<div className="webtoon-detail-logo">
					<LogoComponent />
				</div>
				<span onClick={onClickBackPage} className="back-btn">
					<IconChevronLeft size={24} />
				</span>
				{jwtToken !== null ? <UserInfo /> : <SignIn />}
			</div>
		</section>
	);
};

export default NavBack;
