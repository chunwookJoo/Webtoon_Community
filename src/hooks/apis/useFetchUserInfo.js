import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../../api/user';

const useFetchUserInfo = () => {
	return useQuery(['userInfo'], () => getUserInfo(), { staleTime: 2000 });
};

export default useFetchUserInfo;
