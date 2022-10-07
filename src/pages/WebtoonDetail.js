import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import "../assets/scss/pages/webtoonDetail.scss";
import axios from "axios";
import { API_URL } from "../config";
import { showNotification } from "@mantine/notifications";
import { Avatar, Input } from "@mantine/core";
import { useRecoilState } from "recoil";
import { userInfoState } from "../utils/atom";
import { IconAt } from "@tabler/icons";

const Comments = () => {
	// 임시
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	return (
		<div className="comment-lists">
			<div className="comment-user">
				<span className="comment-img">
					<img src={userInfo.profileImage} width={24} height={24} />
				</span>
				<div className="nickname">
					<h5>닉네임</h5>
					<span>2022.10.01</span>
				</div>
			</div>
			<div className="comment-des">이 웹툰 정말 재밌다!</div>
		</div>
	);
};
const WebtoonComment = () => {
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	return (
		<section className="webtoon-review">
			<div>
				<hr />
			</div>
			<Comments />
			<div className="comment-container">
				<span className="comment-img">
					<img src={userInfo.profileImage} width={28} height={28} />
				</span>
				<Input
					className="comment-input"
					placeholder="댓글을 남겨주세요."
					radius="lg"
				/>
				<span className="comment-btn">
					<button>등록</button>
				</span>
			</div>
		</section>
	);
};

const WebtoonDetail = () => {
	const { state } = useLocation();
	const webtoonData = state.webtoonDetailData;
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

	const myWebtoonInsertBody = {
		_id: webtoonData._id,
	};

	const onClickMyWebtoonInsert = () => {
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
	};

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
					<button
						className="mywebtoon-save-btn"
						onClick={onClickMyWebtoonInsert}
					>
						마이웹툰에 저장
					</button>
					<a
						href={webtoonData.url}
						target="_blank"
						className="webtoon-show-btn"
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
			<WebtoonComment />
		</div>
	);
};

export default WebtoonDetail;
