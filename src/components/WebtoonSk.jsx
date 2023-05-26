import '../assets/scss/components/webtoon.scss';

import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { ReactComponent as Kakao } from '../assets/img/kakao.svg';
import { ReactComponent as KakaoPage } from '../assets/img/kakaopage.svg';
import { ReactComponent as Naver } from '../assets/img/naver.svg';
import { useFetchWebtoonList } from '../hooks/apis/useFetchWebtoonList';
import useFetchNextPage from '../hooks/useFetchNextPage';
import { searchModalState } from '../store/recoilModalState';
import { Webtoon } from './ComponentIndex';
import SkeletonLoading from './SkeletonLoading';

const WebtoonSk = ({ isMoreRefShow }) => {
	let { search, pathname } = useLocation();
	const setModalOpen = useSetRecoilState(searchModalState);

	let pageRef = useRef(1);
	const query = qs.parse(search, { ignoreQueryPrefix: true });

	const {
		data: webtoonListData,
		refetch: webtoonListRefetch,
		fetchNextPage,
		isLoading,
	} = useFetchWebtoonList({
		isSearch: false,
		pathname,
		query,
		pageRef,
	});
	if (isLoading) return <SkeletonLoading />;

	console.log(webtoonListData);

	useEffect(() => {
		window.scrollTo(0, 0);
		webtoonListRefetch();
	}, [query.week, pathname]);

	useFetchNextPage(webtoonListData, isMoreRefShow, pageRef, fetchNextPage);
	// return <>{!webtoonListData ? <div>렌더링됨</div> : <SkeletonLoading />}</>;
	return (
		<>
			{!isLoading &&
				webtoonListData?.pages.map((webtoons, index) => (
					<React.Fragment key={index}>
						{Array.isArray(webtoons) &&
							webtoons?.map((webtoon) => (
								<Webtoon key={webtoon._id} webtoonData={webtoon} />
							))}
					</React.Fragment>
				))}
		</>
	);
};

export default WebtoonSk;
