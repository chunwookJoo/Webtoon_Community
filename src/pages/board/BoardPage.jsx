import '../../assets/scss/pages/board/boardPage.scss';

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getBoardList, getCommentList } from '../../api/board';
import CreateBoardButton from '../../components/board/CreateBoardButton';
import EmptyData from '../../components/EmptyData';
import { boardDataState, boardListState } from '../../store/recoilBoardState';
import { createBoardModalState } from '../../store/recoilModalState';
import { INFORM_LOGIN_WARNING, LOGIN_TOKEN } from '../../utils/constants.jsx';
import { getLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';

const BoardPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [boardList, setBoardList] = useRecoilState(boardListState);
	const setBoardData = useSetRecoilState(boardDataState);

	const createBoardOpen = useRecoilValue(createBoardModalState);

	useEffect(() => {
		const fetchBoardList = async () => {
			if (state) {
				const response = await getBoardList(state);
				setBoardList(response);
			}
		};
		fetchBoardList();
	}, [state, createBoardOpen]);

	const onClickBoard = (e, item) => {
		if (getLocalStorage(LOGIN_TOKEN) === null) {
			showToast(INFORM_LOGIN_WARNING, 'yellow');
		} else {
			setBoardData(item);
			navigate(`/board/detail`, { state: item._id });
		}
	};

	return (
		<div className="board-container">
			{boardList?.length === 0 ? (
				<EmptyData
					className="empty-board"
					content={
						<>
							<h2>
								{state === '/board'
									? '후기가 아직 없어요. 😥'
									: '해당하는 플랫폼의 후기가 아직 없어요. 😥'}
							</h2>
							<h4>기억에 남는 웹툰의 후기를 작성해보세요.</h4>
						</>
					}
				/>
			) : (
				<ul className="board-list">
					{boardList?.map((item, index) => {
						return (
							<li
								className="board"
								key={index}
								onClick={(e) => onClickBoard(e, item)}>
								<div className="board-img-container">
									<img src={item.webtoon.img} className="board-img" />
								</div>
								<div className="board-description">
									<h4>{item.title}</h4>
									<h5>
										{item.webtoon.title} | {item.webtoon.author}
									</h5>
									<div className="creater">
										<span className="board-author-img">
											<img
												src={item.author.profileImage}
												width={28}
												height={28}
											/>
										</span>
										by
										<span className="nickname">{item.author.nickname}</span>
									</div>
									<p>{item.description}</p>
								</div>
							</li>
						);
					})}
				</ul>
			)}
			<CreateBoardButton />
		</div>
	);
};

export default BoardPage;
