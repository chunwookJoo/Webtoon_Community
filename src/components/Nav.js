import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/img/logo2.svg";
import { Input, InputGroup, Label, Button } from "reactstrap";
import "../assets/scss/components/nav.scss";

const LogoComponent = () => {
	return (
		<div>
			<Link to="/">
				<Logo />
			</Link>
		</div>
	);
};

const SignIn = () => {
	return (
		<div className="login-container">
			{/* <Link to="/login">
				<span>로그인</span>
			</Link>
			<Link to="/join">
				<span>회원가입</span>
			</Link> */}
			<InputGroup>
				<Input placeholder="닉네임을 입력하세요!" />
				<Button className="nickname-btn">등록</Button>
			</InputGroup>
		</div>
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
