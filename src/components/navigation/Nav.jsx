import '../../assets/scss/components/nav.scss';

import { Outlet, useLocation } from 'react-router-dom';

import { LOGIN_TOKEN } from '../../utils/constants.jsx';
import { getLocalStorage } from '../../utils/storage';
import AvatarDropMenu from './AvatarDropMenu';
import LogoComponent from './Logo';
import PlatformSelect from './platformSelect/PlatformSelect';
import SignIn from './SignIn';
import TransformPage from './TransformPage';
import WeekLink from './WeekLink';

const Nav = () => {
	const { pathname } = useLocation();

	return (
		<>
			<section className="nav-section">
				<div className="nav-container">
					<LogoComponent />
					<TransformPage />
					{getLocalStorage(LOGIN_TOKEN) !== null ? (
						<AvatarDropMenu />
					) : (
						<SignIn />
					)}
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
