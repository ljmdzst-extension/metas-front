import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';

interface FormPIEProps {
	onClose: () => void;
}

interface Objetivo {
	idObjetivo: number;
	detalle: string;
	nom: string;
	tipoObjetivo: {
		idTipoObj: number;
		nom: string;
	};
}

export default function FormPIE({ onClose }: FormPIEProps) {
	const dispatch = useDispatch();
	const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
	const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<number[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://168.197.50.94:4005/metas/v2/bases/');
				if (response.data.ok) {
					const listaObjetivos = response.data.data.listaObjetivos;
					setObjetivos(listaObjetivos);
				} else {
					console.error('Error en la respuesta de la API');
				}
			} catch (error) {
				console.error('Error al obtener la lista de objetivos:', error);
			}
		};
		fetchData();
	}, []);

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
	const sincronizarCheckboxes = () => {
		if (estadoActualizado.listaObjetivos) {
			setObjetivosSeleccionados(estadoActualizado.listaObjetivos);
		}
	};

	useEffect(() => {
		sincronizarCheckboxes();
	}, [estadoActualizado.listaObjetivos]);

	return (
		<div className=' d-flex flex-column'>
			<div className='FormPie'>
				<div></div>
				<p>
					{' '}
					Referencia:
					<a
						href='https://www.unl.edu.ar/pie/wp-content/uploads/sites/55/2021/02/Plan-Institucional-Estrat%C3%A9gico.pdf'
						target='_blank'
						rel='noopener noreferrer'
					>
						Plan Institucional Estratégico
					</a>{' '}
				</p>
				<div className='ConteinerEje'>
					<h2 className='TitlePie'>Ejes Transversales</h2>
					<Form className='FormEje'>
						<p className='SubtitlePie'>
							<span>Seleccione los ejes:</span>
						</p>
						<div className='Eje'>
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
					<h2 className='TitlePie'>Plan Institucional</h2>
					<Form className='FormPlan'>
						<p className='SubtitlePie'>
							<span>Seleccione los planes:</span>
						</p>
						<div className='ConteinerChecksPlan'>
							<div className='Lie'>
								{objetivosDesde5a9.map((objetivo) => (
									<Form.Check
										id={objetivo.idObjetivo.toString()}
										title={objetivo.detalle}
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
										title={objetivo.detalle}
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
										title={objetivo.detalle}
										key={objetivo.idObjetivo}
										onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
										checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
									/>
								))}
							</div>
						</div>
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
					onClose();
				}}
			>
				Guardar Actividad
			</Button>
		</div>
	);
}
