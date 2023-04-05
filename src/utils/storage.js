const getLocalStorage = (key) => {
	try {
		return localStorage.getItem(key);
	} catch (error) {
		console.log(error);
	}
};

const setLocalStorage = (key, value) => {
	try {
		localStorage.setItem(key, value);
	} catch (error) {
		console.log(error);
	}
};

const removeLocalStorage = (key) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.log(error);
	}
};

export { getLocalStorage, removeLocalStorage, setLocalStorage };
