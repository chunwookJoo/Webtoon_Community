import { IconPencil } from "@tabler/icons";
import React from "react";
import { useRecoilState } from "recoil";
import "../../assets/scss/components/board/createBoard.scss";
import { createBoardModalState } from "../../utils/atom";
import CreateBoard from "./CreateBoard";

const CreateBoardButton = () => {
	const [createBoardOpen, setCreateBoardOpen] = useRecoilState(
		createBoardModalState,
	);
	const modalHandler = () => setCreateBoardOpen(!createBoardOpen);

	return (
		<div className="create-board-container">
			<div className="create-board-btn" onClick={modalHandler}>
				<IconPencil />
			</div>
			<CreateBoard isOpen={createBoardOpen} toggle={modalHandler} />
		</div>
	);
};

export default CreateBoardButton;
