import { ERROR_MESSAGE } from '../utils/constants.jsx';
import showToast from '../utils/toast';
import api from './api';

/**
 * 웹툰 후기 작성
 * @param {any} postCreateBoardAPIBody
 * @returns
 */
const postCreateBoard = async (postCreateBoardAPIBody) => {
	try {
		const { data } = await api.post(
			'/api/board/create',
			postCreateBoardAPIBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 후기 작성 에러');
	}
};

/**
 * 플랫폼별 웹툰 후기 리스트 조회
 * @param {string} url
 * @returns
 */
const getBoardList = async (url) => {
	try {
		const { data } = await api.get(`/api${url}`);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 후기 리스트 조회 에러');
	}
};

/**
 * 웹툰 후기 조회
 * @param {string} boardId
 * @returns
 */
const getBoardDetail = async (boardId) => {
	try {
		const { data } = await api.get(`/api/board/${boardId}`);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 후기 조회 에러');
	}
};

/**
 * 웹툰 후기 댓글 작성
 * @param {any} postCreateCommentAPIBody
 * @returns
 */
const postCreateComment = async (postCreateCommentAPIBody) => {
	try {
		const { data } = await api.post(
			'/comment/insert',
			postCreateCommentAPIBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 후기 댓글 작성 에러');
	}
};

/**
 * 웹툰 후기 댓글 조회
 * @param {any} postCreateCommentAPIBody
 * @returns
 */
const getCommentList = async (boardId) => {
	try {
		const { data } = await api.get(`/comment/${boardId}`);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 후기 댓글 조회 에러');
	}
};

export {
	getBoardDetail,
	getBoardList,
	getCommentList,
	postCreateBoard,
	postCreateComment,
};
