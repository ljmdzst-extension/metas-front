import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface SweetAlertOptions {
  [key: string]: any;
}

interface AlertOptions extends SweetAlertOptions {
  message?: string;
  title?: string;
}

const useAlert = (globalOptions?: SweetAlertOptions) => {
  const navigate = useNavigate();

  // Opciones comunes para todas las alertas, que se pueden extender
  const baseOptions: SweetAlertOptions = {
    confirmButtonText: 'Ok',
    ...globalOptions, // Permitir la extensión de opciones globales
  };

  // Función genérica para cualquier tipo de alerta
  const showAlert = (options: AlertOptions) => {
    const { message, title, ...rest } = options;
    return Swal.fire({
      title: title || '', // Título personalizado o vacío si no se pasa
      text: message, // Mensaje dinámico
      ...baseOptions,
      ...rest, // Extiende con otras opciones pasadas
    });
  };

  // Alerta de éxito
  const successAlert = (message: string, title?: string, extraOptions?: SweetAlertOptions) => {
    return showAlert({
      icon: 'success',
      title: title || '¡Éxito!',
      message,
      ...extraOptions, // Permitir añadir opciones adicionales
    });
  };

  // Alerta de error
  const errorAlert = (message: string, title?: string, extraOptions?: SweetAlertOptions) => {
    return showAlert({
      icon: 'error',
      title: title || '¡Operación Cancelada!',
      message: message || '¡Hemos encontrado un error!',
      ...extraOptions,
    }).then((result) => {
      if (message === 'Sesión de usuario expirada.') {
        localStorage.clear();
        navigate('/login');
      }
      return result; // Devuelve el resultado de Swal para manejar promesas
    });
  };

  return { successAlert, errorAlert };
};

export default useAlert;
