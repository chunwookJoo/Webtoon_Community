import React from 'react';

import Loading from './Loading';
import KakaoRedirecting from './login/KakaoRedirecting';
import NaverRedirecting from './login/NaverRedirecting';
import SearchModal from './modal/SearchModal';
import Nav from './navigation/Nav';
import NavBack from './navigation/NavBack';

// 웹툰
export const Webtoon = React.lazy(() => import('./Webtoon'));
export const WebtoonInfoDetail = React.lazy(() =>
	import('./WebtoonInfoDetail'),
);

export {
	KakaoRedirecting,
	Loading,
	Nav,
	NavBack,
	NaverRedirecting,
	SearchModal,
};
