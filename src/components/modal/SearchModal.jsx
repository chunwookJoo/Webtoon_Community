import '../../assets/scss/components/search.scss';

import { Modal } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getSearchWebtoon } from '../../api/webtoon';
import { useFetchWebtoonList } from '../../hooks/apis/useFetchWebtoonList';
import useDebounce from '../../hooks/useDebounce';
import Loading from '../Loading';
import Webtoon from '../Webtoon';
import WebtoonList from '../WebtoonList';

const NO_WEBTOON_FOUND = [
	<li key="nothing-result" className="no-search-result">
		검색 결과가 없습니다.
	</li>,
];

const SearchModal = ({ isOpen, toggle }) => {
	const [moreRef, isMoreRefShow] = useInView();
	const pageRef = useRef(1);
	const [inputValue, setInputValue] = useState('');
	const searchDebounceValue = useDebounce(inputValue, 500);

	const [matchingWebtoonList, setMatchingWebtoonList] = useState([]);
	const {
		data: webtoonSearchListData,
		refetch: webtoonSearchListRefetch,
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
				const data = await getSearchWebtoon(
					searchDebounceValue,
					pageRef.current,
				);
				if (Array.isArray(data)) {
					webtoonSearchListRefetch();
				}
			};
			fetch();
		} else {
			setMatchingWebtoonList([]);
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
					<ul className="matching-webtoon-list">
						{webtoonSearchListData?.length !== 0 &&
							webtoonSearchListData?.pages.map((webtoons) => (
								<>
									{Array.isArray(webtoons) &&
										webtoons?.map((webtoon) => (
											<Webtoon key={webtoon._id} webtoonData={webtoon} />
										))}
								</>
							))}
						{!!searchDebounceValue && <div ref={moreRef}></div>}
					</ul>
				</section>
			</article>
		</Modal>
	);
};

export default SearchModal;
