import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import { ReactComponent as All } from "../assets/img/all.svg";

export const PlatformLinkOptions = [
	{
		icon: <All />,
		name: "전체",
		src: "/all",
		boardSrc: "/board",
	},
	{
		icon: <Naver />,
		name: "네이버",
		src: "/naver",
		boardSrc: "/board/naver",
	},
	{
		icon: <Kakao />,
		name: "카카오",
		src: "/kakao",
		boardSrc: "/board/kakao",
	},
	{
		icon: <KakaoPage />,
		name: "페이지",
		src: "/kakaoPage",
		boardSrc: "/board/kakaoPage",
	},
];
