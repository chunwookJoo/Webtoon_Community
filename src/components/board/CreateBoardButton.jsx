import '../../assets/scss/components/board/createBoard.scss';

import { IconPencil } from '@tabler/icons';
import React from 'react';
import { useRecoilState } from 'recoil';

import { createBoardModalState } from '../../store/recoilModalState';
import { INFORM_LOGIN_WARNING, USER_ID } from '../../utils/constants';
import { getLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';
import CreateBoardModal from '../modal/CreateBoardModal';

const CreateBoardButton = () => {
	const [createBoardOpen, setCreateBoardOpen] = useRecoilState(
		createBoardModalState,
	);

	const modalHandler = () => {
		if (getLocalStorage(USER_ID) === null) {
			showToast(INFORM_LOGIN_WARNING, 'yellow');
			return;
		} else {
			setCreateBoardOpen(!createBoardOpen);
		}
	};

	return (
		<div className="create-board-container">
			<div className="create-board-btn" onClick={modalHandler}>
				<IconPencil />
			</div>
			<CreateBoardModal isOpen={createBoardOpen} toggle={modalHandler} />
		</div>
	);
};

export default CreateBoardButton;
