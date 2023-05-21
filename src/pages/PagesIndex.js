import React from 'react';

// 웹툰 페이지
export const WebtoonPage = React.lazy(() => import('./WebtoonPage'));
export const WebtoonDetail = React.lazy(() => import('./WebtoonDetail'));

// 독자 페이지
export const BoardPage = React.lazy(() => import('./board/BoardPage'));
export const BoardDetail = React.lazy(() => import('./board/BoardDetail'));

// 마이웹툰
export const MyWebtoon = React.lazy(() => import('./MyWebtoon'));

// 내정보
export const UserInfoPage = React.lazy(() => import('./UserInfoPage'));

// signup
export const KakaoSignUp = React.lazy(() => import('./signup/KakaoSignUp'));
export const NaverSignUp = React.lazy(() => import('./signup/NaverSignUp'));

// 404 페이지
export const NotFound = React.lazy(() => import('./NotFound'));
