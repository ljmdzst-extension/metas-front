import { useEffect } from 'react';

const ResumenArea = () => {
	useEffect(() => {
		console.log('hola');
	}, []);

	return (
		<div className=' bg-white border-2 rounded-3 p-2 m-2'>
			LISTA.PNG
			{/* <div>{JSON.stringify(arrayActivity, null, 2)}</div> */}
			<div>lista.png</div>
		</div>
	);
};

export default ResumenArea;
