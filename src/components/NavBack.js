// 모바일 화면에서 보이는 뒤로가기 버튼

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtTokenState } from "../utils/atom";
import { LogoComponent, SignIn, UserInfo } from "./Nav";
import { IconChevronLeft } from "@tabler/icons";
import "../assets/scss/components/navback.scss";

const NavBack = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [userId, setUserId] = useState();
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

	useEffect(() => {
		setUserId(localStorage.getItem("userId"));
		setJwtToken(localStorage.getItem("Authentication"));
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
				{jwtToken !== null ? <UserInfo userId={userId} /> : <SignIn />}
			</div>
		</section>
	);
};

export default NavBack;
