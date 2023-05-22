import '../../assets/scss/pages/board/boardDetail.scss';

import { Input } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
	getBoardDetail,
	getCommentList,
	postCreateComment,
} from '../../api/board';
import EmptyData from '../../components/EmptyData';
import Loading from '../../components/Loading';
import WebtoonInfoDetail from '../../components/WebtoonInfoDetail';
import useFetchUserInfo from '../../hooks/apis/useFetchUserInfo';
import { commentState } from '../../store/recoilBoardState';
import { CREATE_COMMENT_SUCCESS } from '../../utils/constants.jsx';
import showToast from '../../utils/toast';

const Comments = ({ boardDetailData }) => {
	const state = useRecoilValue(commentState);
	const { data: commentData, refetch: refetchCommentData } = useQuery(
		['commentList'],
		() => getCommentList(boardDetailData._id),
	);

	useEffect(() => {
		refetchCommentData();
	}, [state]);

	return (
		<div className="comment-lists">
			{commentData && commentData.length === 0 ? (
				<EmptyData
					className="no-comment"
					content="아직 댓글이 없습니다. 첫 댓글을 작성해보세요!"
				/>
			) : (
				<>
					{commentData?.map(({ _id, author, createdAt, comment }) => {
						return (
							<div key={_id} className="comment">
								<div className="comment-user">
									<span className="comment-img">
										<img src={author.profileImage} width={24} height={24} />
									</span>
									<div className="nickname">
										<h5>{author.nickname}</h5>
										<span>{createdAt.split('T')[0]}</span>
									</div>
								</div>
								<div className="comment-des">{comment}</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

const EditWebtoonComment = ({ userInformation, boardDetailData }) => {
	const [comment, setComment] = useState('');
	const setCommentState = useSetRecoilState(commentState);

	const today = new Date();
	const year = today.getFullYear();
	const month = ('0' + (today.getMonth() + 1)).slice(-2);
	const day = ('0' + today.getDate()).slice(-2);
	const dateString = year + '-' + month + '-' + day;

	const onClickCreateComment = async () => {
		const postCreateCommentAPIBody = {
			board_id: boardDetailData._id,
			comment: comment.trim(),
			author: userInformation._id,
			createdAt: dateString,
		};

		const response = await postCreateComment(postCreateCommentAPIBody);
		if (response.RESULT === 200) {
			setComment('');
			setCommentState(response);
			showToast(CREATE_COMMENT_SUCCESS, 'green');
		}
	};
	return (
		<section className="webtoon-review">
			<div>
				<hr />
			</div>
			<Comments boardDetailData={boardDetailData} />
			<div className="comment-container">
				<span className="comment-img">
					<img src={userInformation.profileImage} width={28} height={28} />
				</span>
				<Input
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className="comment-input"
					placeholder="댓글을 남겨주세요."
					radius="lg"
				/>
				<span className="comment-btn">
					<button
						onClick={onClickCreateComment}
						disabled={comment.trim('') === ''}>
						등록
					</button>
				</span>
			</div>
		</section>
	);
};

const BoardDetail = () => {
	const { pathname } = useLocation();
	const boardId = pathname.split('/')[3];

	const { data: userInformation } = useFetchUserInfo();
	const {
		data: boardDetailData,
		isLoading,
		isError,
	} = useQuery([pathname], () => getBoardDetail(boardId));

	if (isLoading) return <Loading />;
	if (isError) return <></>;

	return (
		<div className="board-detail-global">
			{boardDetailData && (
				<>
					<section className="board-title-container">
						<h1>{boardDetailData.title}</h1>
						<div className="creater">
							<span className="board-author-img">
								<img
									src={boardDetailData.author.profileImage}
									width={30}
									height={30}
								/>
							</span>
							<span className="nickname">
								{boardDetailData.author.nickname}
							</span>
						</div>
					</section>
					<section className="webtoon-detail-container">
						<WebtoonInfoDetail webtoon={boardDetailData.webtoon} />
					</section>
					<section className="board-description-container">
						<div>{boardDetailData.description}</div>
					</section>
					<section>
						<EditWebtoonComment
							userInformation={userInformation && userInformation}
							boardDetailData={boardDetailData && boardDetailData}
						/>
					</section>
				</>
			)}
		</div>
	);
};

export default BoardDetail;
