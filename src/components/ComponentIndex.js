import React from "react";

import Nav from "./navigation/Nav";
import NavBack from "./navigation/NavBack";

import SearchModal from "./modal/SearchModal";

import KakaoRedirecting from "./login/KakaoRedirecting";
import NaverRedirecting from "./login/NaverRedirecting";

import Loading from "./Loading";

// 웹툰
export const Webtoon = React.lazy(() => import("./Webtoon"));
export const WebtoonInfoDetail = React.lazy(() => import("./WebtoonInfoDetail"));

export { Nav, NavBack, SearchModal, KakaoRedirecting, NaverRedirecting, Loading };
