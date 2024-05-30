import React, { useState, useEffect, useCallback } from 'react';
import PlanificationPanel from '../components/PlanificationPanel';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CargarDatosActividadAction } from '../redux/actions/activityAction';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Col, Row, Spinner } from 'react-bootstrap';

import formData from './../mock/activityFormData.json';
import Swal from 'sweetalert2';
import { ArrowBack } from '@mui/icons-material';
import { getBases } from '../redux/actions/metasActions';
import { Actividad } from '../types/ActivityProps';
import useAlert from '../hooks/useAlert';
import { SET_HAY_CAMBIOS } from '../redux/reducers/ActivityReducer';

interface Activity {
	idActividad: number;
	desc: string;
}

interface Area {
	idArea: number;
	nom: string;
	listaActividades: Actividad[]; // Reemplaza esto con el tipo correcto si es necesario
	anio: string;
}

export default function Activity() {
	const initialAreaValue: Area = localStorage.getItem('currentArea')
		? (JSON.parse(localStorage.getItem('currentArea')!) as Area) // Usamos ! para decirle a TypeScript que estamos seguros de que localStorage.getItem('currentArea') no será null
		: { idArea: 0, nom: '', listaActividades: [], anio: '' }; // O proporciona un valor predeterminado adecuado para el tipo Area

	const [show, setShow] = useState(false);
	const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);
	const [show2, setShow2] = useState(false);
	const [term, setTerm] = useState('');
	const [nameActivity, setNameActivity] = useState('');
	const [nameActivityAux, setNameActivityAux] = useState('');
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);
	const handleShow2 = () => setShow2(true);
	const [arrayActivity, setArrayActivity] = useState<Activity[]>([]);
	const [isLoadingArrayActivity, setIsLoadingArrayActivity] = useState<boolean>(true);
	const [isPlanificationOpen, setIsPlanificationOpen] = useState(false);
	const [area, setArea] = useState<Area>(initialAreaValue);
	const [currentFormSelected, setCurrentFormSelected] = useState('');

	const navigation = useNavigate();
	const { errorAlert } = useAlert();
	const location = useLocation();

	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, hayCambios } = useSelector((state: RootState) => state.actividadSlice);
	const { token } = useSelector((state: RootState) => state.authSlice);

	useEffect(() => {
		try {
			const areaString = localStorage.getItem('currentArea');
			if (areaString) {
				setArea(JSON.parse(areaString));
				// console.log('Actualizando area' + areaString);
			}
		} catch (error) {
			console.error('Error parsing area from localStorage:', error);
		}
	}, []);

	useEffect(() => {
		const dispachBases = async () => {
			const action = await dispatch(getBases({ token }));
			if (getBases.rejected.match(action)) {
				const { error } = action.payload as { error: string };
				errorAlert(error);
			}
		};
		dispachBases();
	}, [dispatch, token]);

	interface Data {
		idActividad: 0;
		idArea: number;
		nro: number;
		desc: string;
		fechaDesde: string | null;
		fechaHasta: string | null;
	}

	const postActivity = useCallback(
		async (data: Data) => {
			axios
				.post(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad`, data, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.catch((error) => console.log(error));
		},
		[token],
	);

	const mostrarActividades = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_BASE_URL_METAS}/areas/${area.idArea}/actividades/${area.anio}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const actividades = response.data;
			setArrayActivity(actividades.data);
			setIsLoadingArrayActivity(false);
		} catch (error) {
			setIsLoadingArrayActivity(false);

			if (axios.isAxiosError(error)) {
				// Manejar errores de Axios
				if (error.response) {
					// La solicitud fue hecha y el servidor respondió con un código de estado
					// que está fuera del rango de 2xx
					const errorMessage = error.response.data?.error || error.response.statusText;
					console.error('Error al realizar la solicitud GET:', errorMessage);
					errorAlert('Error al realizar la petición: ' + errorMessage);
				} else if (error.request) {
					// La solicitud fue hecha pero no se recibió respuesta
					console.error('No se recibió respuesta del servidor:', error.request);
					errorAlert('No se recibió respuesta del servidor.');
				} else {
					// Algo sucedió en la configuración de la solicitud que desencadenó un error
					console.error('Error en la configuración de la solicitud:', error.message);
					errorAlert('Error en la configuración de la solicitud: ' + error.message);
				}
			} else {
				// Manejar errores genéricos
				const errorMessage = (error as Error).message;
				console.error('Error desconocido:', errorMessage);
				errorAlert('Error desconocido: ' + errorMessage);
			}
		}
	}, [area.anio, area.idArea, token]);

	const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoadingModal(true);
		try {
			// Wait for postActivity to complete
			console.log('Crear actividad');
			await postActivity({
				idActividad: 0,
				idArea: area.idArea,
				nro: arrayActivity.length + 1,
				desc: term,
				fechaDesde: null,
				fechaHasta: null,
			});
			// Once the activity is created, update the activities list
			await mostrarActividades();
			setTerm('');
			setIsLoadingModal(false);
			handleClose();
		} catch (error) {
			console.error('Error al enviar la actividad:', error);
			// Handle the error appropriately, e.g., show a message to the user
		}
	};

	useEffect(() => {
		mostrarActividades(); // Call mostrarActividades on component mount
	}, [mostrarActividades]);

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

		if (!hayCambios) {
			dispatch(SET_HAY_CAMBIOS({ valor: false }));
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
				dispatch(SET_HAY_CAMBIOS({ valor: false }));
				setCurrentFormSelected(formName);
			}
		});
	};

	const cleanFormSelected = () => {
		setCurrentFormSelected('');
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Actividad</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={submitForm}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Ingrese la descripción de la actividad</Form.Label>
							<Form.Control
								type='nombre'
								placeholder='Descripción'
								autoFocus
								as='textarea'
								rows={2}
								style={{ resize: 'none' }}
								value={term}
								onChange={(e) => setTerm(e.target.value)}
							/>
						</Form.Group>
						<Button variant='success' type='submit' disabled={isLoadingModal}>
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
			<div className=' d-flex flex-column h-100'>
				<div
					className=' d-flex align-items-center justify-content-between border  rounded-3 p-1 pb-0 mx-2 my-1  '
					style={{ backgroundColor: '#fefefe' }}
				>
					<h3 className=' fw-bold' style={{ color: '#0a5d52' }}>
						{area?.nom}
					</h3>
					<ArrowBack
						fontSize='large'
						className={`rounded ${isPlanificationOpen ? 'd-none' : ''}`}
						style={{ background: '#0a5d52', color: 'white' }}
						onClick={() => {
							navigation('/gestion/metas');
						}}
					/>
				</div>

				<div className=' h-100 d-flex justify-content-around gap-1 mx-3'>
					{/* NOTE: SIDEBAR - LISTADO ACTIVIDADES - NAVEGACIÓN FORMS */}
					<Col
						sm={3}
						className={` d-flex flex-column border-end border-2 rounded-3 `}
						style={{ backgroundColor: '#fefefe' }}
					>
						{!isPlanificationOpen ? (
							<>
								{isLoadingArrayActivity ? (
									<div className=' d-flex justify-content-center mt-5'>
										<Spinner animation='border' role='status'>
											<span className='visually-hidden'>Loading...</span>
										</Spinner>
									</div>
								) : (
									<div className=' d-flex flex-column position-relative h-100'>
										<Button
											variant='outline-success'
											style={{ position: 'absolute', bottom: '.5rem', right: '1rem' }}
											onClick={handleShow}
										>
											Agregar Actividad
										</Button>
										<h4 className=' text-center m-2 '>Listado de Actividades</h4>
										<div
											className='custom-scrollbar me-1'
											style={{ maxHeight: '80%', overflow: 'auto' }}
										>
											<ListGroup className='mx-2'>
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
													</ListGroup.Item>
												))}
											</ListGroup>
										</div>
									</div>
								)}
							</>
						) : (
							<>
								{/* NOTE: NAVEGACION FORMULARIOS */}
								{isLoading ? (
									<></>
								) : (
									<>
										<h4 className=' text-center m-2'>Formulario</h4>
										<ListGroup className=' mx-2 '>
											{formData.map((item, index) => (
												<ListGroup.Item
													action
													variant={
														hayCambios && currentFormSelected === item.index
															? 'warning'
															: currentFormSelected === item.index
															? 'primary'
															: 'secondary'
													}
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
									</>
								)}
							</>
						)}
					</Col>
					{/* NOTE: VISTA AREA - BOTONES PRESUPUESTO */}
					<Col sm={9} className=' border-2 rounded-3' style={{ backgroundColor: '#fefefe' }}>
						{!isPlanificationOpen && (
							<Row>
								<Col className='MenuOptions'>
									{/* <div className='Options'>Carga de Presupuesto</div> */}
									<Button disabled>Carga de Presupuesto</Button>
								</Col>
								<Col className='MenuOptions'>
									<Link to={`${location.pathname}/resumen`} style={{ textDecoration: 'none' }}>
										{/* <div className='Options'>Ver Resumen</div> */}
										<Button>Ver Resumen</Button>
									</Link>
								</Col>
							</Row>
						)}

						{isPlanificationOpen && (
							<PlanificationPanel
								name={nameActivity}
								closePlanification={closePlanification}
								currentFormSelected={currentFormSelected}
								cleanFormSelected={cleanFormSelected}
							/>
						)}
					</Col>
				</div>
			</div>
		</>
	);
}
