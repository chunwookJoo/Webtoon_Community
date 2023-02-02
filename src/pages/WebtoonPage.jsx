import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Loading from "../components/Loading";
import Webtoon from "../components/Webtoon";
import axios from "axios";
import qs from "qs";

import "../assets/scss/pages/webtoonPage.scss";
import { API_URL } from "../config";

const todayNum = new Date().getDay();
const week = ["0", "1", "2", "3", "4", "5", "6"];
const EMPTY = <></>;
const todayWeek = week[todayNum === 0 ? 6 : todayNum - 1];
let part = 2;

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const visibleWebtoonCount = part * 12;
	const query = qs.parse(search, { ignoreQueryPrefix: true });
	const [webtoonList, setWebtoonList] = useState([EMPTY]);

	useEffect(() => {
		part = 2;
		(async () => {
			setWebtoonList([<Loading />]);
			const PLATFORM_URL =
				pathname === "/"
					? "/all"
					: pathname === "/kakaoPage"
					? "/kakao-page"
					: pathname;
			!query.week && (query.week = todayWeek);
			const WEEK_URL =
				query.week === "fin"
					? "/finished"
					: query.week === "new"
					? "/new"
					: "/week?day=" + query.week;

			const { data } = await axios.get(
				API_URL + "/api" + PLATFORM_URL + WEEK_URL,
			);
			const WebtoonList = await data.map((webtoon) => (
				<Webtoon webtoonData={webtoon} />
			));
			setWebtoonList(WebtoonList);
		})();
	}, [query.week, pathname]);

	const [moreRef, isMoreRefShow] = useInView();
	isMoreRefShow && part++;

	const More =
		visibleWebtoonCount < webtoonList.length && 24 < webtoonList.length ? (
			<Loading />
		) : (
			EMPTY
		);
	const VisibleWebtoonList = webtoonList.slice(0, part * 12);
	VisibleWebtoonList.push(More);

	return (
		<main>
			<section className="contents-container"></section>
			<section className="contents-container">
				<ul className="webtoon-list">{VisibleWebtoonList}</ul>
			</section>
		</main>
	);
};

export default WebtoonPage;
