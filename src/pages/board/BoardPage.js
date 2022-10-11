import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
	boardListState,
	createBoardModalState,
	jwtTokenState,
} from "../../utils/atom";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/scss/pages/board/boardPage.scss";
import { showNotification } from "@mantine/notifications";
import CreateBoardButton from "../../components/board/CreateBoardButton";

const BoardPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [boardList, setBoardList] = useRecoilState(boardListState);
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
	const [createBoardOpen, setCreateBoardOpen] = useRecoilState(
		createBoardModalState,
	);

	useEffect(() => {
		axios
			.get(API_URL + (state === null ? "/board" : state))
			.then((response) => {
				setBoardList(response.data);
			});
	}, [state, createBoardOpen]);

	const onClickBoard = (e, item) => {
		if (jwtToken === null) {
			showNotification({
				message: "로그인을 먼저 해주세요.",
				autoClose: 1500,
				radius: "md",
				color: "yellow",
			});
		} else {
			navigate("/board/detail", { state: item });
		}
	};

	return (
		<div className="board-container">
			{boardList?.length === 0 ? (
				<div className="empty-board">
					<h2>
						{state === "/board"
							? "후기가 아직 없어요 😥"
							: "해당하는 플랫폼의 후기가 아직 없어요 😥"}
					</h2>
					<h4>기억에 남는 웹툰의 후기를 작성해보세요.</h4>
				</div>
			) : (
				<ul className="board-list">
					{boardList?.map((item, index) => {
						return (
							<li
								className="board"
								key={index}
								onClick={(e) => onClickBoard(e, item)}
							>
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
