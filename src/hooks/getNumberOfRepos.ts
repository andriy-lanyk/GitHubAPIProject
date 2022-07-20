import { useState, useEffect } from 'react';

const useNumberOfRepos = (value: string) => {
	const [numberOfRepo, setNumberOfRepo] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getNumber = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1)) + min;
	const delay = (value.length * 100) / 4;

	useEffect(() => {
		setIsLoading(true);
		const handler = setTimeout(() => {
			setNumberOfRepo(getNumber(1, 30));
			setIsLoading(false);
		}, delay);

		return () => {
			clearTimeout(handler);
			setIsLoading(false);
		};
	}, [value, delay]);

	return { numberOfRepo, isLoading };
};

export default useNumberOfRepos;
