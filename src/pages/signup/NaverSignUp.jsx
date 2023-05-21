import React from 'react';
import { useLocation } from 'react-router-dom';

import { NotFound } from '../../pages/PagesIndex';
import SignUpPage from './SignUpPage';

const NaverSignUp = () => {
	const { state } = useLocation();
	const naverAccount = state?.data;
	const platform = state?.platform;

	const naverToken = naverAccount?.access_token;
	const naverId = naverAccount?.id;

	return (
		<>
			{state === null ? (
				<NotFound />
			) : (
				<SignUpPage
					platform={platform}
					account={naverAccount}
					token={naverToken}
					id={naverId}
				/>
			)}
		</>
	);
};

export default NaverSignUp;
