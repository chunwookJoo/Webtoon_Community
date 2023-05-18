import '../../assets/scss/components/search.scss';

import { Modal } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getSearchWebtoon } from '../../api/webtoon';
import { useFetchWebtoonList } from '../../hooks/apis/useFetchWebtoonList';
import useDebounce from '../../hooks/useDebounce';
import Webtoon from '../Webtoon';

const SearchModal = ({ isOpen, toggle }) => {
	const [moreRef, isMoreRefShow] = useInView();
	const pageRef = useRef(0);
	const [inputValue, setInputValue] = useState('');
	const [hasSearchResult, setHasSearchResult] = useState(true);
	const searchDebounceValue = useDebounce(inputValue, 500);
	const {
		data: webtoonSearchListData,
		refetch,
		fetchNextPage,
	} = useFetchWebtoonList({
		isSearch: true,
		searchValue: searchDebounceValue,
		pageRef,
	});

	useEffect(() => {
		if (webtoonSearchListData?.pages.statusCode === 404) return;
		if (isMoreRefShow) {
			pageRef.current++;
			fetchNextPage();
		}
	}, [isMoreRefShow]);

	useEffect(() => {
		if (!!searchDebounceValue) {
			const fetch = async () => {
				const data = await getSearchWebtoon(searchDebounceValue, 1);
				refetch();
				if (data.statusCode === 404) {
					setHasSearchResult(false);
					return;
				} else {
					setHasSearchResult(true);
					pageRef.current = 1;
					if (webtoonSearchListData?.pages) {
						webtoonSearchListData.pages = [];
						webtoonSearchListData.pageParams = [];
					}
					return;
				}
			};
			fetch();
		} else if (webtoonSearchListData?.pages) {
			webtoonSearchListData.pages = [];
			webtoonSearchListData.pageParams = [];
		}
	}, [searchDebounceValue]);

	return (
		<Modal
			title="웹툰 검색"
			size="100%"
			overflow="inside"
			centered
			opened={isOpen}
			onClose={toggle}
			className="search-modal-container">
			<header className="search-header">
				<input
					className="search-input"
					placeholder="작품 또는 작가를 입력하세요"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</header>
			<article className="search-wrap">
				<section className="search-contents">
					{hasSearchResult ? (
						<ul className="matching-webtoon-list">
							{webtoonSearchListData?.pages.map((webtoons, index) => (
								<React.Fragment key={index}>
									{Array.isArray(webtoons) &&
										webtoons?.map((webtoon) => (
											<Webtoon key={webtoon._id} webtoonData={webtoon} />
										))}
								</React.Fragment>
							))}
							{!!searchDebounceValue && <div ref={moreRef}></div>}
						</ul>
					) : (
						<div key="nothing-result" className="no-search-result">
							검색 결과가 없습니다.
						</div>
					)}
				</section>
			</article>
		</Modal>
	);
};

export default SearchModal;
