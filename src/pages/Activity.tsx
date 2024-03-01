import React, { useState, useEffect } from 'react';
import PlanificationPanel from '../components/PlanificationPanel';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { CargarDatosActividadAction } from '../redux/actions/activityAction';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Col, Row } from 'react-bootstrap';

import formData from './../mock/activityFormData.json';
import Swal from 'sweetalert2';
import { ArrowBack, Visibility } from '@mui/icons-material';
import ActivityDetail from '../components/metas/ActivityDetail';

interface Activity {
	idActividad: number;
	desc: string;
}

interface Area {
	idArea: number;
	nom: string;
	listaActividades: any[]; // Reemplaza esto con el tipo correcto si es necesario
}

export default function Activity() {
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [term, setTerm] = useState('');
	const [nameActivity, setNameActivity] = useState('');
	const [nameActivityAux, setNameActivityAux] = useState('');
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);
	const handleShow2 = () => setShow2(true);
	const [arrayActivity, setArrayActivity] = useState<Activity[]>([]);
	const [isPlanificationOpen, setIsPlanificationOpen] = useState(false);
	const { idArea } = useParams<{ idArea?: string }>();
	const [area, setArea] = useState<Area | null>(null);
	const [currentFormSelected, setCurrentFormSelected] = useState('');

	const [currentActivitySelected, setCurrentActivitySelected] = useState<null | number>();

	const navigation = useNavigate();

	interface Data {
		idActividad: 0;
		idArea: number;
		nro: number;
		desc: string;
		fechaDesde: string | null;
		fechaHasta: string | null;
	}

	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		mostrarActividades();
	}, []);

	const postActivity = async function (data: Data) {
		axios
			.post(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad`, data)
			.then(() => {
				mostrarActividades();
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		const getArea = () => {
			const localArea = localStorage.getItem('currentArea');
			if (localArea && JSON.parse(localArea).idArea === parseInt(idArea ?? '0', 10)) {
				setArea(JSON.parse(localArea));
			} else {
				navigation('/gestion/metas');
			}
		};
		getArea();
	}, []);

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		postActivity({
			idActividad: 0,
			idArea: parseInt(idArea ?? '0', 10),
			nro: arrayActivity.length + 1,
			desc: term,
			fechaDesde: null,
			fechaHasta: null,
		});
		handleClose();
		setTerm('');
	};

	const mostrarActividades = async function () {
		axios
			.get(`${import.meta.env.VITE_API_BASE_URL_METAS}/areas/${idArea}/actividades`)
			.then((response) => {
				const actividades = response.data;
				setArrayActivity(actividades.data);
			})
			.catch((error) => {
				console.error('Error al realizar la solicitud GET:', error);
			});
	};

	const handleButtonClick = (id: number) => {
		dispatch(CargarDatosActividadAction(id));
	};

	const closePlanification = () => {
		setIsPlanificationOpen(!isPlanificationOpen);
	};

	const selectCurrentForm = (formName: string) => {
		if (currentFormSelected === '') {
			setCurrentFormSelected(formName);
			return;
		}

		Swal.fire({
			title: '¿Estás seguro?',
			text: 'Se perderán los cambios no guardados',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, cambiar',
			cancelButtonText: 'No, cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				setCurrentFormSelected(formName);
			}
		});
	};

	const cleanFormSelected = () => {
		setCurrentFormSelected('');
	};

	const handleDetailSelected = () => {};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Actividad</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={submitForm}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Ingrese la descripcion de la actividad</Form.Label>
							<Form.Control
								type='nombre'
								placeholder='Descripcion'
								autoFocus
								as='textarea'
								rows={2}
								style={{ resize: 'none' }}
								value={term}
								onChange={(e) => setTerm(e.target.value)}
							/>
						</Form.Group>
						<Button variant='success' type='submit'>
							Crear
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
			<Modal show={show2} onHide={handleClose2} name={nameActivityAux}>
				<Modal.Header closeButton>
					<Modal.Title>¿Quieres salir de la Actividad?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>¿Confirma que desea salir de la actividad?</Form.Label>
							<Form.Label>Los cambios no guardados se perderán. </Form.Label>
						</Form.Group>
						<Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant='danger' onClick={handleClose2}>
								Cancelar
							</Button>
							<Button
								variant='success'
								onClick={() => {
									setIsPlanificationOpen(!isPlanificationOpen);
									handleClose2();
								}}
							>
								Salir de la actividad
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>

			<div className=' d-flex justify-content-between border border-2 rounded-3 m-0 p-2 pb-0 mx-2 my-1 bg-white '>
				<h2 className=' fw-bold' style={{ color: '#0a5d52' }}>
					{area?.nom}
				</h2>
				<ArrowBack
					fontSize='large'
					className={` m-1 rounded ${isPlanificationOpen ? 'd-none' : ''}`}
					style={{ background: '#0a5d52', color: 'white' }}
					onClick={() => {
						navigation('/gestion/metas');
					}}
				/>
			</div>

			<div className=' d-flex justify-content-around gap-2  mx-3  ' style={{ height: '80%' }}>
				{/* NOTE: SIDEBAR - LISTADO ACTIVIDADES - NAVEGACIÓN FORMS */}
				{!isPlanificationOpen ? (
					<Col
						sm={3}
						className=' position-relative h-100 d-flex flex-column border-end border-2 bg-white rounded-3 '
					>
						<Button
							variant='outline-success'
							style={{ position: 'absolute', bottom: '10px', right: '10px' }}
							onClick={handleShow}
						>
							Agregar Actividad
						</Button>
						<h4 className=' text-center m-2 '>Listado de Actividades</h4>
						<div className='custom-scrollbar me-1' style={{ maxHeight: '80%', overflow: 'auto' }}>
							<ListGroup className='mx-2 custom-scrollbar'>
								{arrayActivity.map((item, index) => (
									<ListGroup.Item
										action
										variant='secondary'
										title={item.desc}
										className='mx-auto my-1 rounded d-flex align-items-center '
										key={index}
										onClick={() => {
											if (isPlanificationOpen) {
												handleShow2();
												setNameActivityAux(`${item.desc}`);
											} else {
												setIsPlanificationOpen(!isPlanificationOpen);
												setNameActivity(`${item.desc}`);
												handleButtonClick(item.idActividad);
												setCurrentActivitySelected(null);
											}
										}}
									>
										<span
											style={{
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												fontWeight: 'normal',
												whiteSpace: 'nowrap',
											}}
										>
											{item.desc}
										</span>
										<div
											className=' ms-auto mt-0 h-100 cursor-pointer visibility-icon'
											onClick={(event) => {
												event.stopPropagation();
												console.log(item.idActividad);
												setCurrentActivitySelected(item.idActividad);
												handleButtonClick(item.idActividad);
											}}
											title='Ver Detalle'
										>
											<Visibility />
										</div>
									</ListGroup.Item>
								))}
							</ListGroup>
						</div>
					</Col>
				) : (
					<Col
						sm={3}
						className=' position-relative h-100 d-flex flex-column border-end border-2 rounded-3 bg-white  '
					>
						{/* NOTE: NAVEGACION FORMULARIOS */}
						<h4 className=' text-center m-2'>Formulario</h4>
						<ListGroup className=' mx-2 '>
							{formData.map((item, index) => (
								<ListGroup.Item
									action
									variant={currentFormSelected === item.index ? 'primary' : 'secondary'}
									title={item.Title}
									className='text-break mx-auto my-1 rounded d-flex justify-content-center align-items-center '
									key={index}
									onClick={() => {
										selectCurrentForm(item.index);
									}}
								>
									<span
										style={{
											textOverflow: 'ellipsis',
											overflow: 'hidden',
											fontWeight: 'normal',
											whiteSpace: 'nowrap',
										}}
									>
										{item.Title}
									</span>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
				)}
				{/* NOTE: VISTA AREA - BOTONES PRESUPUESTO */}
				{!isPlanificationOpen && !currentActivitySelected && (
					<Col sm={9} className=' bg-white border-2 rounded-3 bg-white'>
						<Row>
							<Col className='MenuOptions'>
								<div className='Options'>Carga de Presupuesto</div>
							</Col>
							<Col className='MenuOptions'>
								<div className='Options'>Ver Resumen y Gráficos</div>
							</Col>
						</Row>
					</Col>
				)}

				{currentActivitySelected && (
					<Col sm={9} className='border-2 bg-white rounded-3'>
						<ActivityDetail idActivity={currentActivitySelected} />
					</Col>
				)}

				{isPlanificationOpen && (
					<Col sm={9} className='border-2 bg-white rounded-3'>
						<PlanificationPanel
							name={nameActivity}
							closePlanification={closePlanification}
							currentFormSelected={currentFormSelected}
							cleanFormSelected={cleanFormSelected}
						/>
					</Col>
				)}
			</div>
		</>
	);
}
