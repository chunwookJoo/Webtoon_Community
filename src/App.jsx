import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
	Loading,
	LoginRedirecting,
	Nav,
	NavBack,
} from './components/ComponentIndex';
import {
	BoardDetail,
	BoardPage,
	KakaoSignUp,
	MyWebtoon,
	NaverSignUp,
	NotFound,
	UserInfoPage,
	WebtoonDetail,
	// WebtoonPage,
} from './pages/PagesIndex';
import WebtoonPage from './pages/WebtoonPage';

function App() {
	return (
		// <Routes>
		// 	<Route element={<Nav />}>
		// 		<Route exact path="/" element={<WebtoonPage />} />
		// 	</Route>
		// </Routes>
		<Suspense>
			<Routes>
				<Route element={<NavBack />}>
					<Route exact path="/webtoon/:id" element={<WebtoonDetail />} />
					<Route exact path="/board/detail/:id" element={<BoardDetail />} />
					<Route exact path="/mywebtoon" element={<MyWebtoon />} />
					<Route exact path="/userinfo" element={<UserInfoPage />} />
				</Route>
				<Route element={<Nav />}>
					<Route exact path="/board" element={<BoardPage />} />
					<Route exact path="/board/naver" element={<BoardPage />} />
					<Route exact path="/board/kakao" element={<BoardPage />} />
					<Route exact path="/board/kakaoPage" element={<BoardPage />} />

					<Route exact path="/" element={<WebtoonPage />} />
					<Route exact path="/all" element={<WebtoonPage />} />
					<Route exact path="/naver" element={<WebtoonPage />} />
					<Route exact path="/kakao" element={<WebtoonPage />} />
					<Route exact path="/kakaoPage" element={<WebtoonPage />} />

					<Route exact path="/regist/kakao" element={<KakaoSignUp />} />
					<Route exact path="/regist/naver" element={<NaverSignUp />} />

					<Route
						exact
						path="/kakaoLogin/callback"
						element={<LoginRedirecting platform="kakao" />}
					/>
					<Route
						exact
						path="/naverLogin/callback"
						element={<LoginRedirecting platform="naver" />}
					/>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
