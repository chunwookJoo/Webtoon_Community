import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/img/logo.svg";

// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Modal, Avatar, Menu } from "@mantine/core";
import { jwtTokenState, loginModalState, userInfoState } from "../utils/atom";
import { useRecoilState } from "recoil";
import { PlatformLinkOptions } from "./PlatformLinkOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Button } from "reactstrap";
import "../assets/scss/components/nav.scss";
import KakaoLogin from "./login/KakaoLogin";
import { useEffect } from "react";
import { IconEdit, IconLogout } from "@tabler/icons";
import axios from "axios";
import { API_URL, KAKAO_ADMIN_KEY } from "../config";

const LogoComponent = () => {
	return (
		<div className="logo">
			<Link to="/" onClick={() => (window.location.href = "/")}>
				<Logo />
			</Link>
		</div>
	);
};

const PlatformLink = (props) => {
	const option = props.option;
	const { icon, name, src } = option;
	return (
		<li onClick={() => props.getData(name)}>
			<Link to={src}>
				<span>{icon}</span>
				<p className="platform-name">{name}</p>
			</Link>
		</li>
	);
};

const PlatformSelect = () => {
	let { search, pathname } = useLocation();
	const platform = Object.hasOwn(PlatformLinkOptions, pathname.split("/")[1]);
	const SelectedIcon = !platform
		? PlatformLinkOptions.all.icon
		: PlatformLinkOptions[pathname.split("/")[1]].icon;

	let selected = "";
	switch (pathname.split("/")[1]) {
		case "naver":
			selected = "네이버";
			break;
		case "kakao":
			selected = "카카오";
			break;
		case "kakaoPage":
			selected = "카카오페이지";
			break;
		default:
			selected = "전체";
			break;
	}
	const [isPlatformOpen, setIsPlatformOpen] = useState(false);
	const [platformNameSelected, setPlatformNameSelected] = useState(selected);

	const getPlatformName = (name) => {
		setPlatformNameSelected(name);
		setIsPlatformOpen(false);
	};

	return (
		<div
			className="platform-select"
			onClick={() => setIsPlatformOpen(!isPlatformOpen)}
		>
			<span>{SelectedIcon}</span>
			<span className="platform-name">{platformNameSelected}</span>
			<span>
				<FontAwesomeIcon icon={faCaretDown} />
			</span>
			<Collapse isOpen={isPlatformOpen} className="platform-collapse">
				<ul className="platform-list">
					<PlatformLink
						option={PlatformLinkOptions.all}
						getData={getPlatformName}
					/>
					<PlatformLink
						option={PlatformLinkOptions.naver}
						getData={getPlatformName}
					/>
					<PlatformLink
						option={PlatformLinkOptions.kakao}
						getData={getPlatformName}
					/>
					<PlatformLink
						option={PlatformLinkOptions.kakaoPage}
						getData={getPlatformName}
					/>
				</ul>
			</Collapse>
		</div>
	);
};

const SignIn = () => {
	const [modalOpen, setModalOpen] = useRecoilState(loginModalState);
	const modalHandler = () => setModalOpen(!modalOpen);
	return (
		<>
			<div className="login-container">
				<span className="login-btn" onClick={modalHandler}>
					로그인
				</span>
			</div>
			<Modal
				size="sm"
				centered
				opened={modalOpen}
				onClose={modalHandler}
				title="로그인"
				className="login-modal-container"
			>
				<KakaoLogin />
			</Modal>
		</>
	);
};

const UserInfo = (props) => {
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	useEffect(() => {
		axios.get(API_URL + `/auth/userinfo/${props.jwtToken}`).then((response) => {
			setUserInfo(response.data);
		});
	}, []);

	const accessToken = userInfo?.kakaoToken;

	const body = {
		access_token: accessToken,
		admin_key: KAKAO_ADMIN_KEY,
	};

	const logout = () => {
		// axios.post(API_URL + "/auth/user/unlink", body).then((response) => {
		// 	console.log(response);
		// });
		localStorage.removeItem("Authentication");
		window.location.reload();
	};

	return (
		<div className="login-container">
			<span className="user-avatar">
				<Menu shadow="lg" width={220} position="bottom-end">
					<Menu.Target>
						<Avatar src={userInfo?.profileImage} radius="xl" />
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item>
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
						<Menu.Item icon={<IconEdit size={16} />}>
							<div>프로필 수정</div>
						</Menu.Item>
						<Menu.Item
							className="logout"
							icon={<IconLogout size={16} />}
							onClick={logout}
						>
							로그아웃
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</span>
		</div>
	);
};

const Nav = () => {
	const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);

	useEffect(() => {
		setJwtToken(localStorage.getItem("Authentication"));
	}, [jwtToken]);

	return (
		<section className="nav-section">
			<div className="nav-container">
				<LogoComponent />
				<PlatformSelect />
				{jwtToken !== null ? <UserInfo jwtToken={jwtToken} /> : <SignIn />}
			</div>
		</section>
	);
};

export default Nav;
