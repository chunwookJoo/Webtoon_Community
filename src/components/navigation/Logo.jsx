import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';

const LogoComponent = () => {
	return (
		<div className="logo">
			<Link to="/" onClick={() => (window.location.href = '/')}>
				<Logo />
			</Link>
		</div>
	);
};

export default LogoComponent;
