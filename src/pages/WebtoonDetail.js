import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import "../assets/scss/pages/webtoonDetail.scss";

const WebtoonDetail = () => {
	const { state } = useLocation();
	const webtoonData = state.webtoonDetailData;
	console.log(webtoonData);
	const platform =
		webtoonData.service === "naver"
			? "네이버 웹툰"
			: webtoonData.service === "kakao"
			? "카카오 웹툰"
			: "카카오페이지 웹툰";

	const week = [
		"월요일",
		"화요일",
		"수요일",
		"목요일",
		"금요일",
		"토요일",
		"일요일",
		"완결",
		"신작",
	];

	return (
		<div>
			<section className="webtoon-detail-container">
				<div className="webtoon-img">
					<img src={webtoonData.img} />
				</div>
				<div className="webtoon-title">
					<h3>{webtoonData.title}</h3>
					<h5>
						{webtoonData.author} | {platform}
					</h5>
				</div>
				<div className="webtoon-week">
					<ul>
						{webtoonData.week.map((item, index) => {
							return <li>{week[item]}</li>;
						})}
					</ul>
				</div>
				<div className="webtoon-detail-btns">
					<button className="mywebtoon-save-btn">마이웹툰에 저장</button>
					<button className={`${webtoonData.service}`}>
						<a href={webtoonData.url} target="_blank">
							<span className="logo">
								{webtoonData.service === "naver" ? (
									<Naver />
								) : webtoonData.service === "kakao" ? (
									<Kakao />
								) : (
									<KakaoPage />
								)}
							</span>
							&nbsp; 웹툰 보러가기
						</a>
					</button>
				</div>
			</section>
			<section className="webtoon-review">
				<div>댓글</div>
			</section>
		</div>
	);
};

export default WebtoonDetail;
