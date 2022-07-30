import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import { ReactComponent as All } from "../assets/img/all.svg";

export const PlatformLinkOptions = {
	all: {
		icon: <All />,
		name: "전체",
		src: "/all",
	},

	naver: {
		icon: <Naver />,
		name: "네이버",
		src: "/naver",
	},

	kakao: {
		icon: <Kakao />,
		name: "카카오",
		src: "/kakao",
	},

	kakaoPage: {
		icon: <KakaoPage />,
		name: "카카오페이지",
		src: "/kakaoPage",
	},
};
