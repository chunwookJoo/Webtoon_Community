import React, { Suspense, useEffect } from "react";
import { Routes, Navigate, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import { Join, Login, WebtoonList, WebtoonDetail } from "./pages/PagesIndex";

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route exact path="/" element={<WebtoonList />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/join" element={<Join />} />
				<Route exact path="/detail" element={<WebtoonDetail />} />
			</Routes>
		</>
	);
}

export default App;
