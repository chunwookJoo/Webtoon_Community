import { showNotification } from '@mantine/notifications';

/**
 *
 * @param {*} message 응답 메세지
 * @param {*} resultState 응답 상태 (success = green, warning = yellow, fail = red)
 */
const showToast = (message, resultState) => {
	return showNotification({
		message,
		autoClose: 2000,
		radius: 'md',
		color: resultState,
	});
};

export default showToast;
