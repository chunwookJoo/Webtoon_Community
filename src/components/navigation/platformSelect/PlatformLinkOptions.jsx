import { ReactComponent as All } from '../../../assets/img/all.svg';
import { ReactComponent as Kakao } from '../../../assets/img/kakao.svg';
import { ReactComponent as KakaoPage } from '../../../assets/img/kakaopage.svg';
import { ReactComponent as Naver } from '../../../assets/img/naver.svg';

export const PlatformLinkOptions = [
	{
		id: '1',
		icon: <All />,
		name: '전체',
		src: '/all',
		boardSrc: '/board',
	},
	{
		id: '2',
		icon: <Naver />,
		name: '네이버',
		src: '/naver',
		boardSrc: '/board/naver',
	},
	{
		id: '3',
		icon: <Kakao />,
		name: '카카오',
		src: '/kakao',
		boardSrc: '/board/kakao',
	},
	{
		id: '4',
		icon: <KakaoPage />,
		name: '페이지',
		src: '/kakaoPage',
		boardSrc: '/board/kakaoPage',
	},
];
