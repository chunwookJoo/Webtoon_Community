import { IconChevronRight } from '@tabler/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const TransformPage = (props) => {
	const { url, text, icon } = props;
	return (
		<Link to={url} state={'/board'} className="page-select">
			<span>
				{icon} {text}
			</span>
			<span className="arrow">
				<IconChevronRight />
			</span>
		</Link>
	);
};

export default TransformPage;
