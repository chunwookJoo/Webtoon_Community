import React from 'react';

const WebtoonImage = ({ img, title }) => {
	return <img src={img} alt={title} className="thumbnail" />;
};

export default WebtoonImage;
