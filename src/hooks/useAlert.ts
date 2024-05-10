import { useNavigate } from 'react-router-dom';
import Swal, { SweetAlertOptions } from 'sweetalert2';

const useAlert = () => {
	const navigate = useNavigate();

	const alertOptions: SweetAlertOptions = {
		confirmButtonText: 'Ok',
	};

	const successAlert = (message: string) =>
		Swal.fire({ ...alertOptions, icon: 'success', text: message });

	const errorAlert = (message: string) => {
		Swal.fire({ ...alertOptions, icon: 'error', title: '¡Operación Cancelada!', text: message || '¡Hemos encontrado un error!' });
		if (message === 'Sesión de usuario expirada.') {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			navigate('/login');
		}
	};
	return { successAlert, errorAlert };
};

export default useAlert;

