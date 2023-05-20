import '../../assets/scss/components/board/createBoard.scss';

import { Input, Modal, Textarea } from '@mantine/core';
import { IconCircleX } from '@tabler/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue } from 'recoil';

import { postCreateBoard } from '../../api/board';
import { getSearchWebtoon } from '../../api/webtoon';
import useFetchSearchWebtoon from '../../hooks/apis/useFetchSearchWebtoon';
import { useFetchWebtoonList } from '../../hooks/apis/useFetchWebtoonList';
import useDebounce from '../../hooks/useDebounce';
import useFetchNextPage from '../../hooks/useFetchNextPage';
import { userInfoState } from '../../store/recoilAuthState';
import {
	CREATE_BOARD_SUCCESS,
	EMPTY_INPUT_WARNING,
} from '../../utils/constants.jsx';
import showToast from '../../utils/toast';
import { Webtoon } from '../ComponentIndex';
import EmptyData from '../EmptyData';

const WebtoonItem = ({
	articleClassName,
	titleClassName,
	webtoonItemImg,
	webtoon,
}) => {
	return (
		<article className={articleClassName}>
			{webtoonItemImg}
			<span className={titleClassName}>{webtoon.title}</span>
			<small>
				{webtoon.service === 'naver'
					? '네이버'
					: webtoon.service === 'kakao'
					? '카카오'
					: '카카오페이지'}
			</small>
		</article>
	);
};

const CreateBoardModal = ({ isOpen, toggle }) => {
	const [moreRef, isMoreRefShow] = useInView();
	const pageRef = useRef(0);
	const [inputValue, setInputValue] = useState('');
	const [hasSearchResult, setHasSearchResult] = useState(true);
	const searchDebounceValue = useDebounce(inputValue, 500);
	const {
		data: webtoonSearchListData,
		refetch: refetchWebtoonSearch,
		fetchNextPage,
	} = useFetchWebtoonList({
		isSearch: true,
		searchValue: searchDebounceValue,
		pageRef,
	});

	useFetchNextPage(
		webtoonSearchListData,
		isMoreRefShow,
		pageRef,
		fetchNextPage,
	);

	useFetchSearchWebtoon(
		searchDebounceValue,
		refetchWebtoonSearch,
		setHasSearchResult,
		pageRef,
		webtoonSearchListData,
	);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [selectWebtoon, setSelectWebtoon] = useState(null);
	const userInfo = useRecoilValue(userInfoState);

	useEffect(() => {
		if (selectWebtoon !== null) return setDisabled(true);
	}, [selectWebtoon]);

	const selectWebtoonDelete = () => {
		setSelectWebtoon(null);
		setDisabled(false);
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

	return (
		<Modal
			title="후기 작성"
			fullScreen
			overflow="inside"
			opened={isOpen}
			onClose={toggle}
			className="create-board-modal-container">
			<div className="create-board-input">
				{selectWebtoon !== null && (
					<WebtoonItem
						articleClassName="selected-item"
						titleClassName="searched-title"
						webtoon={selectWebtoon}
						webtoonItemImg={
							<div className="selected-img">
								<img src={selectWebtoon.img} width={100} height={100} />
								<span className="deleted-img" onClick={selectWebtoonDelete}>
									<IconCircleX />
								</span>
							</div>
						}
					/>
				)}
			</div>
			<div className="create-board-input">
				<Input.Wrapper label="웹툰 검색" required>
					<Input
						disabled={selectWebtoon !== null}
						placeholder="작품 또는 작가로 검색한 후 선택하세요."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</Input.Wrapper>
			</div>
			{!disabled && (
				<ul className="search-result">
					{hasSearchResult ? (
						<>
							{webtoonSearchListData?.pages.map((webtoons, index) => (
								<React.Fragment key={index}>
									{Array.isArray(webtoons) &&
										webtoons?.map((webtoon) => (
											<li
												key={webtoon._id}
												className="searched-item-wrap"
												onClick={() => setSelectWebtoon(webtoon)}>
												<WebtoonItem
													articleClassName="searched-item"
													titleClassName="searched-title"
													webtoonItemImg={
														<img src={webtoon.img} width={80} height={80} />
													}
													webtoon={webtoon}
												/>
											</li>
										))}
								</React.Fragment>
							))}
							{!!searchDebounceValue && <div ref={moreRef}></div>}
						</>
					) : (
						<EmptyData
							className="no-search-result"
							content="검색 결과가 없습니다. 😥"
						/>
					)}
				</ul>
			)}

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
