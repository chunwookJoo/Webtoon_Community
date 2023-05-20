import { useInfiniteQuery } from '@tanstack/react-query';

import { getSearchWebtoon, getWebtoonList } from '../../api/webtoon';

export const useFetchWebtoonList = ({
	isSearch,
	searchValue,
	pathname,
	query,
	pageRef,
}) => {
	if (isSearch) {
		return useInfiniteQuery({
			queryKey: ['webtoonSearchList'],
			queryFn: ({ pageParam = '' }) => getSearchWebtoon(searchValue, pageParam),
			getNextPageParam: () => {
				return pageRef.current;
			},
			refetchOnWindowFocus: false,
		});
	} else {
		return useInfiniteQuery({
			queryKey: ['webtoonList'],
			queryFn: ({ pageParam = '' }) =>
				getWebtoonList(pathname, query, pageParam),
			getNextPageParam: () => {
				return pageRef.current;
			},
		});
	}
};
