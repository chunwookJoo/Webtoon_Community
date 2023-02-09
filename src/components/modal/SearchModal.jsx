// npm package
import React, { useState, useEffect } from "react";

// api
import axios from "axios";
import { API_URL } from "../../config";

// design library (mantine)
import { Modal } from "@mantine/core";

// recoil
// components
import Webtoon from "../Webtoon";
import Loading from "../Loading";

// hooks
import { useInView } from "react-intersection-observer";

// icon
import "../../assets/scss/components/search.scss";

const display = (value) => (value ? {} : { display: "none" });
const EMPTY = <></>;
const NO_WEBTOON_FOUND = [
	<li className="no-search-result">검색 결과가 없습니다.</li>,
];
let part = 2;

const SearchModal = (props) => {
	const modal = props.isOpen;
	const toggle = props.toggle;

	const [inputValue, setInputValue] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [matchingKeywordShow, setMatchingKeywordShow] = useState(true);
	const visibleWebtoonCount = part * 12;
	const [MatchingKeywordList, setMatchingKeywordList] = useState([EMPTY]);
	const [MatchingWebtoonList, setMatchingWebtoonList] = useState([EMPTY]);

	useEffect(() => {
		part = 2;
		!!searchValue
			? (async () => {
					//element 초기화
					setMatchingWebtoonList([<Loading />]);
					setMatchingKeywordList([<Loading />]);
					const setMatchingWebtoon = (keyword) => {
						setInputValue(keyword);
						setSearchValue(keyword);
						setMatchingKeywordShow(false);
					};

					const { data } = await axios.get(
						`${API_URL}/search?keyword=${searchValue}`,
					);
					if (Array.isArray(data)) {
						setMatchingKeywordList(
							data.map((webtoon, index) => (
								<li key={index} className="searched-item-wrap">
									<article className="searched-item">
										<span
											className="searched-title"
											onClick={() => {
												setMatchingWebtoon(webtoon.title);
											}}
										>
											{webtoon.title}
										</span>
										<span
											className="searched-author"
											onClick={() => {
												setMatchingWebtoon(webtoon.author);
											}}
										>
											{webtoon.author}
										</span>
									</article>
								</li>
							)),
						);
						setMatchingWebtoonList(
							data.map((webtoon) => <Webtoon webtoonData={webtoon} />),
						);
					} else {
						setMatchingKeywordList(NO_WEBTOON_FOUND);
						setMatchingWebtoonList(NO_WEBTOON_FOUND);
					}
			  })()
			: setMatchingKeywordList([EMPTY]);
	}, [searchValue]);

	const [moreRef, isMoreRefShow] = useInView();
	isMoreRefShow && part++;
	const More =
		visibleWebtoonCount < MatchingWebtoonList.length &&
		24 <= MatchingWebtoonList.length ? (
			<li ref={moreRef} className="loading">
				<Loading />
			</li>
		) : (
			EMPTY
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
			className="search-modal-container"
		>
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
						if (e.key === "Enter" && !!inputValue) {
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
						style={display(matchingKeywordShow)}
					>
						{MatchingKeywordList}
					</ul>
					<ul
						className="matching-webtoon-list"
						style={display(!matchingKeywordShow)}
					>
						{VisibleMatchingWebtoonList}
					</ul>
				</section>
			</article>
		</Modal>
	);
};

export default SearchModal;