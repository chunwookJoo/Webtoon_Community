import React from "react";
import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import { Link } from "react-router-dom";

const PlatformLogo = (props) => {
	const { platform } = props;
	return platform === "naver" ? (
		<Naver />
	) : platform === "kakao" ? (
		<Kakao />
	) : (
		<KakaoPage />
	);
};

const Badge = (txt, className) => (
	<div className={className}>
		<span>{txt}</span>
	</div>
);

const BadgeList = (props) => {
	console.log(props);
	let badges = [];
	const { additional } = props;
	additional.new && badges.push(Badge("신규", "new"));
	additional.rest && badges.push(Badge("휴재", "rest"));
	additional.up && badges.push(Badge("UP", "up"));
	additional.adult && badges.push(Badge("19", "adult"));
	return <div className="additional">{badges}</div>;
};

const Webtoon = (props) => {
	console.log(props);
	const { webtoonData } = props;
	return (
		<li>
			<Link>
				<PlatformLogo platform={webtoonData.service} />
				<BadgeList additional={webtoonData.additional} />
				<div className="thumbnail-wrap">
					<img src={webtoonData.img} className="thumbnail" />
				</div>
				<p className="title">{webtoonData.title}</p>
			</Link>
		</li>
	);
};

export default Webtoon;
