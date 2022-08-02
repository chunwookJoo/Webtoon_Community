import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Collapse, Button } from "reactstrap";
import { PlatformLinkOptions } from "../components/PlatformLinkOptions";

import Loading from "../components/Loading";
import Webtoon from "../components/Webtoon";
import axios from "axios";
import qs from "qs";

import "../assets/scss/pages/webtoonPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Tooltips from "../utils/Tooltips";
import Search from "../components/Search";

const WEBTOON_API_URL = "https://korea-webtoon-api.herokuapp.com";
const todayNum = new Date().getDay();
const week = ["0", "1", "2", "3", "4", "5", "6"];
const EMPTY = <></>;
const todayWeek = week[todayNum === 0 ? 6 : todayNum - 1];
let part = 2;

const PlatformLink = (props) => {
	const option = props.option;
	const { icon, name, src } = option;
	return (
		<li onClick={() => props.getData(name)}>
			<Link to={src}>
				<span>{icon}</span>
				<p>{name}</p>
			</Link>
		</li>
	);
};

const WeekLink = () => {
	let { search, pathname } = useLocation();
	const week = ["월", "화", "수", "목", "금", "토", "일"];
	const todayNum = new Date().getDay();

	const weekDayLinkOptions = week.map((day, weekNum) => ({
		name: day,
		src: `?week=${weekNum}`,
	}));

	weekDayLinkOptions.unshift({
		name: "신작",
		src: "?week=new",
	});

	weekDayLinkOptions.push({
		name: "완결",
		src: "?week=fin",
	});

	const today = week[todayNum === 0 ? 6 : todayNum - 1];

	// 요일 nav
	const WeekList = weekDayLinkOptions.map((weekItem, index) => {
		let active = "";
		!search
			? weekItem.name === today && (active = "active")
			: search === weekItem.src && (active = "active");

		return (
			<li key={index}>
				<Link to={weekItem.src} className={active}>
					{weekItem.name}
				</Link>
			</li>
		);
	});

	return <ul className="week-list-wrap">{WeekList}</ul>;
};

const WeekPlatformSelectSearch = (props) => {
	let { search, pathname } = useLocation();
	let selected = "";
	switch (pathname.split("/")[1]) {
		case "naver":
			selected = "네이버";
			break;
		case "kakao":
			selected = "카카오";
			break;
		case "kakaoPage":
			selected = "카카오페이지";
			break;
		default:
			selected = "전체";
			break;
	}
	const { SelectedIcon, PlatformLinkOptions } = props;
	const [isPlatformOpen, setIsPlatformOpen] = useState(false);
	const [platformNameSelected, setPlatformNameSelected] = useState(selected);

	const getPlatformName = (name) => {
		setPlatformNameSelected(name);
		setIsPlatformOpen(false);
	};

	// 검색 Tooltip
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

	// 검색 Modal
	const [modal, setModal] = useState(false);
	const modalHandler = () => setModal(!modal);

	return (
		<>
			<div className="platform-select-container">
				<div
					className="platform-select"
					onClick={() => setIsPlatformOpen(!isPlatformOpen)}
				>
					<span>{SelectedIcon}</span>
					<span>{platformNameSelected}</span>
					<span>
						<FontAwesomeIcon icon={faCaretDown} />
					</span>
					<Collapse isOpen={isPlatformOpen} className="platform-collapse">
						<ul className="platform-list">
							<PlatformLink
								option={PlatformLinkOptions.all}
								getData={getPlatformName}
							/>
							<PlatformLink
								option={PlatformLinkOptions.naver}
								getData={getPlatformName}
							/>
							<PlatformLink
								option={PlatformLinkOptions.kakao}
								getData={getPlatformName}
							/>
							<PlatformLink
								option={PlatformLinkOptions.kakaoPage}
								getData={getPlatformName}
							/>
						</ul>
					</Collapse>
				</div>
				<div className="search">
					<span id="searchTooltip" onClick={modalHandler}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</span>
					<Tooltips
						isOpen={tooltipOpen}
						toggle={tooltipToggle}
						target="searchTooltip"
						text="웹툰 검색"
					/>
				</div>
				<Search isOpen={modal} toggle={modalHandler} />
			</div>
			<div>
				<WeekLink />
			</div>
		</>
	);
};

const WebtoonPage = () => {
	let { search, pathname } = useLocation();
	const visibleWebtoonCount = part * 12;
	const query = qs.parse(search, { ignoreQueryPrefix: true });
	const [webtoonList, setWebtoonList] = useState([]);
	const platform = Object.hasOwn(PlatformLinkOptions, pathname.split("/")[1]);
	const SelectedIcon = !platform
		? PlatformLinkOptions.all.icon
		: PlatformLinkOptions[pathname.split("/")[1]].icon;

	useEffect(() => {
		part = 2;
		const DataParsing = async () => {
			const PLATFORM_URL =
				pathname === "/"
					? "/all"
					: pathname === "/kakaoPage"
					? "/kakao-page"
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
				<WeekPlatformSelectSearch
					SelectedIcon={SelectedIcon}
					PlatformLinkOptions={PlatformLinkOptions}
				/>
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
