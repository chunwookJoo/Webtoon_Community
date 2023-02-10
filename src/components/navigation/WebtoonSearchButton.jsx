import { IconSearch } from "@tabler/icons";
import { useRecoilState } from "recoil";
import { searchModalState } from "../../store/recoilModalState";
import { SearchModal } from "../ComponentIndex";

const WebtoonSearchButton = () => {
  const [modalOpen, setModalOpen] = useRecoilState(searchModalState);
  const modalHandler = () => setModalOpen(!modalOpen);

  return (
    <>
      <span className="search" onClick={modalHandler}>
        검색 &nbsp;
        <IconSearch width="20px" height="20px" />
      </span>
      <SearchModal isOpen={modalOpen} toggle={modalHandler} />
    </>
  );
};

export default WebtoonSearchButton;
