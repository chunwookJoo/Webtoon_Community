import { ERROR_MESSAGE, USER_ID } from '../utils/constants.jsx';
import { getLocalStorage } from '../utils/storage';
import showToast from '../utils/toast';
import api from './api';

/**
 * 웹툰 리스트 출력
 * @param {string} pathname
 * @param {any} query
 * @param {number} page
 * @returns
 */
const getWebtoonList = async (pathname, query, page) => {
	const todayNum = new Date().getDay();
	const week = ['0', '1', '2', '3', '4', '5', '6'];
	const todayWeek = week[todayNum === 0 ? 6 : todayNum - 1];
	let PLATFORM_URL = '';
	let WEEK_URL = '';

	switch (pathname) {
		case '/':
			PLATFORM_URL = '/all';
			break;
		case '/kakaoPage':
			PLATFORM_URL = '/kakao-page';
			break;
		default:
			PLATFORM_URL = pathname;
	}

	!query.week && (query.week = todayWeek);
	switch (query.week) {
		case 'fin':
			WEEK_URL = `/finished?day=${7}`;
			break;
		case 'new':
			WEEK_URL = `/new?day=${8}`;
			break;
		default:
			WEEK_URL = `/week?day=${query.week}`;
	}

	try {
		const { data } = await api.get(
			`/api${PLATFORM_URL}${WEEK_URL}&page=${page}`,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 리스트 출력 에러');
	}
};

/**
 * 웹툰 상세 정보
 * @param {string} webtoonId
 * @returns
 */
const getWebtoonDetail = async (webtoonId) => {
	try {
		const { data } = await api.get(`/search/webtoon/${webtoonId}`);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '웹툰 조회 에러');
	}
};

const getSearchWebtoon = async (searchValue, page) => {
	if (!!searchValue) {
		try {
			const { data } = await api.get(
				`/search?keyword=${searchValue}&page=${page}`,
			);
			return data;
		} catch (error) {
			showToast(ERROR_MESSAGE, 'red');
			throw new Error(error, '웹툰 검색 에러');
		}
	}
};

/**
 * 마이웹툰에 웹툰 저장
 * @param {any} postMyWebtoonAPIBody
 * @returns
 */
const postMyWebtoon = async (postMyWebtoonAPIBody) => {
	try {
		const { data } = await api.post(
			`/auth/insert/mywebtoon/${getLocalStorage(USER_ID)}`,
			postMyWebtoonAPIBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '마이웹툰 저장 에러');
	}
};

/**
 * 마이웹툰 삭제
 * @param {any} removeMyWebtoonAPIBody
 * @returns
 */
const removeMyWebtoon = async (removeMyWebtoonAPIBody) => {
	try {
		const { data } = await api.post(
			`/auth/delete/mywebtoon/${getLocalStorage(USER_ID)}`,
			removeMyWebtoonAPIBody,
		);
		return data;
	} catch (error) {
		showToast(ERROR_MESSAGE, 'red');
		throw new Error(error, '마이웹툰 삭제 에러');
	}
};

export {
	getSearchWebtoon,
	getWebtoonDetail,
	getWebtoonList,
	postMyWebtoon,
	removeMyWebtoon,
};
