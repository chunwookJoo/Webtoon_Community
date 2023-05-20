import { Avatar, Menu } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userInfoState } from '../../store/recoilAuthState';
import {
	AVATAR_ITEM,
	LOGIN_TOKEN,
	LOGOUT_SUCCESS,
	USER_ID,
} from '../../utils/constants.jsx';
import { removeLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';
import WebtoonSearchButton from './WebtoonSearchButton';

const AvatarDropMenu = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const userInfo = useRecoilValue(userInfoState);

	const onClickDropMenu = (type) => {
		switch (type) {
			case 'logout':
				removeLocalStorage(LOGIN_TOKEN);
				removeLocalStorage(USER_ID);
				navigate('/');
				showToast(LOGOUT_SUCCESS, 'green');
				setTimeout(() => {
					window.location.reload();
				}, 1000);
				break;
			default:
				navigate(`/${type}`);
				break;
		}
	};

	return (
		<div className="login-container">
			{(pathname === '/' ||
				pathname === '/all' ||
				pathname === '/naver' ||
				pathname === '/kakao' ||
				pathname === '/kakaoPage') && <WebtoonSearchButton />}
			<span className="user-avatar">
				<Menu shadow="lg" width={220} position="bottom-end">
					<Menu.Target>
						<Avatar src={userInfo?.profileImage} radius="xl" />
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item onClick={() => onClickDropMenu('userinfo')}>
							<div className="user-info-container">
								<Avatar src={userInfo?.profileImage} radius="md" />
								<div className="user-info">
									<h5>{userInfo?.nickname}</h5>
									<p>
										<span>{userInfo?.age?.split('~')[0]}대</span>/
										<span>{userInfo?.gender === 'male' ? '남자' : '여자'}</span>
									</p>
								</div>
							</div>
						</Menu.Item>
						{AVATAR_ITEM.map(({ id, icon, name, target, className }) => (
							<Menu.Item
								className={className}
								key={id}
								icon={icon}
								onClick={() => onClickDropMenu(target)}>
								<div>{name}</div>
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			</span>
		</div>
	);
};

export default AvatarDropMenu;
