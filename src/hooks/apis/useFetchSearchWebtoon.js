import { useEffect } from 'react';

import { getSearchWebtoon } from '../../api/webtoon';

const useFetchSearchWebtoon = (
	searchDebounceValue,
	refetch,
	setHasSearchResult,
	pageRef,
	webtoonSearchListData,
) => {
	useEffect(() => {
		if (!!searchDebounceValue) {
			const fetch = async () => {
				const data = await getSearchWebtoon(searchDebounceValue, 1);
				refetch();
				if (data.statusCode === 404) {
					setHasSearchResult(false);
					return;
				} else {
					setHasSearchResult(true);
					pageRef.current = 1;
					if (webtoonSearchListData?.pages) {
						webtoonSearchListData.pages = [];
						webtoonSearchListData.pageParams = [];
					}
					return;
				}
			};
			fetch();
		} else if (webtoonSearchListData?.pages) {
			webtoonSearchListData.pages = [];
			webtoonSearchListData.pageParams = [];
		}
	}, [searchDebounceValue]);
};

export default useFetchSearchWebtoon;
