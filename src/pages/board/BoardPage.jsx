import '../../assets/scss/pages/board/boardPage.scss';

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CreateBoardButton from '../../components/board/CreateBoardButton';
import EmptyData from '../../components/EmptyData';
import Loading from '../../components/Loading';
import useFetchBoardList from '../../hooks/apis/useFetchBoardList';
import { createBoardModalState } from '../../store/recoilModalState';
import { INFORM_LOGIN_WARNING, LOGIN_TOKEN } from '../../utils/constants.jsx';
import { getLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';

const BoardPage = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const createBoardOpen = useRecoilValue(createBoardModalState);

	const {
		data: boardListData,
		refetch: refetchBoardListData,
		isLoading,
		isError,
	} = useFetchBoardList({ pathname });

	useEffect(() => {
		refetchBoardListData();
	}, [createBoardOpen]);

	const onClickBoard = (boardId) => {
		if (getLocalStorage(LOGIN_TOKEN) === null) {
			showToast(INFORM_LOGIN_WARNING, 'yellow');
		} else {
			navigate(`/board/detail/${boardId}`);
		}
	};

	if (isLoading) return <Loading />;
	if (isError) return <></>;

	return (
		<div className="board-container">
			{boardListData && boardListData?.length === 0 ? (
				<EmptyData
					className="empty-board"
					content={
						<>
							<h2>
								{pathname === '/board'
									? '후기가 아직 없어요. 😥'
									: '해당하는 플랫폼의 후기가 아직 없어요. 😥'}
							</h2>
							<h4>기억에 남는 웹툰의 후기를 작성해보세요.</h4>
						</>
					}
				/>
			) : (
				<ul className="board-list">
					{boardListData?.map(
						({ _id, title, author, description, webtoon }) => {
							return (
								<li
									className="board"
									key={_id}
									onClick={() => onClickBoard(_id)}>
									<div className="board-img-container">
										<img src={webtoon.img} className="board-img" />
									</div>
									<div className="board-description">
										<h4>{title}</h4>
										<h5>
											{webtoon.title} | {webtoon.author}
										</h5>
										<div className="creater">
											<span className="board-author-img">
												<img src={author.profileImage} width={28} height={28} />
											</span>
											by
											<span className="nickname">{author.nickname}</span>
										</div>
										<p>{description}</p>
									</div>
								</li>
							);
						},
					)}
				</ul>
			)}
			<CreateBoardButton />
		</div>
	);
};

export default BoardPage;
