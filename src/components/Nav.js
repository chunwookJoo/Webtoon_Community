import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/img/logo.svg";

// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Modal } from "@mantine/core";
import { loginModalState } from "../utils/atom";
import { useRecoilState } from "recoil";
import { PlatformLinkOptions } from "./PlatformLinkOptions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Button } from "reactstrap";
import "../assets/scss/components/nav.scss";
import KakaoLogin from "./login/KakaoLogin";

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
				<span onClick={modalHandler}>로그인</span>
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
				{/* <KakaoLogin
					jsKey={KAKAO_JS_KEY}
					onSuccess={handleKakaoSuccess}
					onFail={handleKakaoFail}
					className="KakaoLogin"
				>
					<img src="/images/kakao_login_medium_wide.png" />
				</KakaoLogin> */}
			</Modal>
		</>
	);
};

const Nav = () => {
	return (
		<section className="nav-section">
			<div className="nav-container">
				<LogoComponent />
				<PlatformSelect />
				<SignIn />
			</div>
		</section>
	);
};

export default Nav;
