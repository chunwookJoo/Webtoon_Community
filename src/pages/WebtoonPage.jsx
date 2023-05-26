import '../assets/scss/pages/webtoonPage.scss';

import React, { Suspense } from 'react';

const WebtoonList = React.lazy(() => import('../components/WebtoonList'));

const WebtoonPage = () => {
	return (
		<main>
			<section className="contents-container">
				<ul className="webtoon-list">
					<Suspense>
						<WebtoonList />
					</Suspense>
				</ul>
			</section>
		</main>
	);
};

export default WebtoonPage;
