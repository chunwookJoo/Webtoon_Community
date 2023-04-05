import { Link, useLocation } from 'react-router-dom';

const WeekLink = () => {
	const { search } = useLocation();
	const week = ['월', '화', '수', '목', '금', '토', '일'];
	const todayNum = new Date().getDay();

	const weekDayLinkOptions = week.map((day, weekNum) => ({
		name: day,
		src: `?week=${weekNum}`,
	}));

	weekDayLinkOptions.unshift({
		name: '신작',
		src: '?week=new',
	});

	weekDayLinkOptions.push({
		name: '완결',
		src: '?week=fin',
	});

	const today = week[todayNum === 0 ? 6 : todayNum - 1];

	// 요일 nav
	const WeekList = weekDayLinkOptions.map((weekItem, index) => {
		let active = '';
		!search
			? weekItem.name === today && (active = 'active')
			: weekItem.src.includes(search) && (active = 'active');

		return (
			<li key={index}>
				<Link to={weekItem.src} className={active}>
					{weekItem.name}
				</Link>
			</li>
		);
	});

	return <ul className="week-list-wrap">{WeekList}</ul>;
};

export default WeekLink;
