// 모바일 화면에서 보이는 뒤로가기 버튼

// npm package
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// api
import axios from "axios";
import { API_URL } from "../config";

// design library (mantine)
import { IconChevronLeft } from "@tabler/icons";

// recoil
import { useRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../store/recoilAuthState";

// components
import { LogoComponent, SignIn, UserInfo } from "./Nav";

// hooks
// icon
import "../assets/scss/components/navback.scss";

// utils
import { getLocalStorage } from "../utils/storage";
import { LOGIN_TOKEN, USER_ID } from "../utils/constants";

const NavBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

  useEffect(() => {
    setJwtToken(getLocalStorage(LOGIN_TOKEN));

    axios.get(API_URL + `/auth/userinfo/${getLocalStorage(USER_ID)}`).then((response) => {
      setUserInfo(response.data);
    });
  }, [location]);

  const onClickBackPage = () => {
    navigate(-1);
  };

  return (
    <section className="nav-section">
      <div className="nav-container">
        <div className="webtoon-detail-logo">
          <LogoComponent />
        </div>
        <span onClick={onClickBackPage} className="back-btn">
          <IconChevronLeft size={24} />
        </span>
        {jwtToken !== null ? <UserInfo /> : <SignIn />}
      </div>
    </section>
  );
};

export default NavBack;
