import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Loading from "../components/Loading";
import Webtoon from "../components/Webtoon";
import axios from "axios";
import qs from "qs";

import "../assets/scss/pages/webtoonPage.scss";

const WEBTOON_API_URL = "https://korea-webtoon-api.herokuapp.com";
const todayNum = new Date().getDay();
const week = ["0", "1", "2", "3", "4", "5", "6"];
const EMPTY = <></>;
const todayWeek = week[todayNum - 1];
let part = 2;

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const visibleWebtoonCount = part * 12;
	const query = qs.parse(search, { ignoreQueryPrefix: true });
	const [webtoonList, setWebtoonList] = useState([]);

	useEffect(() => {
		part = 2;
		const DataParsing = async () => {
			const PLATFORM_URL =
				pathname === "/"
					? "/all"
					: pathname === "/kakaopage"
					? "kakao-page"
					: pathname;
			!query.week && (query.week = todayWeek);
			const WEEK_URL =
				query.week === "fin" ? "/finished" : "/week?day=" + query.week;
			const { data } = await axios.get(
				WEBTOON_API_URL + PLATFORM_URL + WEEK_URL,
			);
			const WebtoonList = data.map((webtoon) => (
				<Webtoon webtoonData={webtoon} />
			));
			setWebtoonList(WebtoonList);
		};
		DataParsing();
	}, [query.week, pathname]);
	const [moreRef, isMoreRefShow] = useInView();
	isMoreRefShow && part++;

	const More =
		visibleWebtoonCount < webtoonList.length && 24 ? (
			<li ref={moreRef}>
				<Loading />
			</li>
		) : (
			EMPTY
		);

	const VisibleWebtoonList = webtoonList.slice(0, part * 12);
	VisibleWebtoonList.push(More);

	return (
		<main>
			<section className="contents-container"></section>
			<section className="contents-container">
				{webtoonList.length === 0 ? (
					<ul className="webtoon-list">
						<Loading />
					</ul>
				) : (
					<ul className="webtoon-list">{VisibleWebtoonList}</ul>
				)}
			</section>
		</main>
	);
};

export default WebtoonPage;
