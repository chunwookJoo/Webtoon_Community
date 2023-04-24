import '../assets/scss/pages/webtoonPage.scss';

import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import Webtoon from '../components/Webtoon';
import WebtoonList from '../components/WebtoonList';
import { useFetchWebtoonList } from '../hooks/apis/useFetchWebtoonList';

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const [moreRef, isMoreRefShow] = useInView();

	let pageRef = useRef(1);
	const query = qs.parse(search, { ignoreQueryPrefix: true });
	const {
		data: webtoonListData,
		refetch: webtoonListRefetch,
		fetchNextPage,
	} = useFetchWebtoonList({
		pathname,
		query,
		pageRef,
	});

	// 요일, 플랫폼 변경 감지
	useEffect(() => {
		window.scrollTo(0, 0);
		webtoonListRefetch();
	}, [query.week, pathname]);

	// 스크롤 위치 감지
	useEffect(() => {
		if (isMoreRefShow) {
			pageRef.current++;
			fetchNextPage();
		}
	}, [isMoreRefShow]);

	return (
		<main>
			<section className="contents-container">
				<ul className="webtoon-list">
					{webtoonListData?.pages.map((webtoons, index) => (
						<WebtoonList webtoons={webtoons} key={index} />
					))}
				</ul>
				{webtoonListData && <div ref={moreRef}></div>}
			</section>
		</main>
	);
};

export default WebtoonPage;
