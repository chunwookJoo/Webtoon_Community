import React from "react";

export const WebtoonPage = React.lazy(() => import("./WebtoonPage"));
export const WebtoonDetail = React.lazy(() => import("./WebtoonDetail"));

// 마이웹툰
export const MyWebtoon = React.lazy(() => import("./MyWebtoon"));

// 내정보
export const UserInfo = React.lazy(() => import("./UserInfo"));

// regist
export const KakaoRegist = React.lazy(() => import("./regist/KakaoRegist"));
export const NaverRegist = React.lazy(() => import("./regist/NaverRegist"));
