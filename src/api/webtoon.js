import api from "./api";

const getWebtoonList = async (pathname, query, page) => {
  const todayNum = new Date().getDay();
  const week = ["0", "1", "2", "3", "4", "5", "6"];
  const todayWeek = week[todayNum === 0 ? 6 : todayNum - 1];
  let PLATFORM_URL = "";
  let WEEK_URL = "";

  switch (pathname) {
    case "/":
      PLATFORM_URL = "/all";
      break;
    case "/kakaoPage":
      PLATFORM_URL = "/kakao-page";
      break;
    default:
      PLATFORM_URL = pathname;
  }

  !query.week && (query.week = todayWeek);
  switch (query.week) {
    case "fin":
      WEEK_URL = `/finished?day=${7}`;
      break;
    case "new":
      WEEK_URL = `/new?day=${8}`;
      break;
    default:
      WEEK_URL = `/week?day=${query.week}`;
  }

  try {
    const { data } = await api.get(`/api${PLATFORM_URL}${WEEK_URL}&page=${page}`);
    return data;
  } catch (error) {
    throw new Error("웹툰 리스트 출력 에러");
  }
};

const getWebtoonDetail = () => {};

export { getWebtoonList };
