import React from 'react';

import { Webtoon } from './ComponentIndex';

const WebtoonList = ({ webtoons }) => {
	return (
		<React.Fragment>
			{webtoons?.map((webtoon) => (
				<Webtoon key={webtoon._id} webtoonData={webtoon} />
			))}
		</React.Fragment>
	);
};

export default WebtoonList;
