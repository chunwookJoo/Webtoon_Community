import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { boardListState } from "../../utils/atom";
import axios from "axios";
import { API_URL } from "../../config";

const BoardDetail = () => {
	const location = useLocation();
	console.log(location);
	return (
		<div>
			<h1>게시판 디테일</h1>
		</div>
	);
};

export default BoardDetail;
