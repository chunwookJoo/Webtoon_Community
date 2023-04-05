import '../assets/scss/pages/notFound.scss';

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<section className="not-found-section">
			<h2>페이지를 찾을 수 없습니다. 😥</h2>
			<div>
				<Link to="/">
					<button className="mywebtoon-save-btn">홈으로</button>
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
