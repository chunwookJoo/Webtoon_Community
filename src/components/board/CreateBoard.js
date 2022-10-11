import React, { useEffect, useState } from "react";
import {
	Modal,
	Avatar,
	Menu,
	Autocomplete,
	Input,
	Textarea,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import { createBoardModalState, userInfoState } from "../../utils/atom";
import axios from "axios";
import { API_URL } from "../../config";
import { useInView } from "react-intersection-observer";
import Loading from "../Loading";
import { showNotification } from "@mantine/notifications";

const CreateBoard = (props) => {
	const modal = props.isOpen;
	const toggle = props.toggle;

	const EMPTY = <></>;
	const NO_WEBTOON_FOUND = [
		<li className="no-search-result">검색 결과가 없습니다.</li>,
	];

	const [inputValue, setInputValue] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [matchingKeywordShow, setMatchingKeywordShow] = useState(true);
	let part = 2;
	const visibleWebtoonCount = part * 12;
	const [MatchingKeywordList, setMatchingKeywordList] = useState([]);
	const [MatchingWebtoonList, setMatchingWebtoonList] = useState([]);

	const [selectWebtoon, setSelectWebtoon] = useState(null);

	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	useEffect(() => {
		!!searchValue
			? (async () => {
					const { data } = await axios.get(
						// `https://korea-webtoon-api.herokuapp.com/search?keyword=${searchValue}`,
						`${API_URL}/search?keyword=${searchValue}`,
					);
					if (Array.isArray(data)) {
						setMatchingKeywordList(
							data.map((webtoon, index) => (
								<li
									key={index}
									className="searched-item-wrap"
									onClick={() => setSelectWebtoon(webtoon)}
								>
									<article className="searched-item">
										<img src={webtoon.img} width={80} height={80} />
										<span className="searched-title">{webtoon.title}</span>
										<small>
											{webtoon.service === "naver"
												? "네이버 웹툰"
												: webtoon.service === "kakao"
												? "카카오 웹툰"
												: "카카오페이지 웹툰"}
										</small>
									</article>
								</li>
							)),
						);
					} else {
						setMatchingKeywordList(NO_WEBTOON_FOUND);
					}
			  })()
			: setMatchingKeywordList([]);
	}, [searchValue]);

	useEffect(() => {
		if (selectWebtoon !== null) setMatchingKeywordList([]);
	}, [selectWebtoon]);

	// 선택된 웹툰 삭제
	const selectWebtoonDelete = () => {
		setSelectWebtoon(null);
	};

	const createBody = {
		title,
		description,
		author: userInfo._id,
		webtoon: selectWebtoon?._id,
		service: selectWebtoon?.service,
	};

	// 후기 등록 버튼 클릭
	const onClickCreateBoard = () => {
		if (title === "" || description === "" || selectWebtoon === null) {
			showNotification({
				message: "모두 입력해주세요.",
				autoClose: 1500,
				radius: "md",
				color: "yellow",
			});
		} else {
			axios.post(API_URL + "/board/create", createBody).then((response) => {
				if (response.data.RESULT === 200) {
					toggle();
					setTitle("");
					setDescription("");
					setSelectWebtoon(null);
					showNotification({
						message: "후기가 정상적으로 작성되었습니다.",
						autoClose: 2000,
						radius: "md",
						color: "green",
					});
				} else {
					console.log(response);
				}
			});
		}
	};

	const [moreRef, isMoreRefShow] = useInView();
	isMoreRefShow && part++;
	const More =
		visibleWebtoonCount < MatchingWebtoonList.length &&
		24 <= MatchingWebtoonList.length ? (
			<li ref={moreRef} className="loading">
				<Loading />
			</li>
		) : (
			EMPTY
		);
	const VisibleMatchingWebtoonList = MatchingWebtoonList.slice(0, part * 12);
	VisibleMatchingWebtoonList.push(More);

	return (
		<Modal
			title="후기 작성"
			fullScreen
			overflow="inside"
			opened={modal}
			onClose={toggle}
			className="create-board-modal-container"
		>
			<div>
				{selectWebtoon === null ? (
					""
				) : (
					<article>
						<img src={selectWebtoon.img} width={80} height={80} />
						<div>
							<span>{selectWebtoon.title}</span>
							<span>{selectWebtoon.author}</span>
						</div>
						<div>
							<small>
								{selectWebtoon.service === "naver"
									? "네이버 웹툰"
									: selectWebtoon.service === "kakao"
									? "카카오 웹툰"
									: "카카오페이지 웹툰"}
							</small>
						</div>
						<div>
							<button onClick={selectWebtoonDelete}>삭제</button>
						</div>
					</article>
				)}
			</div>
			<Input.Wrapper label="웹툰 검색" required>
				<Input
					disabled={selectWebtoon !== null ? true : false}
					placeholder="작품 또는 작가를 입력하세요"
					data={MatchingWebtoonList}
					value={inputValue}
					onChange={(e) => {
						setMatchingKeywordShow(true);
						setInputValue(e.target.value);
						const tempKeyword = e.target.value;
						setTimeout(() => {
							const keyword = e.target.value;
							keyword === tempKeyword && setSearchValue(keyword);
						}, 500);
					}}
				/>
			</Input.Wrapper>
			<ul>{MatchingKeywordList}</ul>
			<Input.Wrapper label="제목" required>
				<Input
					placeholder="후기 제목을 입력해주세요."
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</Input.Wrapper>
			<Input.Wrapper label="내용" required>
				<Textarea
					minRows={8}
					maxRows={12}
					placeholder="후기 내용을 입력해주세요."
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</Input.Wrapper>
			<div className="create-board-btn">
				<button onClick={onClickCreateBoard}>후기 작성</button>
			</div>
		</Modal>
	);
};

export default CreateBoard;
