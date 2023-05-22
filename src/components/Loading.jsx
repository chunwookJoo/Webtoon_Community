/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { IconLoader2 } from '@tabler/icons';

const spinner = keyframes`
	0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = () => {
	return (
		<span
			style={{
				// display: 'flex',
				// justifyContent: 'center',
				// width: '100%',
				// margin: '5em 0',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
			<IconLoader2
				width="30px"
				height="30px"
				css={css({
					animation: `${spinner} 1s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
				})}
			/>
		</span>
	);
};

export default Loading;
