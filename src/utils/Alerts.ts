import Swal from 'sweetalert2';

export const successAlert = (message: string) => {
	Swal.fire({
		icon: 'success',
		text: message,
		confirmButtonText: 'Ok',
	});

	return null;
};

export const errorAlert = (message: string) => {
	Swal.fire({
		icon: 'error',
		title: '¡Operación Cancelada!',
		text: message || '¡Hemos encontrado un error!',
		confirmButtonText: 'Ok',
	});
	if (message === 'Sesión de usuario expirada.') {
		console.log('Sesión de usuario expirada.');
		localStorage.clear();
		window.location.href = '/login';
	}

	return null;
};
