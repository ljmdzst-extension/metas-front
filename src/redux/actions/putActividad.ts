import { AppDispatch } from '../store';
import { CargarDatosActividadAction } from './activityAction';
import { errorAlert, successAlert } from '../../utils/Alerts';

export const guardarActividad = (dato: any, dispatch: AppDispatch) => {
	const token = localStorage.getItem('token');
	console.log(dato);
	fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(dato),
	})
		.then((resp) => resp.json())
		.then((data) => {
			data.ok ? successAlert('Actividad guardada') : errorAlert(`Error al guardar: ${data.error}`);
			dispatch(CargarDatosActividadAction(dato.idActividad));
		})
		.catch((error) => errorAlert(JSON.stringify(error)));
};
