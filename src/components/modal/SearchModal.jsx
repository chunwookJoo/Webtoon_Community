import '../../assets/scss/components/search.scss';

import { Modal } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getSearchWebtoon } from '../../api/webtoon';
import Loading from '../Loading';
import Webtoon from '../Webtoon';

const display = (value) => (value ? {} : { display: 'none' });
const NO_WEBTOON_FOUND = [
	<li key="nothing-result" className="no-search-result">
		검색 결과가 없습니다.
	</li>,
];
let part = 2;

const SearchModal = (props) => {
	const modal = props.isOpen;
	const toggle = props.toggle;

	const [inputValue, setInputValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [matchingKeywordShow, setMatchingKeywordShow] = useState(true);
	const visibleWebtoonCount = part * 12;
	const [MatchingKeywordList, setMatchingKeywordList] = useState([]);
	const [MatchingWebtoonList, setMatchingWebtoonList] = useState([]);

	useEffect(() => {
		part = 2;
		!!searchValue
			? (async () => {
					//element 초기화
					setMatchingWebtoonList([<Loading key="loading" />]);
					setMatchingKeywordList([<Loading key="loading" />]);
					const setMatchingWebtoon = (keyword) => {
						setInputValue(keyword);
						setSearchValue(keyword);
						setMatchingKeywordShow(false);
					};

					const response = await getSearchWebtoon(searchValue);
					if (Array.isArray(response)) {
						setMatchingKeywordList(
							response.map((webtoon) => (
								<li key={webtoon._id} className="searched-item-wrap">
									<article className="searched-item">
										<span
											className="searched-title"
											onClick={() => {
												setMatchingWebtoon(webtoon.title);
											}}>
											{webtoon.title}
										</span>
										<span
											className="searched-author"
											onClick={() => {
												setMatchingWebtoon(webtoon.author);
											}}>
											{webtoon.author}
										</span>
									</article>
								</li>
							)),
						);
						setMatchingWebtoonList(
							response.map((webtoon) => (
								<Webtoon key={webtoon._id} webtoonData={webtoon} />
							)),
						);
					} else {
						setMatchingKeywordList(NO_WEBTOON_FOUND);
						setMatchingWebtoonList(NO_WEBTOON_FOUND);
					}
			  })()
			: setMatchingKeywordList([]);
	}, [searchValue]);

	const [moreRef, isMoreRefShow] = useInView();
	isMoreRefShow && part++;
	const More = visibleWebtoonCount < MatchingWebtoonList.length &&
		24 <= MatchingWebtoonList.length && (
			<li key="loading" ref={moreRef} className="loading">
				<Loading />
			</li>
		);
	const VisibleMatchingWebtoonList = MatchingWebtoonList.slice(0, part * 12);
	VisibleMatchingWebtoonList.push(More);

	return (
		<Modal
			title="웹툰 검색"
			size="100%"
			overflow="inside"
			centered
			opened={modal}
			onClose={toggle}
			className="search-modal-container">
			<header className="search-header">
				<input
					className="search-input"
					placeholder="작품 또는 작가를 입력하세요"
					value={inputValue}
					onChange={(e) => {
						setMatchingKeywordShow(true);
						setInputValue(e.target.value);
						const tempKeyword = e.target.value;
						setTimeout(() => {
							const keyword = e.target.value;
							keyword === tempKeyword && setSearchValue(keyword);
						}, 500);
					}}
					onKeyPress={(e) => {
						if (e.key === 'Enter' && !!inputValue) {
							setSearchValue(inputValue);
							setMatchingKeywordShow(false);
						}
					}}
				/>
			</header>
			<article className="search-wrap">
				<section className="search-contents">
					<ul
						className="matching-keyword-list"
						style={display(matchingKeywordShow)}>
						{MatchingKeywordList}
					</ul>
					<ul
						className="matching-webtoon-list"
						style={display(!matchingKeywordShow)}>
						{VisibleMatchingWebtoonList}
					</ul>
				</section>
			</article>
		</Modal>
	);
};

export default SearchModal;
