import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import Loading from "../components/Loading";

const WEBTOON_API_URL = "https://korea-webtoon-api.herokuapp.com";
const todayNum = new Date().getDay();
const week = ["0", "1", "2", "3", "4", "5", "6"];
const todayWeek = week[todayNum - 1];

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const query = qs.parse(search, { ignoreQueryPrefix: true });
	const [webtoonList, setWebtoonList] = useState([]);
	console.log(webtoonList);

	useEffect(() => {
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
			const data = await axios.get(WEBTOON_API_URL + PLATFORM_URL + WEEK_URL);
			setWebtoonList(data);
		};
		DataParsing();
	}, [query.week, pathname]);

	return (
		<div>{webtoonList.length === 0 ? <Loading /> : <h2>랜딩페이지</h2>}</div>
	);
};

export default WebtoonPage;
