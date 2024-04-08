import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import { ListaObjetivo } from '../../types/BasesProps';

export default function FormPIE() {
	const dispatch = useDispatch();
	const [objetivos, setObjetivos] = useState<ListaObjetivo[]>([]);
	const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<number[]>([]);
	const { bases, error } = useSelector((state: RootState) => state.metasSlice);

	useEffect(() => {
		if (!error && bases) {
			setObjetivos(bases.listaObjetivos);
		} else {
			// TODO: Alerta de error global
		}
	}, [bases, error]);

	const handleSeleccionarObjetivo = (idObjetivo: number) => {
		const objetivoIndex = objetivosSeleccionados.indexOf(idObjetivo);
		if (objetivoIndex === -1) {
			setObjetivosSeleccionados([...objetivosSeleccionados, idObjetivo]);
		} else {
			const newSeleccionados = objetivosSeleccionados.filter((id) => id !== idObjetivo);
			setObjetivosSeleccionados(newSeleccionados);
		}
	};

	const objetivosDesde21a24 = objetivos?.slice(19, 22);
	const objetivosDesde5a9 = objetivos?.slice(4, 9);
	const objetivosDesde10a15 = objetivos?.slice(9, 14);
	const objetivosDesde16a20 = objetivos?.slice(14, 19);

	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	useEffect(() => {
		const sincronizarCheckboxes = () => {
			setObjetivosSeleccionados(estadoActualizado?.listaObjetivos ?? []);
		};
		sincronizarCheckboxes();
	}, [estadoActualizado.listaObjetivos]);

	return (
		<div className=' d-flex flex-column'>
			<div className='FormPie'>
				<p className=' px-2 text-end w-100 fst-italic'>
					Referencia:{' '}
					<a
						href='https://www.unl.edu.ar/pie/wp-content/uploads/sites/55/2021/02/Plan-Institucional-Estrat%C3%A9gico.pdf'
						target='_blank'
						rel='noopener noreferrer'
						className=' text-decoration-underline'
					>
						Plan Institucional Estratégico
					</a>
				</p>
				<div className='ConteinerEje'>
					<h4 className='TitlePie'>Ejes Transversales</h4>
					<Form className='FormEje'>
						{/* <p className='SubtitlePie'>
							<span>Seleccione los ejes:</span>
						</p> */}
						<div className='Eje mt-2'>
							{objetivosDesde21a24.map((objetivo) => (
								<Form.Check
									id={objetivo.idObjetivo.toString()}
									label={objetivo.nom}
									key={objetivo.idObjetivo}
									onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
									checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
								/>
							))}
						</div>
					</Form>
				</div>
				<div className='ConteinerPlan'>
					<h4 className='TitlePie'>Plan Institucional</h4>
					<Form className='FormPlan'>
						{/* <p className='SubtitlePie'>
							<span>Seleccione los planes:</span>
						</p> */}
						<div className='ConteinerChecksPlan mt-2'>
							<div className='Lie'>
								{objetivosDesde5a9.map((objetivo) => (
									<Form.Check
										id={objetivo.idObjetivo.toString()}
										title={objetivo.detalle ?? undefined}
										label={objetivo.nom}
										key={objetivo.idObjetivo}
										onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
										checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
									/>
								))}
							</div>
							<div className='Lie'>
								{objetivosDesde10a15.map((objetivo) => (
									<Form.Check
										id={objetivo.idObjetivo.toString()}
										label={objetivo.nom}
										title={objetivo.detalle ?? undefined}
										key={objetivo.idObjetivo}
										onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
										checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
									/>
								))}
							</div>
							<div className='Lie'>
								{objetivosDesde16a20.map((objetivo) => (
									<Form.Check
										id={objetivo.idObjetivo.toString()}
										label={objetivo.nom}
										title={objetivo.detalle ?? undefined}
										key={objetivo.idObjetivo}
										onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
										checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
									/>
								))}
							</div>
						</div>
						<p className=' mt-2 text-end w-100 fst-italic text-guide'>
							*Deje el puntero sobre cada objetivo para ver el detalle
						</p>
					</Form>
				</div>
			</div>
			<Button
				variant='success'
				className='Save align-self-center my-2'
				onClick={() => {
					guardarActividad(
						{
							...estadoActualizado,
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
