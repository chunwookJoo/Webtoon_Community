import '../../assets/scss/components/nav.scss';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getUserInfo } from '../../api/user';
import { jwtTokenState, userInfoState } from '../../store/recoilAuthState';
import { LOGIN_TOKEN } from '../../utils/constants';
import { getLocalStorage } from '../../utils/storage';
import LogoComponent from './Logo';
import PlatformSelect from './platformSelect/PlatformSelect';
import SignIn from './SignIn';
import TransformPage from './TransformPage';
import UserInfo from './UserInfo';
import WeekLink from './WeekLink';

const Nav = () => {
	const { pathname } = useLocation();
	const setUserInfo = useSetRecoilState(userInfoState);
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

	useEffect(() => {
		const fetchUserInfo = async () => {
			setJwtToken(getLocalStorage(LOGIN_TOKEN));
			const response = await getUserInfo();
			setUserInfo(response);
		};
		fetchUserInfo();
	}, [pathname]);

	return (
		<section className="nav-section">
			<div className="nav-container">
				<LogoComponent />
				<TransformPage />
				{jwtToken !== null ? <UserInfo /> : <SignIn />}
			</div>
			<div className="mobile-page-select">
				<TransformPage />
			</div>
			<PlatformSelect />
			{!pathname.includes('board') && <WeekLink />}
		</section>
	);
};

export default Nav;
