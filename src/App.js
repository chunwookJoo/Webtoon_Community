import React, { Suspense, useEffect } from "react";
import { Routes, Navigate, Route, useLocation } from "react-router-dom";
import Redirecting from "./components/login/Redirecting";
import Nav from "./components/Nav";
import { WebtoonPage, WebtoonDetail } from "./pages/PagesIndex";
import RegistPage from "./pages/RegistPage";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route exact path="/" element={<WebtoonPage />} />
				<Route exact path="/:id" element={<WebtoonDetail />} />

				{/* 플랫폼 선택 */}
				<Route exact path="/all" element={<WebtoonPage />} />
				<Route exact path="/naver" element={<WebtoonPage />} />
				<Route exact path="/kakao" element={<WebtoonPage />} />
				<Route exact path="/kakaoPage" element={<WebtoonPage />} />

				{/* 회원가입 */}
				<Route exact path="/regist" element={<RegistPage />} />

				{/* 리다이랙트 */}
				<Route exact path="/kakaoLogin/callback" element={<Redirecting />} />
			</Routes>
		</>
	);
}

export default App;
