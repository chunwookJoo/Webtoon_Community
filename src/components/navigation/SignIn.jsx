import { Modal } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { loginModalState } from '../../store/recoilModalState';
import OauthLogin from '../login/OauthLogin';
import WebtoonSearchButton from './WebtoonSearchButton';

const SignIn = () => {
	const { pathname } = useLocation();
	const [modalOpen, setModalOpen] = useRecoilState(loginModalState);
	const modalHandler = () => setModalOpen(!modalOpen);
	return (
		<>
			<div className="login-container">
				{pathname === '/webtoon' || pathname === '/board/detail' ? (
					''
				) : (
					<WebtoonSearchButton />
				)}
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
