import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
const WEBTOON_API_URL = "https://korea-webtoon-api.herokuapp.com";

const WebtoonList = () => {
	let { search, pathname } = useLocation();

	const [webtoonList, setWebtoonList] = useState([]);

	useEffect(() => {
		axios.get(WEBTOON_API_URL).then((response) => {
			console.log(response);
			setWebtoonList(response.data);
		});
	}, []);

	return (
		<div>{webtoonList.length === 0 ? <Loading /> : <h2>랜딩페이지</h2>}</div>
	);
};

export default WebtoonList;
