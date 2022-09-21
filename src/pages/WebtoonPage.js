import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import Loading from "../components/Loading";
import Webtoon from "../components/Webtoon";
import axios from "axios";
import qs from "qs";

import "../assets/scss/pages/webtoonPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../config";

const todayNum = new Date().getDay();
const week = ["0", "1", "2", "3", "4", "5", "6"];
const EMPTY = <></>;
const todayWeek = week[todayNum === 0 ? 6 : todayNum - 1];
let part = 2;

// const WeekLink = () => {
// 	let { search, pathname } = useLocation();
// 	const week = ["월", "화", "수", "목", "금", "토", "일"];
// 	const todayNum = new Date().getDay();

// 	const weekDayLinkOptions = week.map((day, weekNum) => ({
// 		name: day,
// 		src: `?week=${weekNum}`,
// 	}));

// 	weekDayLinkOptions.unshift({
// 		name: "신작",
// 		src: "?week=new",
// 	});

// 	weekDayLinkOptions.push({
// 		name: "완결",
// 		src: "?week=fin",
// 	});

// 	const today = week[todayNum === 0 ? 6 : todayNum - 1];

// 	// 요일 nav
// 	const WeekList = weekDayLinkOptions.map((weekItem, index) => {
// 		let active = "";
// 		!search
// 			? weekItem.name === today && (active = "active")
// 			: search === weekItem.src && (active = "active");

// 		return (
// 			<li key={index}>
// 				<Link to={weekItem.src} className={active}>
// 					{weekItem.name}
// 				</Link>
// 			</li>
// 		);
// 	});

// 	return <ul className="week-list-wrap">{WeekList}</ul>;
// };

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const visibleWebtoonCount = part * 12;
	const query = qs.parse(search, { ignoreQueryPrefix: true });
	const [webtoonList, setWebtoonList] = useState([EMPTY]);

	useEffect(() => {
		part = 2;
		const DataParsing = async () => {
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
			const { data } = await axios.get(API_URL + PLATFORM_URL + WEEK_URL);
			const WebtoonList = await data.map((webtoon) => (
				<Webtoon webtoonData={webtoon} />
			));
			setWebtoonList(WebtoonList);
			return;
		};
		DataParsing();
	}, [query.week, pathname]);

	const [moreRef, isMoreRefShow] = useInView();
	isMoreRefShow && part++;

	// console.log(visibleWebtoonCount); // 24, 36, 48 ...

	const More =
		visibleWebtoonCount < webtoonList.length && 24 < webtoonList.length ? (
			<li ref={moreRef} className="loading">
				<FontAwesomeIcon size="xl" icon={faSpinner} spin />
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
				{/* <div>
					<WeekLink />
				</div> */}
				<ul className="webtoon-list">{VisibleWebtoonList}</ul>
			</section>
		</main>
	);
};

export default WebtoonPage;
