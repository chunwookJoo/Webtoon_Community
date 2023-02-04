// npm package
import React from "react";

// api
// design library (mantine)
import { showNotification } from "@mantine/notifications";

// recoil
import { useRecoilState } from "recoil";
import { createBoardModalState } from "../../store/recoilModalState";

// components
import CreateBoardModal from "../modal/CreateBoardModal";

// hooks
// icon
import { IconPencil } from "@tabler/icons";
import "../../assets/scss/components/board/createBoard.scss";

const CreateBoardButton = () => {
	const [createBoardOpen, setCreateBoardOpen] = useRecoilState(
		createBoardModalState,
	);

	const modalHandler = () => {
		if (localStorage.getItem("userId") === null) {
			showNotification({
				message: "로그인을 먼저 해주세요.",
				autoClose: 1500,
				radius: "md",
				color: "yellow",
			});
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
