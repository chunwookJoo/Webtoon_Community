const WebtoonInfoDetail = ({ webtoon }) => {
	const platform =
		webtoon.service === 'naver'
			? '네이버 웹툰'
			: webtoon.service === 'kakao'
			? '카카오 웹툰'
			: '카카오페이지 웹툰';

	const week = [
		'월요일',
		'화요일',
		'수요일',
		'목요일',
		'금요일',
		'토요일',
		'일요일',
		'완결',
		'신작',
	];

	return (
		<>
			<div className="webtoon-img">
				<img src={webtoon.img} alt={webtoon.title} />
			</div>
			<div className="webtoon-title">
				<h3>{webtoon.title}</h3>
				<h5>
					{webtoon.author} | {platform}
				</h5>
			</div>
			<div className="webtoon-week">
				<ul>
					{webtoon.week.map((item, index) => {
						return <li key={index}>{week[item]}</li>;
					})}
				</ul>
			</div>
		</>
	);
};

export default WebtoonInfoDetail;
