// npm package
import React from "react";
import { useLocation } from "react-router-dom";

// api
import axios from "axios";
import { API_URL } from "../config";

// design library (mantine)
import { showNotification } from "@mantine/notifications";

// components
import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import WebtoonInfoDetail from "../components/WebtoonInfoDetail";

// icon
import "../assets/scss/pages/webtoonDetail.scss";

const WebtoonDetail = () => {
	const { state } = useLocation();
	const webtoonData = state.webtoonDetailData;

	const myWebtoonInsertBody = {
		_id: webtoonData._id,
	};

	const onClickMyWebtoonInsert = () => {
		if (localStorage.getItem("userId") === null) {
			showNotification({
				message: "로그인을 먼저 해주세요.",
				autoClose: 1500,
				radius: "md",
				color: "yellow",
			});
			return;
		} else {
			axios
				.post(
					API_URL + `/auth/insert/mywebtoon/${localStorage.getItem("userId")}`,
					myWebtoonInsertBody,
				)
				.then((response) => {
					if (response.data.RESULT === 200) {
						showNotification({
							message: "마이웹툰에 저장했습니다.",
							autoClose: 2000,
							radius: "md",
							color: "green",
						});
					} else if (response.data.RESULT === 403) {
						showNotification({
							message: "마이웹툰에 이미 존재합니다.",
							autoClose: 2000,
							radius: "md",
							color: "yellow",
						});
					} else {
						showNotification({
							message: "마이웹툰 저장에 실패했습니다.",
							autoClose: 2000,
							radius: "md",
							color: "red",
						});
					}
				});
		}
	};

	return (
		<div>
			<section className="webtoon-detail-container">
				<WebtoonInfoDetail webtoon={webtoonData} />
				<div className="webtoon-detail-btns">
					<a className="mywebtoon-save-btn" onClick={onClickMyWebtoonInsert}>
						<button>마이웹툰에 저장</button>
					</a>
					<a
						href={webtoonData.url}
						target="_blank"
						className="webtoon-show-btn"
						rel="noreferrer"
					>
						<button className={`${webtoonData.service}`}>
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
						</button>
					</a>
				</div>
			</section>
		</div>
	);
};

export default WebtoonDetail;
