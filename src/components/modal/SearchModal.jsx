import '../../assets/scss/components/search.scss';

import { Modal } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import useFetchSearchWebtoon from '../../hooks/apis/useFetchSearchWebtoon';
import { useFetchWebtoonList } from '../../hooks/apis/useFetchWebtoonList';
import useDebounce from '../../hooks/useDebounce';
import useFetchNextPage from '../../hooks/useFetchNextPage';
import { Webtoon } from '../ComponentIndex';
import EmptyData from '../EmptyData';

const SearchModal = ({ isOpen, toggle }) => {
	const [moreRef, isMoreRefShow] = useInView();
	const pageRef = useRef(0);
	const [inputValue, setInputValue] = useState('');
	const [hasSearchResult, setHasSearchResult] = useState(true);
	const searchDebounceValue = useDebounce(inputValue, 500);
	const {
		data: webtoonSearchListData,
		refetch: refetchWebtoonSearch,
		fetchNextPage,
	} = useFetchWebtoonList({
		isSearch: true,
		searchValue: searchDebounceValue,
		pageRef,
	});

	useFetchNextPage(
		webtoonSearchListData,
		isMoreRefShow,
		pageRef,
		fetchNextPage,
	);

	useFetchSearchWebtoon(
		searchDebounceValue,
		refetchWebtoonSearch,
		setHasSearchResult,
		pageRef,
		webtoonSearchListData,
	);

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
						<EmptyData
							className="no-search-result"
							content="검색 결과가 없습니다. 😥"
						/>
					)}
				</section>
			</article>
		</Modal>
	);
};

export default SearchModal;
