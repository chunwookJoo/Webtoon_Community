import { useQuery } from '@tanstack/react-query';

import { getBoardList } from '../../api/board';

const useFetchBoardList = ({ pathname }) => {
	return useQuery([pathname], () => getBoardList(pathname));
};

export default useFetchBoardList;
