import {
	IconChevronRight,
	IconLayoutDashboard,
	IconMessageCircle,
} from '@tabler/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TransformPage = () => {
	const { pathname } = useLocation();

	return (
		<Link
			to={pathname.includes('board') ? '/all' : '/board'}
			state={'/board'}
			className="page-select">
			<span>
				{pathname.includes('board') ? (
					<IconLayoutDashboard />
				) : (
					<IconMessageCircle />
				)}
				&nbsp;
				{pathname.includes('board') ? '플랫폼별 웹툰 모음' : '독자 후기 모음'}
			</span>
			<span className="arrow">
				<IconChevronRight />
			</span>
		</Link>
	);
};

export default TransformPage;
