import { Webtoon } from './ComponentIndex';

const WebtoonList = ({ webtoons }) => {
	return (
		<>
			{webtoons?.map((webtoon) => (
				<Webtoon key={webtoon._id} webtoonData={webtoon} />
			))}
		</>
	);
};

export default WebtoonList;
