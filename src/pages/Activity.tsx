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
import { Col, Container, Row } from 'react-bootstrap';

import formData from './../mock/activityFormData.json';
import Swal from 'sweetalert2';
import { ArrowBack } from '@mui/icons-material';

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
			.post('http://168.197.50.94:4005/metas/v2/actividad', data)
			.then(() => {
				mostrarActividades();
			})
			.catch((error) => console.log(error));
	};

	const getArea = () => {
		const localArea = localStorage.getItem('currentArea');
		if (localArea && JSON.parse(localArea).idArea === parseInt(idArea ?? '0', 10)) {
			setArea(JSON.parse(localArea));
		} else {
			navigation('/');
		}
	};

	useEffect(() => {
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
			.get(`http://168.197.50.94:4005/metas/v2/areas/${idArea}/actividades`)
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
			
				<div className=' d-flex w-100 justify-content-between border-bottom border-2 m-0 p-2 pb-0 '>
					<h2>{area?.nom}</h2>
					<ArrowBack
						fontSize='large'
						className={` m-1 ${isPlanificationOpen ? 'd-none' : ''}`}
						onClick={() => {
							navigation('/');
						}}
					/>
				</div>
			

			<div className=' h-100   '>
				<Row className=' d-flex ' style={{ height: '80%' }}>
					{!isPlanificationOpen ? (
						<Col
							sm={3}
							className=' position-relative h-100 d-flex flex-column border-end border-2 '
						>
							<Button
								variant='outline-success'
								style={{ position: 'absolute', bottom: '10px', right: '10px' }}
								onClick={handleShow}
							>
								Agregar Actividad
							</Button>
							<h4 className=' text-center m-2'>Listado de Actividades</h4>
							<ListGroup>
								{arrayActivity.map((item, index) => (
									<ListGroup.Item
										action
										variant='secondary'
										title={item.desc}
										style={{
											width: '100%',
											borderRadius: '10px',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											margin: '5px',
											cursor: 'pointer',
										}}
										key={index}
										onClick={() => {
											if (isPlanificationOpen === true) {
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
						</Col>
					) : (
						<Col
							sm={3}
							className=' position-relative h-100 d-flex flex-column border-end border-2 '
						>
							<h4 className=' text-center m-2'>Formulario</h4>
							<ListGroup>
								{formData.map((item, index) => (
									<ListGroup.Item
										action
										variant={currentFormSelected === item.index ? 'primary' : 'secondary'}
										title={item.Title}
										style={{
											width: '100%',
											borderRadius: '10px',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											margin: '5px',
											cursor: 'pointer',
										}}
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
					{!isPlanificationOpen && (
						<Col sm={9}>
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

					{isPlanificationOpen && (
						<Col sm={9} className=' mt-2'>
							<PlanificationPanel
								name={nameActivity}
								closePlanification={closePlanification}
								currentFormSelected={currentFormSelected}
								cleanFormSelected={cleanFormSelected}
							/>
						</Col>
					)}
				</Row>
			</div>
		</>
	);
}
