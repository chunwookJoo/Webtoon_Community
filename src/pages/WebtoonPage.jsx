import '../assets/scss/pages/webtoonPage.scss';

import qs from 'qs';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import { getWebtoonList } from '../api/webtoon';
import Loading from '../components/Loading';
import Webtoon from '../components/Webtoon';

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const [webtoonList, setWebtoonList] = useState([]);
	const [moreRef, isMoreRefShow] = useInView();

	let page = useRef(1);

	let didMount = useRef(false);
	const query = qs.parse(search, { ignoreQueryPrefix: true });

	const fetchWebtoonList = async () => {
		if (isMoreRefShow) page.current += 1;
		const data = await getWebtoonList(pathname, query, page.current);
		const WebtoonList = await data.map((webtoon) => (
			<Webtoon key={webtoon._id} webtoonData={webtoon} />
		));
		setWebtoonList((prev) => [...prev, WebtoonList]);
		didMount.current = true;
	};

	// 요일, 플랫폼 변경 감지
	useEffect(() => {
		(async () => {
			page.current = 1;
			setWebtoonList([]);
			window.scrollTo(0, 0);
			fetchWebtoonList();
		})();
	}, [query.week, pathname]);

	// 스크롤 위치 감지
	useEffect(() => {
		if (isMoreRefShow && didMount.current) {
			fetchWebtoonList();
		}
	}, [isMoreRefShow]);

	return (
		<main>
			<section className="contents-container"></section>
			<section className="contents-container">
				<ul className="webtoon-list">{webtoonList}</ul>
				<div ref={moreRef}></div>

				{webtoonList.length === 0 && (
					<div className="loading">
						<Loading />
					</div>
				)}
			</section>
		</main>
	);
};

export default WebtoonPage;
