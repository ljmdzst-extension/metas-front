import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';

const Confirm = () => {
	const [isLoading, setIsLoading] = useState(true);

	const { validationString } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const emailConfirm = async () => {
			try {
				const response = await fetch(
					`http://168.197.50.94:4006/api/v2/usr/validar/${validationString}`,
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
					console.log(data);
					throw new Error(data.error || 'No se pudo validar el usuario');
				}
			} catch (error: any) {
				Swal.fire({
					title: 'Error!',
					text:
						error.message || 'Ocurrió un error al validar el usuario, contacte al administrador',
					icon: 'error',
					confirmButtonText: 'Ok',
				});
				navigate('/register');
			} finally {
				setIsLoading(false);
			}
		};

		emailConfirm();
	}, [validationString, navigate]);

	return (
		<div className=' d-flex justify-content-center py-5'>
			{isLoading ? <Spinner animation='border' variant='primary' /> : <></>}
		</div>
	);
};

export default Confirm;
