import { Skeleton } from '@mantine/core';

const SkeletonLoading = () => {
	const render = () => {
		const skeleton = [];
		for (let i = 0; i < 18; i++) {
			skeleton.push(
				<li className="webtoon-link-wrap" key={i}>
					<Skeleton height={200} />
				</li>,
			);
		}
		return skeleton;
	};
	return <>{render()}</>;
	// return (
	// 	<Skeleton
	// 		height={200}
	// 		style={{
	// 			width: '33%',
	// 			position: 'absolute',
	// 			top: '50%',
	// 			left: '50%',
	// 			transform: 'translate(-50%, -50%)',
	// 			zIndex: '50',
	// 		}}
	// 	/>
	// );
};

export default SkeletonLoading;
