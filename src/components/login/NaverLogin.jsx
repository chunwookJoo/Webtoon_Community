import React, { useEffect, useRef } from "react";
import { NAVER_CLIENT_ID, NAVER_REDIRECT_URL } from "./LoginApiData";

const NaverLogin = () => {
	const naverRef = useRef();
	const { naver } = window;

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_REDIRECT_URL,
			isPopup: false, // popup 형식으로 띄울것인지 설정
			loginButton: { color: "#01d561", type: 3, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
		});
		naverLogin.init();
		naverLogin.logout();
	};

	useEffect(() => {
		initializeNaverLogin();
	}, []);

	const handleClick = () => {
		naverRef.current.children[0].click();
	};

	return (
		<>
			<div ref={naverRef} id="naverIdLogin"></div>
			<div onClick={handleClick} className="naver-btn">
				<img alt="naver" src="/images/Naver_Logo.png" />
				<span className="naver-btn-text">네이버로 시작하기</span>
			</div>
		</>
	);
};

export default NaverLogin;
