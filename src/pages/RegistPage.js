import React from "react";
import { useLocation } from "react-router-dom";

const RegistPage = () => {
	const location = useLocation();
	console.log(location.state);
	return (
		<div>
			<h1>회원가입 페이쥐이이</h1>
			<div>데이터</div>
		</div>
	);
};

export default RegistPage;
