import '../assets/scss/components/webtoon.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { ReactComponent as Kakao } from '../assets/img/kakao.svg';
import { ReactComponent as KakaoPage } from '../assets/img/kakaopage.svg';
import { ReactComponent as Naver } from '../assets/img/naver.svg';
import { searchModalState } from '../store/recoilModalState';

const PlatformLogo = (props) => {
	const { platform } = props;
	return platform === 'naver' ? (
		<Naver />
	) : platform === 'kakao' ? (
		<Kakao />
	) : (
		<KakaoPage />
	);
};

const Badge = (txt, className) => (
	<div key={className} className={className}>
		<span>{txt}</span>
	</div>
);

const BadgeList = (props) => {
	let badges = [];
	const { additional } = props;
	additional.new && badges.push(Badge('신규', 'new'));
	additional.rest && badges.push(Badge('휴재', 'rest'));
	additional.up && badges.push(Badge('UP', 'up'));
	additional.adult && badges.push(Badge('19', 'adult'));
	return <div className="additional">{badges}</div>;
};

const Webtoon = (props) => {
	const { webtoonData } = props;
	const [modalOpen, setModalOpen] = useRecoilState(searchModalState);

	return (
		<li className="webtoon-link-wrap" id={webtoonData._id}>
			<Link
				className="webtoon-link"
				to="/webtoon"
				state={{ webtoonDetailData: webtoonData }}
				onClick={() => setModalOpen(false)}>
				<PlatformLogo platform={webtoonData.service} />
				<BadgeList additional={webtoonData.additional} />
				<div className="thumbnail-wrap">
					<img src={webtoonData.img} className="thumbnail" />
				</div>
				<p className={`title ${webtoonData.service}`}>{webtoonData.title}</p>
			</Link>
		</li>
	);
};

export default Webtoon;
