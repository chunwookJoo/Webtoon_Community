import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { PlatformLinkOptions } from "./PlatformLinkOptions";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<div>
			<Link to="/">이거봤어?</Link>
		</div>
	);
};

const PlatformLink = (props) => {
	const option = props.option;
	const { icon, name, src } = option;
	return (
		<li>
			<Link to={src}>
				<p>
					{icon}
					{name}
				</p>
			</Link>
		</li>
	);
};

const PlatformList = () => {
	const [isPlatformOpen, setIsPlatformOpen] = useState(false);
	console.log(isPlatformOpen);
	return (
		<div>
			<button onClick={() => setIsPlatformOpen(!isPlatformOpen)}>플랫폼</button>
			<Collapse isOpen={isPlatformOpen} className="platform-collapse">
				<ul className="platform-list">
					<PlatformLink option={PlatformLinkOptions.all} />
					<PlatformLink option={PlatformLinkOptions.naver} />
					<PlatformLink option={PlatformLinkOptions.kakao} />
					<PlatformLink option={PlatformLinkOptions.kakaoPage} />
				</ul>
			</Collapse>
		</div>
	);
};

const Nav = () => {
	const week = ["월", "화", "수", "목", "금", "토", "일"];

	return (
		<section>
			<div>
				<Logo />
				<PlatformList />
			</div>
			<div>
				{week.map((item, index) => {
					return (
						<div key={index}>
							<ul>
								<li>{item}</li>
							</ul>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Nav;
