import { useInfiniteQuery } from '@tanstack/react-query';

import { getWebtoonList } from '../../api/webtoon';

export const useFetchWebtoonList = ({ pathname, query, pageRef }) => {
	return useInfiniteQuery({
		queryKey: ['webtoonList'],
		queryFn: ({ pageParam = '' }) => getWebtoonList(pathname, query, pageParam),
		getNextPageParam: () => {
			return pageRef.current;
		},
	});
};
