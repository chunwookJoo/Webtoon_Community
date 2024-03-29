import { atom } from 'recoil';

export const boardListState = atom({
	key: 'boardListState',
	default: null,
});

export const boardDataState = atom({
	key: 'boardDataState',
	default: [],
});

export const commentState = atom({
	key: 'commentState',
	default: null,
});
