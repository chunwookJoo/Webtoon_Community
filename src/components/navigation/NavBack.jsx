import '../../assets/scss/components/navback.scss';

import { IconChevronLeft } from '@tabler/icons';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getUserInfo } from '../../api/user';
import { jwtTokenState, userInfoState } from '../../store/recoilAuthState';
import { LOGIN_TOKEN } from '../../utils/constants.jsx';
import { getLocalStorage } from '../../utils/storage';
import UserInfo from './AvatarDropMenu';
import LogoComponent from './Logo';
import SignIn from './SignIn';

const NavBack = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const setUserInfo = useSetRecoilState(userInfoState);
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

	useEffect(() => {
		const fetchUserInfo = async () => {
			setJwtToken(getLocalStorage(LOGIN_TOKEN));
			const response = await getUserInfo();
			setUserInfo(response);
		};

		fetchUserInfo();
	}, [location]);

	const onClickBackPage = () => {
		navigate(-1);
	};

	return (
		<>
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
			<Outlet />
		</>
	);
};

export default NavBack;
