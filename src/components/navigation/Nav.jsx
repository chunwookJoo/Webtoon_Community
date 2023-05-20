import '../../assets/scss/components/nav.scss';

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getUserInfo } from '../../api/user';
import { jwtTokenState, userInfoState } from '../../store/recoilAuthState';
import { LOGIN_TOKEN } from '../../utils/constants.jsx';
import { getLocalStorage } from '../../utils/storage';
import UserInfo from './AvatarDropMenu';
import LogoComponent from './Logo';
import PlatformSelect from './platformSelect/PlatformSelect';
import SignIn from './SignIn';
import TransformPage from './TransformPage';
import WeekLink from './WeekLink';

const Nav = () => {
	const { pathname } = useLocation();
	const setUserInfo = useSetRecoilState(userInfoState);
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	console.log(jwtToken);
	// useEffect(() => {
	// 	const fetchUserInfo = async () => {
	// 		setJwtToken(getLocalStorage(LOGIN_TOKEN));
	// 		const response = await getUserInfo();
	// 		setUserInfo(response);
	// 	};
	// 	fetchUserInfo();
	// }, [pathname]);

	return (
		<>
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
			<Outlet />
		</>
	);
};

export default Nav;
