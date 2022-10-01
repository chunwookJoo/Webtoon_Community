import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const searchModalState = atom({
	key: "searchModalState",
	default: false,
});

export const loginModalState = atom({
	key: "loginModalState",
	default: false,
});

export const jwtTokenState = atom({
	key: "jwtTokenState",
	default: null,
});

export const userInfoState = atom({
	key: "userInfoState",
	default: null,
	effects_UNSTABLE: [persistAtom],
});
