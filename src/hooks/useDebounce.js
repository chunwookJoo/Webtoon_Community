import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		console.log(debounceValue);
		const timer = setTimeout(() => setDebounceValue(value), delay || 500);
		return () => clearTimeout(timer);
	}, [value]);

	return debounceValue;
};

export default useDebounce;