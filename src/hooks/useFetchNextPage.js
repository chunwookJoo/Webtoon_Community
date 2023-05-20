import { useEffect } from 'react';

const useFetchNextPage = (
	webtoonSearchListData,
	isMoreRefShow,
	pageRef,
	fetchNextPage,
) => {
	useEffect(() => {
		if (webtoonSearchListData?.pages.statusCode === 404) return;
		if (isMoreRefShow) {
			pageRef.current++;
			fetchNextPage();
		}
	}, [isMoreRefShow]);
};

export default useFetchNextPage;
