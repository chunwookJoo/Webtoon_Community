import React from 'react';
import { useLocation } from 'react-router-dom';

import { NotFound } from '../../pages/PagesIndex';
import SignUpPage from './SignUpPage';

const KakaoSignUp = () => {
	const { state } = useLocation();
	console.log('kakaoSignUp state', state);
	const userData = state?.data;
	const platform = state?.platform;

	const kakaoAccount = userData?.kakao_account;
	const kakaoToken = userData?.access_token;
	const kakaoId = userData?.id;

	return (
		<>
			{state === null ? (
				<NotFound />
			) : (
				<SignUpPage
					platform={platform}
					account={kakaoAccount}
					token={kakaoToken}
					id={kakaoId}
				/>
			)}
		</>
	);
};

export default KakaoSignUp;
