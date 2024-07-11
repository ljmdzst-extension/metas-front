import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAlert from '@/hooks/useAlert';
import LoadingSpinner from '@/components/Spinner/LoadingSpinner';
import { validateEmail } from '@/services';

const ConfirmScreen = () => {
	const [isLoading, setIsLoading] = useState(true);

	const { validationString } = useParams();
	const { errorAlert } = useAlert();

	const navigate = useNavigate();

	useEffect(() => {
		if (!validationString) {
			navigate('/register');
		} else {
			validateEmail(validationString)
				.then(() => {
					Swal.fire({
						title: 'Éxito!',
						text: 'Usuario validado correctamente',
						icon: 'success',
						confirmButtonText: 'Ok',
					});
					navigate('/login');
				})
				.catch((error) => {
					errorAlert(error);
					navigate('/register');
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [validationString, navigate]);

	return (
		<div className=' d-flex justify-content-center py-5'>
			{isLoading ? <LoadingSpinner /> : <></>}
		</div>
	);
};

export default ConfirmScreen;
