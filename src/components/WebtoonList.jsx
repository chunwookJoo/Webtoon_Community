import qs from 'qs';
import React, { Suspense, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';

import { useFetchWebtoonList } from '../hooks/apis/useFetchWebtoonList';
import useFetchNextPage from '../hooks/useFetchNextPage';
import { Webtoon } from './ComponentIndex';
import SkeletonLoading from './SkeletonLoading';

const WebtoonList = () => {
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
		<Suspense fallback={<SkeletonLoading />}>
			{webtoonListData?.pages.map((webtoons, index) => (
				<React.Fragment key={index}>
					{Array.isArray(webtoons) &&
						webtoons?.map((webtoon) => (
							<Webtoon key={webtoon._id} webtoonData={webtoon} />
						))}
				</React.Fragment>
			))}
			<li ref={moreRef}></li>
		</Suspense>
	);
};

export default WebtoonList;
