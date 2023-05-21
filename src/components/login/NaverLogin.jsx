import { useEffect, useRef } from 'react';

import { NAVER_CLIENT_ID, NAVER_REDIRECT_URL } from './LoginApiData';

const NaverLogin = () => {
	const naverRef = useRef();
	const { naver } = window;

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_REDIRECT_URL,
			isPopup: false,
			loginButton: {
				color: '#01d561',
				type: 3,
				height: '47',
			},
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
			<div
				onClick={handleClick}
				className="naver-btn"
				style={{ cursor: 'pointer' }}>
				<img alt="naver" src="/images/Naver_Logo.png" />
				<span className="naver-btn-text">네이버로 시작하기</span>
			</div>
		</>
	);
};

export default NaverLogin;
