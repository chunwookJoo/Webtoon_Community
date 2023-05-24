import { Skeleton } from '@mantine/core';
import React from 'react';

const SkeletonLoading = () => {
	return (
		<Skeleton
			height={200}
			style={{
				width: '33%',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: '50',
			}}
		/>
	);
};

export default SkeletonLoading;
