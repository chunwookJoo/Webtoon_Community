// 모바일 화면에서 보이는 뒤로가기 버튼

// npm package
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// design library (mantine)
import { IconChevronLeft } from "@tabler/icons";

// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../../store/recoilAuthState";

// components
import UserInfo from "./UserInfo";
import SignIn from "./SignIn";
import LogoComponent from "./Logo";

// hooks
// icon
import "../../assets/scss/components/navback.scss";

// utils
import { getLocalStorage } from "../../utils/storage";
import { LOGIN_TOKEN, USER_ID } from "../../utils/constants";
import { getUserInfo } from "../../api/user";

const NavBack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setJwtToken(getLocalStorage(LOGIN_TOKEN));
      const response = await getUserInfo();
      setUserInfo(response);
    };

    fetchUserInfo();
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
