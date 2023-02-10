import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../store/recoilAuthState";
import { LOGIN_TOKEN, LOGOUT_SUCCESS, USER_ID } from "../../utils/constants";
import { removeLocalStorage } from "../../utils/storage";
import showToast from "../../utils/toast";
import WebtoonSearchButton from "./WebtoonSearchButton";

// design library (mantine)
import { Avatar, Menu } from "@mantine/core";
import { IconBook2, IconEdit, IconLogout } from "@tabler/icons";

const UserInfo = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userInfo = useRecoilValue(userInfoState);

  const onClickLogout = () => {
    removeLocalStorage(LOGIN_TOKEN);
    removeLocalStorage(USER_ID);
    navigate("/");
    showToast(LOGOUT_SUCCESS, "green");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const navigateHandler = (url) => {
    navigate(url, { state: userInfo });
  };

  return (
    <div className="login-container">
      {pathname === "/webtoon" ||
      pathname === "/mywebtoon" ||
      pathname === "/board/detail" ||
      pathname === "/userinfo" ? (
        ""
      ) : (
        <WebtoonSearchButton />
      )}
      <span className="user-avatar">
        <Menu shadow="lg" width={220} position="bottom-end">
          <Menu.Target>
            <Avatar src={userInfo?.profileImage} radius="xl" />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigateHandler("/userinfo")}>
              <div className="user-info-container">
                <Avatar src={userInfo?.profileImage} radius="md" />
                <div className="user-info">
                  <h5>{userInfo?.nickname}</h5>
                  <p>
                    <span>{userInfo?.age?.split("~")[0]}대</span>/
                    <span>{userInfo?.gender === "male" ? "남자" : "여자"}</span>
                  </p>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item
              icon={<IconBook2 size={16} />}
              onClick={() => navigateHandler("/mywebtoon")}
            >
              <div>마이 웹툰</div>
            </Menu.Item>
            <Menu.Item
              icon={<IconEdit size={16} />}
              onClick={() => navigateHandler("/userinfo")}
            >
              <div>프로필 수정</div>
            </Menu.Item>
            <Menu.Item
              className="logout"
              icon={<IconLogout size={16} />}
              onClick={onClickLogout}
            >
              로그아웃
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </span>
    </div>
  );
};

export default UserInfo;
