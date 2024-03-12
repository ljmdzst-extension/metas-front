import Swal from 'sweetalert2';

export const successAlert = (message: string) => {
	Swal.fire({
		icon: 'success',
		text: message,
	});
};

export const errorAlert = (message: string) => {
	Swal.fire({
		icon: 'error',
		title: '¡Operacion Cancelada!',
		text: message || '¡Hemos encontrado un error!',
	});
};
