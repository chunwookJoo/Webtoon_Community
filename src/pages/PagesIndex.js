import React from "react";

export const WebtoonPage = React.lazy(() => import("./WebtoonPage"));
export const WebtoonDetail = React.lazy(() => import("./WebtoonDetail"));

// regist
export const KakaoRegist = React.lazy(() => import("./regist/KakaoRegist"));
export const NaverRegist = React.lazy(() => import("./regist/NaverRegist"));
