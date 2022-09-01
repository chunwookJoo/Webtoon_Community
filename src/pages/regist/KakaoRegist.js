import React from "react";
import { useLocation } from "react-router-dom";
import RegistPage from "../RegistPage";

const KakaoRegist = () => {
	const { state } = useLocation();
	const userData = state.data;
	const platform = state.platform;

	/**
	 * 카카오 액세스 토큰
	 * 카카오 회원 정보
	 */
	const kakaoAccount = userData.kakao_account;
	const kakaoToken = userData.access_token;
	const kakaoId = userData.id;

	return (
		<RegistPage
			platform={platform}
			account={kakaoAccount}
			token={kakaoToken}
			id={kakaoId}
		/>
	);
};

export default KakaoRegist;
