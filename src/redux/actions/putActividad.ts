import { AppDispatch } from '../store';
import { CargarDatosActividadAction } from './activityAction';
import Swal from 'sweetalert2';

export const guardarActividad = (dato: any, dispatch: AppDispatch) => {
	fetch('http://168.197.50.94:4005/api/v2/metas/actividad', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dato),
	})
		.then((resp) => resp.json())
		.then((data) => {
			data.ok
				? Swal.fire({
            icon: 'success',
            title: 'Actividad guardada',
            showConfirmButton: false,
            timer: 1500,
        })
				: Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            showConfirmButton: false,
            timer: 1500,
        });
			dispatch(CargarDatosActividadAction(dato.idActividad));
		})
		.catch((error) => alert(JSON.stringify(error)));
};
