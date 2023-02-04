// npm package
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// api
import axios from "axios";
import { API_URL } from "../../config";

// design library (mantine)
import { Input } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

// recoil
import { useRecoilState } from "recoil";
import { boardDataState } from "../../store/recoilBoardState";
import { userInfoState } from "../../store/recoilAuthState";

// components
import WebtoonInfoDetail from "../../components/WebtoonInfoDetail";

// hooks
// ico
import "../../assets/scss/pages/board/boardDetail.scss";

const Comments = (props) => {
	const [boardData, setBoardData] = useRecoilState(boardDataState);
	const [commentData, setCommentData] = useState();

	useEffect(() => {
		axios.get(API_URL + `/comment/${boardData._id}`).then((response) => {
			setCommentData(response.data);
		});
	}, [props.commentState]);

	return (
		<div className="comment-lists">
			{commentData?.length === 0 ? (
				<h6 style={{ textAlign: "center", paddingTop: "2rem" }}>
					아직 댓글이 없습니다. <br />첫 댓글을 작성해보세요.
				</h6>
			) : (
				<>
					{commentData?.map((item, index) => {
						return (
							<div key={index} className="comment">
								<div className="comment-user">
									<span className="comment-img">
										<img
											src={item?.author.profileImage}
											width={24}
											height={24}
										/>
									</span>
									<div className="nickname">
										<h5>{item?.author.nickname}</h5>
										<span>{item?.createdAt.split("T")[0]}</span>
									</div>
								</div>
								<div className="comment-des">{item?.comment}</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

const EditWebtoonComment = () => {
	const commentInput = useRef();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [boardData, setBoardData] = useRecoilState(boardDataState);
	const [comment, setComment] = useState("");
	const [commentState, setCommentState] = useState();

	const today = new Date();
	const year = today.getFullYear();
	const month = ("0" + (today.getMonth() + 1)).slice(-2);
	const day = ("0" + today.getDate()).slice(-2);
	const dateString = year + "-" + month + "-" + day;

	const commentBody = {
		board_id: boardData._id,
		comment,
		author: userInfo._id,
		createdAt: dateString,
	};

	const onClickCreateComment = () => {
		if (comment === "") {
			showNotification({
				message: "댓글을 입력해주세요.",
				autoClose: 1500,
				radius: "md",
				color: "yellow",
			});
			commentInput.current.focus();
		} else {
			axios.post(API_URL + "/comment/insert", commentBody).then((response) => {
				if (response.data.RESULT === 200) {
					setComment("");
					setCommentState(response.data);
					showNotification({
						message: "댓글을 정상적으로 등록했어요.",
						autoClose: 1500,
						radius: "md",
						color: "green",
					});
				}
			});
		}
	};
	return (
		<section className="webtoon-review">
			<div>
				<hr />
			</div>
			<Comments commentState={commentState} />
			<div className="comment-container">
				<span className="comment-img">
					<img src={userInfo.profileImage} width={28} height={28} />
				</span>
				<Input
					ref={commentInput}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className="comment-input"
					placeholder="댓글을 남겨주세요."
					radius="lg"
				/>
				<span className="comment-btn">
					<button onClick={onClickCreateComment}>등록</button>
				</span>
			</div>
		</section>
	);
};

const BoardDetail = () => {
	const { state } = useLocation(); // board_id
	const [boardData, setBoardData] = useRecoilState(boardDataState);
	useEffect(() => {
		window.scrollTo(0, 0);
		axios.get(API_URL + `/api/board/${state}`).then((response) => {
			setBoardData(response.data);
		});
	}, []);

	return (
		<div className="board-detail-global">
			{boardData.length === 0 ? (
				""
			) : (
				<>
					<section className="board-title-container">
						<h1>{boardData.title}</h1>
						<div className="creater">
							<span className="board-author-img">
								<img
									src={boardData.author.profileImage}
									width={30}
									height={30}
								/>
							</span>
							<span className="nickname">{boardData.author.nickname}</span>
						</div>
					</section>
					<section className="webtoon-detail-container">
						<WebtoonInfoDetail webtoon={boardData.webtoon} />
					</section>
					<section className="board-description-container">
						<div>{boardData.description}</div>
					</section>
					<section>
						<EditWebtoonComment />
					</section>
				</>
			)}
		</div>
	);
};

export default BoardDetail;
