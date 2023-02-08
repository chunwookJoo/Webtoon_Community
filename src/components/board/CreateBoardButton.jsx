// npm package
import React from "react";

// api
// design library (mantine)

// recoil
import { useRecoilState } from "recoil";
import { createBoardModalState } from "../../store/recoilModalState";

// components
import CreateBoardModal from "../modal/CreateBoardModal";

// hooks
// icon
import { IconPencil } from "@tabler/icons";
import "../../assets/scss/components/board/createBoard.scss";

// utils
import { getLocalStorage } from "../../utils/storage";
import { INFORM_LOGIN_WARNING, USER_ID } from "../../utils/constants";
import showToast from "../../utils/toast";

const CreateBoardButton = () => {
  const [createBoardOpen, setCreateBoardOpen] = useRecoilState(createBoardModalState);

  const modalHandler = () => {
    if (getLocalStorage(USER_ID) === null) {
      showToast(INFORM_LOGIN_WARNING, "yellow");
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
