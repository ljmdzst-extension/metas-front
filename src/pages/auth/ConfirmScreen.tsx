import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAlert from '@/hooks/useAlert';
import LoadingSpinner from '@/components/Spinner/LoadingSpinner';

const ConfirmScreen = () => {
	const [isLoading, setIsLoading] = useState(true);

	const { validationString } = useParams();
	const { errorAlert } = useAlert();

	const navigate = useNavigate();

	useEffect(() => {
		const emailConfirm = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL_AUTH}/validar/${validationString}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);

				if (response.status === 200) {
					Swal.fire({
						title: 'Éxito!',
						text: 'Usuario validado correctamente',
						icon: 'success',
						confirmButtonText: 'Ok',
					});
					navigate('/login');
				} else {
					const data = await response.json(); // Parsear la respuesta JSON
					throw new Error(data.error || 'No se pudo validar el usuario');
				}
			} catch (error: any) {
				errorAlert(
					error.message || 'Ocurrió un error al validar el usuario, contacte al administrador',
				);
				navigate('/register');
			} finally {
				setIsLoading(false);
			}
		};

		emailConfirm();
	}, [validationString, navigate]);

	return (
		<div className=' d-flex justify-content-center py-5'>
			{isLoading ? <LoadingSpinner /> : <></>}
		</div>
	);
};

export default ConfirmScreen;
