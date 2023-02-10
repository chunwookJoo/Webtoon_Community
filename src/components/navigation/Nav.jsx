// npm package
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// api
import { getUserInfo } from "../../api/user";

// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../../store/recoilAuthState";

// components
import LogoComponent from "./Logo";
import TransformPage from "./TransformPage";
import WeekLink from "./WeekLink";
import SignIn from "./SignIn";
import PlatformSelect from "./platformSelect/PlatformSelect";

// icon
import { IconLayoutDashboard, IconMessageCircle } from "@tabler/icons";
import "../../assets/scss/components/nav.scss";

// utils
import { LOGIN_TOKEN } from "../../utils/constants";
import { getLocalStorage } from "../../utils/storage";
import UserInfo from "./UserInfo";

const Nav = () => {
  const { pathname } = useLocation();
  const setUserInfo = useSetRecoilState(userInfoState);
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setJwtToken(getLocalStorage(LOGIN_TOKEN));
      const response = await getUserInfo();
      setUserInfo(response);
    };
    fetchUserInfo();
  }, [pathname]);

  return (
    <section className="nav-section">
      <div className="nav-container">
        <LogoComponent />
        <TransformPage
          url={pathname.includes("board") ? "/all" : "/board"}
          text={pathname.includes("board") ? "플랫폼별 웹툰 모음" : "독자 후기 모음"}
          icon={
            pathname.includes("board") ? <IconLayoutDashboard /> : <IconMessageCircle />
          }
        />
        {jwtToken !== null ? <UserInfo /> : <SignIn />}
      </div>
      <div className="mobile-page-select">
        <TransformPage
          url={pathname.includes("board") ? "/all" : "/board"}
          text={pathname.includes("board") ? "플랫폼별 웹툰 모음" : "독자 후기 모음"}
          icon={
            pathname.includes("board") ? <IconLayoutDashboard /> : <IconMessageCircle />
          }
        />
      </div>
      <PlatformSelect />
      {pathname.includes("board") ? (
        ""
      ) : (
        <>
          <WeekLink />
        </>
      )}
    </section>
  );
};

export default Nav;
