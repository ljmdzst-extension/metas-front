import { useEffect, useState } from 'react';

const useAvailableHeight = () => {
	const [availableHeight, setAvailableHeight] = useState<number>(0);
	const minHeight = 500; // Establece el mínimo de altura que deseas

	const getAvailableHeight = () => {
		const header = document.getElementById('header');
		const headerHeight = header?.clientHeight ?? 0;
		const windowHeight = window.innerHeight;
		const availableHeight = Math.max(windowHeight - headerHeight, minHeight);
		return availableHeight;
	};

	useEffect(() => {
		const handleResize = () => {
			setAvailableHeight(getAvailableHeight());
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return availableHeight;
};

export default useAvailableHeight;
