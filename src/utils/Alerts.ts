import { redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

export const successAlert = (message: string) => {
	Swal.fire({
		icon: 'success',
		text: message,
		confirmButtonText: 'Ok',
	});
};

export const errorAlert = (message: string) => {
	Swal.fire({
		icon: 'error',
		title: '¡Operacion Cancelada!',
		text: message || '¡Hemos encontrado un error!',
		confirmButtonText: 'Ok',
	});

	if (message === 'Sesión de usuario expirada.') {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		redirect('/login');
	}
};
