import '../assets/scss/pages/webtoonPage.scss';

import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import WebtoonList from '../components/WebtoonList';
import { useFetchWebtoonList } from '../hooks/apis/useFetchWebtoonList';
import useFetchNextPage from '../hooks/useFetchNextPage';

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
		isSearch: false,
		pathname,
		query,
		pageRef,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		webtoonListRefetch();
	}, [query.week, pathname]);

	useFetchNextPage(webtoonListData, isMoreRefShow, pageRef, fetchNextPage);

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
