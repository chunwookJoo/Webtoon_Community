import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Button } from "reactstrap";
import { PlatformLinkOptions } from "./PlatformLinkOptions";
import { Link, useLocation } from "react-router-dom";

const Logo = () => {
	return (
		<div>
			<Link to="/">이거봤어?</Link>
		</div>
	);
};

const PlatformLink = (props) => {
	const option = props.option;
	const { icon, name, src } = option;
	return (
		<li>
			<Link to={src}>
				<p>
					{icon}
					{name}
				</p>
			</Link>
		</li>
	);
};

const PlatformList = (props) => {
	const { SelectedIcon, PlatformLinkOptions } = props;
	const [isPlatformOpen, setIsPlatformOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setIsPlatformOpen(!isPlatformOpen)}>
				{SelectedIcon} 플랫폼
			</Button>
			<Collapse isOpen={isPlatformOpen} className="platform-collapse">
				<ul className="platform-list">
					<PlatformLink option={PlatformLinkOptions.all} />
					<PlatformLink option={PlatformLinkOptions.naver} />
					<PlatformLink option={PlatformLinkOptions.kakao} />
					<PlatformLink option={PlatformLinkOptions.kakaoPage} />
				</ul>
			</Collapse>
		</div>
	);
};

const SearchIcon = () => {
	return (
		<div>
			<FontAwesomeIcon icon={faMagnifyingGlass} />
		</div>
	);
};

const Nav = () => {
	const { pathname, search } = useLocation();
	const platform = Object.hasOwn(PlatformLinkOptions, pathname.split("/")[1]);
	const SelectedIcon = !platform
		? PlatformLinkOptions.all.icon
		: PlatformLinkOptions[pathname.split("/")[1]].icon;

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

	const today = week[todayNum - 1];

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

	return (
		<section>
			<div>
				<Logo />
				<PlatformList
					SelectedIcon={SelectedIcon}
					PlatformLinkOptions={PlatformLinkOptions}
				/>
				<SearchIcon />
			</div>
			<ul>{WeekList}</ul>
		</section>
	);
};

export default Nav;
