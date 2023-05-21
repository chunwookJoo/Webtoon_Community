import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { getUserInfo } from './api/user';
import {
	KakaoRedirecting,
	Loading,
	Nav,
	NavBack,
	NaverRedirecting,
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
	WebtoonPage,
} from './pages/PagesIndex';

function App() {
	const { data: userInfo, isLoading } = useQuery(['userInfo'], () =>
		getUserInfo(),
	);
	console.log(userInfo);
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				{/* 뒤로가기 네비게이션 */}
				<Route element={<NavBack />}>
					<Route exact path="/webtoon/:id" element={<WebtoonDetail />} />
					<Route exact path="/board/detail" element={<BoardDetail />} />
					<Route exact path="/mywebtoon" element={<MyWebtoon />} />
					<Route exact path="/userinfo" element={<UserInfoPage />} />
				</Route>
				{/* 네비게이션 */}
				<Route element={<Nav />}>
					<Route exact path="/" element={<WebtoonPage />} />
					<Route exact path="/board" element={<BoardPage />} />

					{/* 플랫폼 선택 */}
					<Route exact path="/all" element={<WebtoonPage />} />
					<Route exact path="/naver" element={<WebtoonPage />} />
					<Route exact path="/kakao" element={<WebtoonPage />} />
					<Route exact path="/kakaoPage" element={<WebtoonPage />} />

					{/* 회원가입 */}
					<Route exact path="/regist/kakao" element={<KakaoSignUp />} />
					<Route exact path="/regist/naver" element={<NaverSignUp />} />

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
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
