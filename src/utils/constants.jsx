import { IconBook2, IconEdit, IconLogout } from '@tabler/icons';

// storage
export const LOGIN_TOKEN = 'login-token';
export const AUTH_TOKEN = 'auth-token';
export const USER_ID = 'userId';

// toast message
export const LOGIN_SUCCESS = '님, 환영해요! 🤗';
export const INFORM_LOGIN_WARNING = '로그인을 먼저 해주세요.';
export const LOGOUT_SUCCESS = '정상적으로 로그아웃되었어요.';

export const SIGNUP_SUCCESS = '정상적으로 회원가입되었어요.';
export const EMPTY_INPUT_WARNING = '모두 입력해주세요.';
export const NICKNAME_CHECK_WARNING = '닉네임 중복체크를 해주세요.';

export const CREATE_BOARD_SUCCESS = '후기가 정상적으로 작성되었어요.';
export const CREATE_COMMENT_SUCCESS = '댓글이 정상적으로 등록되었어요.';
export const EMPTY_COMMENT_WARNING = '댓글을 입력해주세요.';

export const SAVE_MYWEBTOON_SUCCESS = '마이웹툰에 저장했어요.';
export const ALREADY_EXISTS_MYWEBTOON_WARNING = '마이웹툰에 이미 존재해요.';
export const SAVE_MYWEBTOON_FAIL = '마이웹툰 저장에 실패했어요.';
export const REMOVE_MYWEBTOON_SUCCESS = '웹툰이 마이웹툰에서 삭제되었어요.';

export const UPDATE_PROFILE_SUCCESS = '프로필이 정상적으로 수정되었어요.';

export const ERROR_MESSAGE = '알 수 없는 에러입니다.';

export const AGE_RANGE = [
	{ value: '10~19', label: '10대' },
	{ value: '20~29', label: '20대' },
	{ value: '30~39', label: '30대' },
	{ value: '40~49', label: '40대' },
	{ value: '50~59', label: '50대' },
	{ value: '60~69', label: '60대' },
];

export const GENDER = [
	{ value: 'male', label: '남자' },
	{ value: 'female', label: '여자' },
];

export const AVATAR_ITEM = [
	{
		id: '1',
		icon: <IconBook2 size={16} />,
		name: '마이 웹툰',
		target: 'mywebtoon',
		className: '',
	},
	{
		id: '2',
		icon: <IconEdit size={16} />,
		name: '프로필 수정',
		target: 'userinfo',
		className: '',
	},
	{
		id: '3',
		icon: <IconLogout size={16} />,
		name: '로그아웃',
		target: 'logout',
		className: 'logout',
	},
];
