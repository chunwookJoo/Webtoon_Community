import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardListState } from "../../utils/atom";
import axios from "axios";
import { API_URL } from "../../config";
import "../../assets/scss/pages/board/boardPage.scss";

const BoardPage = () => {
	const navigate = useNavigate();
	// const [boardList, setBoardList] = useState();
	const [boardList, setBoardList] = useRecoilState(boardListState);

	useEffect(() => {
		axios.get(API_URL + "/board").then((response) => {
			setBoardList(response.data);
		});
	}, []);

	const onClickBoard = (e, item) => {
		navigate("/board/detail", { state: item });
	};

	return (
		<div className="board-container">
			<ul className="board-list">
				{boardList?.map((item, index) => {
					return (
						<li
							className="board"
							key={index}
							onClick={(e) => onClickBoard(e, item)}
						>
							<div>
								<img src={item.webtoon.img} className="board-img" />
							</div>
							<div className="board-description">
								<h3>{item.title}</h3>
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
		</div>
	);
};

export default BoardPage;
