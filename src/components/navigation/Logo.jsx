import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';

const LogoComponent = () => {
	return (
		<div className="logo">
			<Link to="/" role="link" aria-label="home">
				<Logo />
			</Link>
		</div>
	);
};

export default LogoComponent;
