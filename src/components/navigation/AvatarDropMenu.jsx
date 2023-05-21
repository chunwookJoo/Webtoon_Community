import { Avatar, Menu } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../../api/user';
import {
	AUTH_TOKEN,
	AVATAR_ITEM,
	LOGIN_TOKEN,
	LOGOUT_SUCCESS,
} from '../../utils/constants.jsx';
import { removeLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';
import WebtoonSearchButton from './WebtoonSearchButton';

const AvatarDropMenu = () => {
	const { data: userInformation } = useQuery(['userInfo'], () => getUserInfo());
	console.log(userInformation);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onClickDropMenu = (type) => {
		switch (type) {
			case 'logout':
				removeLocalStorage(LOGIN_TOKEN);
				removeLocalStorage(AUTH_TOKEN);
				navigate('/');
				showToast(LOGOUT_SUCCESS, 'green');
				break;
			default:
				navigate(`/${type}`);
				break;
		}
	};

	return (
		<>
			{userInformation && (
				<div className="login-container">
					{(pathname === '/' ||
						pathname === '/all' ||
						pathname === '/naver' ||
						pathname === '/kakao' ||
						pathname === '/kakaoPage') && <WebtoonSearchButton />}
					<span className="user-avatar">
						<Menu shadow="lg" width={220} position="bottom-end">
							<Menu.Target>
								<Avatar src={userInformation.profileImage} radius="xl" />
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => onClickDropMenu('userinfo')}>
									<div className="user-info-container">
										<Avatar src={userInformation.profileImage} radius="md" />
										<div className="user-info">
											<h5>{userInformation.nickname}</h5>
											<p>
												<span>{userInformation.age.split('~')[0]}대</span>/
												<span>
													{userInformation.gender === 'male' ? '남자' : '여자'}
												</span>
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
			)}
		</>
	);
};

export default AvatarDropMenu;
