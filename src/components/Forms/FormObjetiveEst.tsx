import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';

interface Objetivo {
	idObjetivo: number;
	nom: string;
	tipoObjetivo: {
		idTipoObj: number;
		nom: string;
	};
}
export default function FormObjetiveEst() {
	const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
	const dispatch = useDispatch();
	const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<number[]>([]);
	const objetivosDesde0a4 = objetivos?.slice(0, 4);
	const { activity } = useSelector((state: RootState) => state.actividadSlice);
	const { bases, error } = useSelector((state: RootState) => state.metasSlice);

	useEffect(() => {
		if (!error && bases) {
			setObjetivos(bases.listaObjetivos);
		} else {
			// TODO: Alerta de error global
		}
	}, [bases, error]);

	const sincronizarCheckboxes = () => {
		if (activity.listaObjetivos) {
			setObjetivosSeleccionados(activity.listaObjetivos);
		}
	};
	useEffect(() => {
		sincronizarCheckboxes();
	}, [activity.listaObjetivos]);
	const handleSeleccionarObjetivo = (idObjetivo: number) => {
		const objetivoIndex = objetivosSeleccionados.indexOf(idObjetivo);
		if (objetivoIndex === -1) {
			setObjetivosSeleccionados([...objetivosSeleccionados, idObjetivo]);
		} else {
			const newSeleccionados = objetivosSeleccionados.filter((id) => id !== idObjetivo);
			setObjetivosSeleccionados(newSeleccionados);
		}
	};
	return (
		<div className=' d-flex flex-column w-100 '>
			<div className='FormObjetivo  w-100 '>
				<Form className='FormObj'>
					<p className='SubtitleObj'>
						<span>Seleccione el/los objetivo/s estratégico/s vinculado/s a la actividad :</span>
					</p>
					<div className='Obj'>
						{objetivosDesde0a4.map((objetivo) => (
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
				className="Save align-self-center m-4  '"
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
			</Button>
		</div>
	);
}
