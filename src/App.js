import React, { Suspense, useEffect } from "react";
import { Routes, Navigate, Route, useLocation } from "react-router-dom";
import { Join, Login, WebtoonList, WebtoonDetail } from "./pages/PagesIndex";

function App() {
	return (
		<>
			<Suspense>
				<Routes>
					<Route exact path="/" element={<WebtoonList />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/join" element={<Join />} />
					<Route exact path="/detail" element={<WebtoonDetail />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
