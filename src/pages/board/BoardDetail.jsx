import '../../assets/scss/pages/board/boardDetail.scss';

import { Input } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
	getBoardDetail,
	getCommentList,
	postCreateComment,
} from '../../api/board';
import WebtoonInfoDetail from '../../components/WebtoonInfoDetail';
import { userInfoState } from '../../store/recoilAuthState';
import { boardDataState } from '../../store/recoilBoardState';
import {
	CREATE_COMMENT_SUCCESS,
	EMPTY_COMMENT_WARNING,
} from '../../utils/constants';
import showToast from '../../utils/toast';

const Comments = (props) => {
	const [boardData, setBoardData] = useRecoilState(boardDataState);
	const [commentData, setCommentData] = useState();

	useEffect(() => {
		const fetchCommentList = async () => {
			const response = await getCommentList(boardData._id);
			setCommentData(response);
		};

		fetchCommentList();
	}, [props.commentState]);

	return (
		<div className="comment-lists">
			{commentData?.length === 0 ? (
				<h6 style={{ textAlign: 'center', paddingTop: '2rem' }}>
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
										<span>{item?.createdAt.split('T')[0]}</span>
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
	const userInfo = useRecoilValue(userInfoState);
	const boardData = useRecoilValue(boardDataState);
	const [comment, setComment] = useState('');
	const [commentState, setCommentState] = useState();

	const today = new Date();
	const year = today.getFullYear();
	const month = ('0' + (today.getMonth() + 1)).slice(-2);
	const day = ('0' + today.getDate()).slice(-2);
	const dateString = year + '-' + month + '-' + day;

	const onClickCreateComment = async () => {
		const postCreateCommentAPIBody = {
			board_id: boardData._id,
			comment,
			author: userInfo._id,
			createdAt: dateString,
		};

		if (comment === '') {
			showToast(EMPTY_COMMENT_WARNING, 'yellow');
			commentInput.current.focus();
		} else {
			const response = await postCreateComment(postCreateCommentAPIBody);
			if (response.RESULT === 200) {
				setComment('');
				setCommentState(response);
				showToast(CREATE_COMMENT_SUCCESS, 'green');
			}
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
		const fetchBoardDetail = async () => {
			window.scrollTo(0, 0);
			const response = await getBoardDetail(state);
			setBoardData(response);
		};
		fetchBoardDetail();
	}, []);

	return (
		<div className="board-detail-global">
			{boardData.length === 0 ? (
				''
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
