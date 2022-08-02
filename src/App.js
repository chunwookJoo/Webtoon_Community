import React, { Suspense, useEffect } from "react";
import { Routes, Navigate, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import { Join, Login, WebtoonPage, WebtoonDetail } from "./pages/PagesIndex";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route exact path="/" element={<WebtoonPage />} />
				{/* <Route exact path="/login" element={<Login />} />
				<Route exact path="/join" element={<Join />} /> */}
				<Route exact path="/:id" element={<WebtoonDetail />} />

				{/* 플랫폼 선택 */}
				<Route exact path="/all" element={<WebtoonPage />} />
				<Route exact path="/naver" element={<WebtoonPage />} />
				<Route exact path="/kakao" element={<WebtoonPage />} />
				<Route exact path="/kakaoPage" element={<WebtoonPage />} />
			</Routes>
		</>
	);
}

export default App;
