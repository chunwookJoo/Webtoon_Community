import { Modal } from '@mantine/core';
import { useRecoilState } from 'recoil';

import { loginModalState } from '../../store/recoilModalState';
import OauthLogin from '../login/OauthLogin';

const SignIn = () => {
	const [modalOpen, setModalOpen] = useRecoilState(loginModalState);
	const modalHandler = () => setModalOpen(!modalOpen);
	return (
		<>
			<div className="login-container">
				<span className="login-btn" onClick={modalHandler}>
					로그인
				</span>
			</div>
			<Modal
				size="sm"
				centered
				opened={modalOpen}
				onClose={modalHandler}
				title="로그인"
				className="login-modal-container">
				<OauthLogin />
			</Modal>
		</>
	);
};

export default SignIn;
