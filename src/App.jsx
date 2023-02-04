// npm package
import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// components
import {
	Nav,
	NavBack,
	Loading,
	KakaoRedirecting,
	NaverRedirecting,
} from "./components/ComponentIndex";

import {
	WebtoonPage,
	WebtoonDetail,
	BoardPage,
	BoardDetail,
	MyWebtoon,
	UserInfo,
	KakaoRegist,
	NaverRegist,
	NotFound,
} from "./pages/PagesIndex";

function App() {
	const { pathname } = useLocation();
	return (
		<>
			{pathname === "/webtoon" ||
			pathname === "/mywebtoon" ||
			pathname === "/board/detail" ||
			pathname === "/userinfo" ? (
				<NavBack />
			) : (
				<Nav />
			)}
			<Suspense fallback={<Loading />}>
				<Routes>
					{/* 웹툰 페이지 */}
					<Route exact path="/" element={<WebtoonPage />} />
					<Route exact path="/webtoon" element={<WebtoonDetail />} />

					{/* 독자 페이지 */}
					<Route exact path="/board" element={<BoardPage />} />
					<Route exact path="/board/detail" element={<BoardDetail />} />

					{/* 내 정보 */}
					<Route exact path="/userinfo" element={<UserInfo />} />

					{/* 마이 웹툰 */}
					<Route exact path="/mywebtoon" element={<MyWebtoon />} />

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

					{/* 페이지 없음 안내 */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
