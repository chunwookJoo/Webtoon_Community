import '../../assets/scss/components/navback.scss';

import { IconChevronLeft } from '@tabler/icons';
import { Outlet, useNavigate } from 'react-router-dom';

import { LOGIN_TOKEN } from '../../utils/constants.jsx';
import { getLocalStorage } from '../../utils/storage';
import UserInfo from './AvatarDropMenu';
import LogoComponent from './Logo';
import SignIn from './SignIn';

const NavBack = () => {
	const navigate = useNavigate();

	return (
		<>
			<section className="nav-section">
				<div className="nav-container">
					<div className="webtoon-detail-logo">
						<LogoComponent />
					</div>
					<span onClick={() => navigate(-1)} className="back-btn">
						<IconChevronLeft size={24} />
					</span>
					{getLocalStorage(LOGIN_TOKEN) !== null ? <UserInfo /> : <SignIn />}
				</div>
			</section>
			<Outlet />
		</>
	);
};

export default NavBack;
