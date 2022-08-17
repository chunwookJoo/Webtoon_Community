import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Modal, Button, Group } from "@mantine/core";
import { loginModalState } from "../utils/atom";
import { useRecoilState } from "recoil";
import "../assets/scss/components/nav.scss";

const LogoComponent = () => {
	return (
		<div className="logo">
			<Link to="/">
				<Logo />
			</Link>
		</div>
	);
};

const SignIn = () => {
	const [modalOpen, setModalOpen] = useRecoilState(loginModalState);
	const modalHandler = () => setModalOpen(!modalOpen);
	return (
		<>
			<div className="login-container">
				<span onClick={modalHandler}>로그인&nbsp; | &nbsp;회원가입</span>
			</div>
			<Modal
				size="sm"
				centered
				opened={modalOpen}
				onClose={modalHandler}
				title="로그인 회원가입"
				className="search-modal-container"
			>
				<article className="search-wrap">로그인 회원가입</article>
			</Modal>
		</>
	);
};

const Nav = () => {
	return (
		<section className="nav-section">
			<div className="nav-container">
				<LogoComponent />
				<SignIn />
			</div>
		</section>
	);
};

export default Nav;
