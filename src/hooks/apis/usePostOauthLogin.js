import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { postOauthLogin } from '../../api/auth';
import { AUTH_TOKEN, LOGIN_SUCCESS, LOGIN_TOKEN } from '../../utils/constants';
import { setLocalStorage } from '../../utils/storage';
import showToast from '../../utils/toast';

const usePostOauthLogin = (postOauthLoginBody, platform) => {
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOauthLogin = async () => {
			const response = await postOauthLogin(postOauthLoginBody, platform);

			if (response.RESULT === 200) {
				setLocalStorage(AUTH_TOKEN, response.user.user.authToken);
				setLocalStorage(LOGIN_TOKEN, response.user.jwtToken);
				navigate('/');
				showToast(response.user.user.nickname + LOGIN_SUCCESS, 'green');
				return;
			} else if (response.RESULT === 401) {
				navigate(`/regist/${platform}`, {
					state: {
						data: response.user,
						platform,
					},
					replace: true,
				});
			}
		};

		fetchOauthLogin();
	}, []);
};

export default usePostOauthLogin;
