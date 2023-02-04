import React from "react";

// 웹툰 페이지
export const WebtoonPage = React.lazy(() => import("./WebtoonPage"));
export const WebtoonDetail = React.lazy(() => import("./WebtoonDetail"));

// 독자 페이지
export const BoardPage = React.lazy(() => import("./board/BoardPage"));
export const BoardDetail = React.lazy(() => import("./board/BoardDetail"));

// 마이웹툰
export const MyWebtoon = React.lazy(() => import("./MyWebtoon"));

// 내정보
export const UserInfo = React.lazy(() => import("./UserInfo"));

// regist
export const KakaoRegist = React.lazy(() => import("./regist/KakaoRegist"));
export const NaverRegist = React.lazy(() => import("./regist/NaverRegist"));

// 404 페이지
export const NotFound = React.lazy(() => import("./NotFound"));
