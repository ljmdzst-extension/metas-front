import { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setHayCambios } from '@/redux/actions/activityAction'
import { ErrorOutline } from '@mui/icons-material';
import { useGuardarActividad } from '@/hooks/useGuardarActividad'

export default function FormObjetiveEst() {
	const { activity, hayCambios } = useSelector((state: RootState) => state.actividad);
	const { bases } = useSelector((state: RootState) => state.metas);
	const { guardarActividad } = useGuardarActividad();
	const dispatch = useDispatch();

	const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<number[]>(
		activity.listaObjetivos ?? [],
	);

	useEffect(() => {
		setObjetivosSeleccionados(activity.listaObjetivos ?? []);
	}, [activity.listaObjetivos]);

	const handleSeleccionarObjetivo = useCallback((idObjetivo: number) => {
		setObjetivosSeleccionados((prevSeleccionados) => {
			if (prevSeleccionados.includes(idObjetivo)) {
				// Si el objetivo ya está seleccionado, eliminarlo de la lista
				return prevSeleccionados.filter((id) => id !== idObjetivo);
			} else {
				// Si el objetivo no está seleccionado, agregarlo a la lista
				const index = prevSeleccionados.findIndex((id) => id > idObjetivo);
				if (index === -1) {
					// Si no se encontró ningún elemento mayor, agregar al final
					return [...prevSeleccionados, idObjetivo];
				} else {
					// Insertar en la posición correcta para mantener el orden
					return [
						...prevSeleccionados.slice(0, index),
						idObjetivo,
						...prevSeleccionados.slice(index),
					];
				}
			}
		});
	}, []);

	const checkForChanges = useCallback(() => {
		const cambios =
			JSON.stringify(activity.listaObjetivos ?? []) !== JSON.stringify(objetivosSeleccionados);
		console.log(activity.listaObjetivos, objetivosSeleccionados, cambios);
		dispatch(setHayCambios({ valor: cambios }));
	}, [activity.listaObjetivos, objetivosSeleccionados, dispatch]);

	useEffect(() => {
		checkForChanges();
	}, [objetivosSeleccionados, checkForChanges]);

	return (
		<div className='d-flex flex-column h-100'>
			<div className='FormObjetivo w-100'>
				<Form className='FormObj'>
					<p className='SubtitleObj'>
						<span>Seleccione el/los objetivo/s estratégico/s vinculado/s a la actividad :</span>
					</p>
					<div className='Obj'>
						{bases?.listaObjetivos?.slice(0, 4).map((objetivo) => (
							<Form.Check
								id={objetivo.idObjetivo.toString()}
								label={objetivo.nom}
								key={objetivo.idObjetivo}
								checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
								onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
							/>
						))}
					</div>
				</Form>
			</div>
			<Button
				variant='success'
				className='mt-auto mb-3 align-self-center'
				onClick={() => {
					guardarActividad(
						{
							...activity,
							listaObjetivos: objetivosSeleccionados,
						},
						dispatch,
					);
				}}
			>
				Guardar Actividad
				{hayCambios && <ErrorOutline style={{ marginLeft: '10px', color: 'yellow' }} />}
			</Button>
		</div>
	);
}
