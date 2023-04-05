import '../../assets/scss/components/navback.scss';

import { IconChevronLeft } from '@tabler/icons';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { getUserInfo } from '../../api/user';
import { jwtTokenState, userInfoState } from '../../store/recoilAuthState';
import { LOGIN_TOKEN, USER_ID } from '../../utils/constants';
import { getLocalStorage } from '../../utils/storage';
import LogoComponent from './Logo';
import SignIn from './SignIn';
import UserInfo from './UserInfo';

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
