import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import KakaoRedirecting from "./components/login/KakaoRedirecting";
import NaverRedirecting from "./components/login/NaverRedirecting";
import Nav from "./components/Nav";
import NavBack from "./components/NavBack";
import {
	WebtoonPage,
	WebtoonDetail,
	KakaoRegist,
	NaverRegist,
} from "./pages/PagesIndex";

function App() {
	const { pathname } = useLocation();
	console.log(decodeURI(pathname));
	return (
		<>
			{pathname === "/webtoon" ? <NavBack /> : <Nav />}

			<Routes>
				<Route exact path="/" element={<WebtoonPage />} />
				<Route exact path="/webtoon" element={<WebtoonDetail />} />

				{/* 플랫폼 선택 */}
				<Route exact path="/all" element={<WebtoonPage />} />
				<Route exact path="/naver" element={<WebtoonPage />} />
				<Route exact path="/kakao" element={<WebtoonPage />} />
				<Route exact path="/kakaoPage" element={<WebtoonPage />} />

				{/* 회원가입 */}
				<Route exact path="/regist/kakao" element={<KakaoRegist />} />
				<Route exact path="/regist/naver" element={<NaverRegist />} />

				{/* 리다이랙트 */}
				<Route
					exact
					path="/kakaoLogin/callback"
					element={<KakaoRedirecting />}
				/>
				<Route
					exact
					path="/naverLogin/callback"
					element={<NaverRedirecting />}
				/>
			</Routes>
		</>
	);
}

export default App;
