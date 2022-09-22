import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../utils/atom";

const UserInfo = () => {
	const { state } = useLocation();
	// const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const user = state;

	return (
		<div>
			<h1>내정보</h1>
		</div>
	);
};

export default UserInfo;
