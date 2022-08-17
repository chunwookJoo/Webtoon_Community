import { atom } from "recoil";

export const searchModalState = atom({
	key: "searchModalState",
	default: false,
});

export const loginModalState = atom({
	key: "loginModalState",
	default: false,
});
