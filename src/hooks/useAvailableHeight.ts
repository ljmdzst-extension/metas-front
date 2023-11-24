import { useEffect, useMemo, useState } from 'react';

const useAvailableHeight = () => {
	const [availableHeight, setAvailableHeight] = useState<number>(0);
	const [currentBreakpoint, setCurrentBreakpoint] = useState<number>(0);
	const breakpoints = useMemo(() => [0, 768, 1024, 1280], []);

	const getAvailableHeight = () => {
		const header = document.getElementById('header');
		const headerHeight = header?.clientHeight;
		const windowHeight = window.innerHeight;
		const availableHeight = windowHeight - headerHeight!;
		return availableHeight;
	};

	useEffect(() => {
		const handleResize = () => {
			const windowsWidth = window.innerWidth;
			const newBP = breakpoints.find((bp) => bp > windowsWidth);
			if (newBP !== currentBreakpoint) {
				setCurrentBreakpoint(newBP!);
				setAvailableHeight(getAvailableHeight());
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		console.log('useAvailableHeight');

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [breakpoints, currentBreakpoint, setAvailableHeight]);

	return availableHeight;
};

export default useAvailableHeight;
