import '../../assets/scss/components/board/createBoard.scss';

import { Input, Modal, Textarea } from '@mantine/core';
import { IconCircleX } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import { postCreateBoard } from '../../api/board';
import { getSearchWebtoon } from '../../api/webtoon';
import { userInfoState } from '../../store/recoilAuthState';
import {
	CREATE_BOARD_SUCCESS,
	EMPTY_INPUT_WARNING,
} from '../../utils/constants';
import showToast from '../../utils/toast';
import Loading from '../Loading';

const CreateBoardModal = (props) => {
	const modal = props.isOpen;
	const toggle = props.toggle;

	const EMPTY = <></>;
	const NO_WEBTOON_FOUND = [
		<li key="nothing-result" className="no-search-result">
			검색 결과가 없습니다. 😥
		</li>,
	];

	const [inputValue, setInputValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [matchingKeywordShow, setMatchingKeywordShow] = useState(true);
	let part = 2;
	const visibleWebtoonCount = part * 12;
	const [MatchingKeywordList, setMatchingKeywordList] = useState([]);
	const [MatchingWebtoonList, setMatchingWebtoonList] = useState([]);

	const [selectWebtoon, setSelectWebtoon] = useState(null);

	const userInfo = useRecoilValue(userInfoState);

	useEffect(() => {
		!!searchValue
			? (async () => {
					const response = await getSearchWebtoon(searchValue);
					if (Array.isArray(response)) {
						setMatchingKeywordList(
							response.map((webtoon, index) => (
								<li
									key={webtoon._id}
									className="searched-item-wrap"
									onClick={() => setSelectWebtoon(webtoon)}>
									<article className="searched-item">
										<img src={webtoon.img} width={80} height={80} />
										<span className="searched-title">{webtoon.title}</span>
										<small>
											{webtoon.service === 'naver'
												? '네이버'
												: webtoon.service === 'kakao'
												? '카카오'
												: '카카오페이지'}
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

	const onClickCreateBoard = async () => {
		const postCreateBoardAPIBody = {
			title,
			description,
			author: userInfo._id,
			webtoon: selectWebtoon?._id,
			service: selectWebtoon?.service,
		};

		if (title === '' || description === '' || selectWebtoon === null) {
			showToast(EMPTY_INPUT_WARNING, 'yellow');
		} else {
			const response = await postCreateBoard(postCreateBoardAPIBody);
			if (response.RESULT === 200) {
				toggle();
				setTitle('');
				setDescription('');
				setSelectWebtoon(null);
				showToast(CREATE_BOARD_SUCCESS, 'green');
			}
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
			className="create-board-modal-container">
			<div className="create-board-input">
				{selectWebtoon === null ? (
					''
				) : (
					<article className="selected-item">
						<div className="selected-img">
							<img src={selectWebtoon.img} width={100} height={100} />
							<span className="deleted-img" onClick={selectWebtoonDelete}>
								<IconCircleX />
							</span>
						</div>
						<span className="searched-title">{selectWebtoon.title}</span>
						<small>
							{selectWebtoon.service === 'naver'
								? '네이버'
								: selectWebtoon.service === 'kakao'
								? '카카오'
								: '카카오페이지'}
						</small>
					</article>
				)}
			</div>
			<div className="create-board-input">
				<Input.Wrapper label="웹툰 검색" required>
					<Input
						disabled={selectWebtoon !== null ? true : false}
						placeholder="작품 또는 작가로 검색한 후 선택하세요."
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
			</div>
			<ul className="search-result">{MatchingKeywordList}</ul>
			<div className="create-board-input">
				<Input.Wrapper label="제목" required>
					<Input
						placeholder="후기 제목을 입력해주세요."
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</Input.Wrapper>
			</div>
			<div className="create-board-input">
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
			</div>
			<div className="create-board-btn">
				<button onClick={onClickCreateBoard}>후기 작성</button>
			</div>
		</Modal>
	);
};

export default CreateBoardModal;
