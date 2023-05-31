import React from 'react';

import Loading from './Loading';
import LoginRedirecting from './login/LoginRedirecting';
import SearchModal from './modal/SearchModal';
import Nav from './navigation/Nav';
import NavBack from './navigation/NavBack';

// 웹툰
export const Webtoon = React.lazy(() => import('./Webtoon'));
export const WebtoonInfoDetail = React.lazy(() =>
	import('./WebtoonInfoDetail'),
);

export { Loading, LoginRedirecting, Nav, NavBack, SearchModal };
