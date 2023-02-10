// npm package
import React from "react";
import { useLocation } from "react-router-dom";

// api
import { postMyWebtoon } from "../api/webtoon";

// components
import { ReactComponent as Naver } from "../assets/img/naver.svg";
import { ReactComponent as Kakao } from "../assets/img/kakao.svg";
import { ReactComponent as KakaoPage } from "../assets/img/kakaopage.svg";
import WebtoonInfoDetail from "../components/WebtoonInfoDetail";

// icon
import "../assets/scss/pages/webtoonDetail.scss";

// utils
import { getLocalStorage } from "../utils/storage";
import {
  ALREADY_EXISTS_MYWEBTOON_WARNING,
  INFORM_LOGIN_WARNING,
  SAVE_MYWEBTOON_SUCCESS,
  USER_ID,
} from "../utils/constants";
import showToast from "../utils/toast";

const WebtoonDetail = () => {
  const { state } = useLocation();
  const webtoonData = state.webtoonDetailData;

  const postMyWebtoonAPIBody = {
    _id: webtoonData._id,
  };

  const onClickMyWebtoonInsert = async () => {
    if (getLocalStorage(USER_ID) === null) {
      showToast(INFORM_LOGIN_WARNING, "yellow");
      return;
    } else {
      const response = await postMyWebtoon(postMyWebtoonAPIBody);
      if (response.RESULT === 200) showToast(SAVE_MYWEBTOON_SUCCESS, "green");
      if (response.RESULT === 403) showToast(ALREADY_EXISTS_MYWEBTOON_WARNING, "yellow");
    }
  };

  return (
    <div>
      <section className="webtoon-detail-container">
        <WebtoonInfoDetail webtoon={webtoonData} />
        <div className="webtoon-detail-btns">
          <a className="mywebtoon-save-btn" onClick={onClickMyWebtoonInsert}>
            <button>마이웹툰에 저장</button>
          </a>
          <a
            href={webtoonData.url}
            target="_blank"
            className="webtoon-show-btn"
            rel="noreferrer"
          >
            <button className={`${webtoonData.service}`}>
              <span className="logo">
                {webtoonData.service === "naver" ? (
                  <Naver />
                ) : webtoonData.service === "kakao" ? (
                  <Kakao />
                ) : (
                  <KakaoPage />
                )}
              </span>
              &nbsp; 웹툰 보러가기
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default WebtoonDetail;
