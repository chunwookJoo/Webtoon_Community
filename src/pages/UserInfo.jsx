// npm package
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// api
import { postUserProfileImg, updateUserProfile } from "../api/profile";

// design library (mantine)
import { Avatar, Input, Select } from "@mantine/core";

// recoil
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../store/recoilAuthState";

// hook
import useNicknameCheck from "../hooks/useNicknameCheck";

// icon
import "../assets/scss/pages/userinfo.scss";

// utils
import showToast from "../utils/toast";
import { AGE_RANGE, GENDER } from "../utils/userSelectItems";
import { NICKNAME_CHECK_WARNING, UPDATE_PROFILE_SUCCESS } from "../utils/constants";

const UserInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state;
  const nicknameInput = useRef();
  const profileImgInput = useRef();

  const setUserInfo = useSetRecoilState(userInfoState);
  const [profileImagePreview, setProfileImagePreview] = useState(user.profileImage);

  const [nickName, setNickName] = useState(user.nickname);
  const [nicknameChecked, setNicknameChecked] = useState("empty");
  const [ageRange, setAgeRange] = useState(user.age);
  const [gender, setGender] = useState(user.gender);

  const onChangeHandler = (e, state) => {
    if (state === "nickname") setNickName(e.target.value);
    else if (state === "age") setAgeRange(e);
    else if (state === "gender") setGender(e);
  };

  const onImgChange = async (e) => {
    const formData = new FormData();
    encodeFileToBase64(e.target.files[0]);
    formData.append("images", e.target.files[0]);
    await postUserProfileImg(user.id, formData);
  };

  // 프로필 사진 미리보기 인코딩
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileImagePreview(reader.result);
        resolve();
      };
    });
  };

  // 프로필 사진 수정 버튼 클릭
  const onProfileImgBtnClick = (e) => {
    e.preventDefault();
    profileImgInput.current.click();
  };

  // 닉네임 중복 체크
  const onClickNicknameCheck = async () => {
    setNicknameChecked(await useNicknameCheck(nickName));
  };

  // 회원정보 수정하기 버튼
  const onClickUserInfoUpdate = async () => {
    const updateUserProfileAPIBody = {
      nickname: nickName,
      age: ageRange,
      gender,
    };

    if (nicknameChecked === "available") {
      const response = await updateUserProfile(user.id, updateUserProfileAPIBody);
      if (response.RESULT === 200) {
        setUserInfo(response.user);
        showToast(UPDATE_PROFILE_SUCCESS, "green");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      nicknameInput.current.focus();
      showToast(NICKNAME_CHECK_WARNING, "yellow");
    }
  };

  return (
    <div className="userinfo-container">
      <div className="profile-img-container">
        <Avatar
          size={120}
          src={profileImagePreview}
          radius="xl"
          className="profile-img"
        />

        <div style={{ fontWeight: "bold" }}>{user.email}</div>
        <div className="profile-img-edit">
          <input
            style={{ display: "none" }}
            ref={profileImgInput}
            type="file"
            className="imgInput"
            accept="image/*"
            name="file"
            onChange={(e) => onImgChange(e)}
          ></input>
          <button onClick={onProfileImgBtnClick}>사진 수정</button>
        </div>
      </div>
      <div className="profile-input">
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
          <button onClick={(e) => onClickNicknameCheck(e)}>중복체크</button>
          {nicknameChecked === "empty" ? (
            <span className="unavailable">닉네임 중복체크를 해주세요.</span>
          ) : nicknameChecked === "available" ? (
            <span className="available">사용할 수 있는 닉네임입니다.</span>
          ) : (
            <span className="unavailable">이미 사용중인 닉네임입니다.</span>
          )}
        </div>
      </div>
      <div className="profile-input">
        <Input.Wrapper label="나이" required>
          <Select
            placeholder="본인 연령대를 선택하세요."
            data={AGE_RANGE}
            defaultValue={ageRange}
            onChange={(e) => onChangeHandler(e, "age")}
          />
        </Input.Wrapper>
      </div>
      <div className="profile-input">
        <Input.Wrapper label="성별" required>
          <Select
            placeholder="성별을 선택하세요."
            data={GENDER}
            defaultValue={gender}
            onChange={(e) => onChangeHandler(e, "gender")}
          />
        </Input.Wrapper>
      </div>
      <div className="profile-btn">
        <button onClick={onClickUserInfoUpdate}>프로필 수정하기</button>
      </div>
    </div>
  );
};

export default UserInfo;
