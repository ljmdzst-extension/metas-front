import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
	return (
		<div className=' d-flex flex-column justify-content-center align-items-center w-100 h-100'>
			<Spinner animation='border' role='output'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
};

export default LoadingSpinner;
