import { Link, useLocation } from 'react-router-dom';

const PlatformLinks = ({ option }) => {
	const { pathname } = useLocation();
	const { icon, name, src, boardSrc } = option;
	return (
		<li>
			{pathname.split('/')[1] === 'board' ? (
				<Link to={boardSrc} className={boardSrc === pathname ? 'active' : ''}>
					<span>{icon}</span>
					<span className="platform-name">{name}</span>
				</Link>
			) : (
				<Link to={src} className={src === pathname ? 'active' : ''}>
					<span>{icon}</span>
					<span className="platform-name">{name}</span>
				</Link>
			)}
		</li>
	);
};

export default PlatformLinks;
