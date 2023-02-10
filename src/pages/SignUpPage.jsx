// npm package
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// design library (mantine)
import { Input, Select } from "@mantine/core";

//api
import { postSignUp } from "../api/signUp";

// recoil
import { useSetRecoilState } from "recoil";
import { jwtTokenState, userInfoState } from "../store/recoilAuthState";

// components
import { ReactComponent as Logo } from "../assets/img/logo.svg";

// hooks
import useNicknameCheck from "../hooks/useNicknameCheck";

// icon
import "../assets/scss/pages/registPage.scss";

// utils
import {
  LOGIN_TOKEN,
  NICKNAME_CHECK_WARNING,
  SIGNUP_SUCCESS,
  USER_ID,
} from "../utils/constants";
import { setLocalStorage } from "../utils/storage";
import showToast from "../utils/toast";
import { AGE_RANGE, GENDER } from "../utils/userSelectItems";

const SignUpPage = (props) => {
  const navigate = useNavigate();
  const nicknameInput = useRef();
  const { platform, account, token, id } = props;

  const email = account.email;
  const profileImage =
    platform === "kakao" ? account.profile.thumbnail_image_url : account.profile_image;
  const [ageRange, setAgeRange] = useState(
    platform === "kakao" ? account.age_range : account.age.replace("-", "~"),
  );
  const [gender, setGender] = useState(
    account.gender === "M" || account.gender === "male" ? "male" : "female",
  );

  /**
   * 공통으로 쓰이는 state
   */
  const setJwtToken = useSetRecoilState(jwtTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [nickName, setNickName] = useState("");
  const [nicknameChecked, setNicknameChecked] = useState("empty");

  const onChangeHandler = (e, state) => {
    if (state === "nickname") setNickName(e.target.value);
    else if (state === "age") setAgeRange(e);
    else if (state === "gender") setGender(e);
  };

  // 닉네임 중복 체크
  const onClickNicknameCheck = async () => {
    setNicknameChecked(await useNicknameCheck(nickName));
  };

  const onClickSignUp = async (e, platform) => {
    const postSignUpKakaoAPIBody = {
      kakaoToken: token,
      id,
      email,
      profileImage,
      nickname: nickName,
      age: ageRange,
      gender,
    };

    const postSignUpNaverAPIBody = {
      naverToken: token,
      id,
      email,
      profileImage,
      nickname: nickName,
      age: ageRange,
      gender,
    };

    if (nicknameChecked === "available") {
      const response = await postSignUp(
        platform,
        platform === "kakao" ? postSignUpKakaoAPIBody : postSignUpNaverAPIBody,
      );
      if (response.RESULT === 200) {
        setJwtToken(response.jwtToken);
        setUserInfo(response.user_data);
        setLocalStorage(LOGIN_TOKEN, response.jwtToken);
        setLocalStorage(USER_ID, response.user_data.id);
        navigate("/");
        showToast(SIGNUP_SUCCESS, "green");
      }
    } else {
      nicknameInput.current.focus();
      showToast(NICKNAME_CHECK_WARNING, "yellow");
    }
  };

  return (
    <div className="regist-container">
      <div className="regist-form-group">
        <div className="regist-title">
          <Logo />
          <h3>회원가입</h3>
        </div>
        <div className="regist-form">
          <div className="regist-input">
            <Input.Wrapper label="이메일" required>
              <Input defaultValue={account.email} disabled />
            </Input.Wrapper>
          </div>
          <div className="regist-input">
            <Input.Wrapper label="닉네임" required>
              &nbsp;
              <span style={{ fontSize: "12px" }}>({nickName.length}/8자)</span>
              <Input
                maxLength={8}
                placeholder="닉네임을 입력하세요."
                onChange={(e) => onChangeHandler(e, "nickname")}
                defaultValue={nickName}
                ref={nicknameInput}
              />
            </Input.Wrapper>
            <div className="nickname-check">
              {nicknameChecked === "empty" ? (
                <span className="unavailable">닉네임을 입력해주세요.</span>
              ) : nicknameChecked === "available" ? (
                <span className="available">사용할 수 있는 닉네임입니다.</span>
              ) : (
                <span className="unavailable">이미 사용중인 닉네임입니다.</span>
              )}
              <button onClick={(e) => onClickNicknameCheck(e)}>중복체크</button>
            </div>
          </div>
          <div className="regist-input">
            <Input.Wrapper label="나이" required>
              <Select
                placeholder="본인 연령대를 선택하세요."
                data={AGE_RANGE}
                defaultValue={ageRange}
                onChange={(e) => onChangeHandler(e, "age")}
              />
            </Input.Wrapper>
          </div>
          <div className="regist-input">
            <Input.Wrapper label="성별" required>
              <Select
                placeholder="성별을 선택하세요."
                data={GENDER}
                defaultValue={gender}
                onChange={(e) => onChangeHandler(e, "gender")}
              />
            </Input.Wrapper>
          </div>
        </div>
        <div className="regist-btn">
          <button onClick={(e) => onClickSignUp(e, platform)}>회원가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
