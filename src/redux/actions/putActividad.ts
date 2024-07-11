import { AppDispatch } from '../store';
import { cargarDatosActividad } from './activityAction';
import { errorAlert, successAlert } from '@/utils/Alerts';
import { putActivity } from '@/services/api/private/metas';
import { Actividad } from '@/types/ActivityProps';

export const guardarActividad = (dato: Actividad, dispatch: AppDispatch) => {
	putActivity(dato)
		.then((data) => {
			data.ok ? successAlert('Actividad guardada') : errorAlert(`Error al guardar: ${data.error}`);
			dispatch(cargarDatosActividad(dato.idActividad));
			return null;
		})
		.catch((error) => errorAlert(JSON.stringify(error)));
};
