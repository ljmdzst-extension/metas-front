import { useEffect, useState } from 'react';
import FormDescriptionUbication from './Forms/FormDescriptionUbication';
import FormPIE from './Forms/FormPIE';
import FormArSecUU from './Forms/FormArSecUU';
import FormPeriodo from './Forms/FormPeriodo';
import FormObjetiveEst from './Forms/FormObjetiveEst';
import FormOrgInst from './Forms/FormOrgInst';
import FormMetas from './Forms/FormMetas';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import FormDocuments from './Forms/FormDocuments';
import { ArrowBack } from '@mui/icons-material';

type Props = {
	name: string;
	currentFormSelected: string;
	closePlanification: () => void;
	cleanFormSelected: () => void;
};

export default function PlanificationPanel({
	name,
	closePlanification,
	currentFormSelected,
	cleanFormSelected,
}: Props) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [indexForm, setIndexForm] = useState(String);
	const [show2, setShow2] = useState(false);
	const [term, setTerm] = useState(String);
	const [showCancel, setShowCancel] = useState(false);
	const [showSuspensionCancel, setShowSuspensionCancel] = useState(false);
	const [showEliminarActividad, setShowEliminarActividad] = useState(false);
	const [currentFormTitle, setCurrentFormTitle] = useState('' as string);

	const [motCancel, setMotCancel] = useState<string | null>(null);
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	useEffect(() => {
		setMotCancel(estadoActualizado?.motivoCancel);
	}, [estadoActualizado?.motivoCancel]);
	const handleCloseSuspensionCancel = () => {
		setShowSuspensionCancel(false);
	};
	const handleCloseEliminarActividad = () => {
		setShowEliminarActividad(false);
	};
	const handleShowEliminarActividad = () => {
		setShowEliminarActividad(true);
	};
	const handleClose2 = () => {
		setShow2(false);
	};
	const handleShow2 = () => {
		setShow2(true);
	};
	const handleCloseCancel = () => {
		setShowCancel(false);
	};
	const handleShowCancel = () => {
		{
			motCancel ? setShowSuspensionCancel(true) : setShowCancel(true);
		}
	};

	const suspenderActividad = (data: any) => {
		fetch('http://168.197.50.94:4005/metas/v2/actividad/cancel', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				idActividad: data.idActividad,
				motivoCancel: data.motivo,
			}),
		})
			.then((resp) => resp.json())
			.then((data) => {
				data.ok ? alert('Actividad Guardada !') : alert(data.error);
				window.location.replace('');
			})
			.catch((error) => alert(JSON.stringify(error)));
		console.log(data);
	};
	const eliminarActividad = () => {
		fetch('http://168.197.50.94:4005/metas/v2/actividad', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ idActividad: estadoActualizado.idActividad }),
		})
			.then((resp) => resp.json())
			.then((data) => {
				data.ok ? alert('Actividad Eliminada !') : alert(data.error);
				window.location.replace('');
			})
			.catch((error) => alert(JSON.stringify(error)));
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
	};
	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (term.length > 0) {
			suspenderActividad({
				idActividad: estadoActualizado.idActividad,
				motivo: term,
			});
			handleCloseCancel();
		}

		setTerm('');
	};

	const changeFromSideBar = () => {
		switch (currentFormSelected) {
			case 'descr':
				setIndexForm('descr');
				setCurrentFormTitle('Descripción y ubicación');
				setIsFormOpen(true);
				break;
			case 'documentacion':
				setIndexForm('documentacion');
				setCurrentFormTitle('Documentación');
				setIsFormOpen(true);
				break;
			case 'pie':
				setIndexForm('pie');
				setCurrentFormTitle('Plan institucional estratégico');
				setIsFormOpen(true);
				break;
			case 'area':
				setIndexForm('area');
				setCurrentFormTitle('UA , áreas internas y otras secretarías relacionadas.');
				setIsFormOpen(true);
				break;
			case 'periodo':
				setIndexForm('periodo');
				setCurrentFormTitle('Período / Fecha');
				setIsFormOpen(true);
				break;
			case 'objetivo':
				setIndexForm('objetivo');
				setCurrentFormTitle('Objetivo Estratégico');
				setIsFormOpen(true);
				break;
			case 'organi':
				setIndexForm('organi');
				setCurrentFormTitle('Organizaciones e instituciones relacionadas');
				setIsFormOpen(true);
				break;
			case 'metas':
				setIndexForm('metas');
				setCurrentFormTitle('Metas y Resultados');
				setIsFormOpen(true);
				break;
			default:
				break;
		}
	};
	useEffect(() => {
		changeFromSideBar();
	}, [currentFormSelected]);

	const alertSuspenderActividad = () => {};

	return (
		<div className=' w-100 h-100'>
			<Modal show={show2} onHide={handleClose2}>
				<Modal.Header>
					<Modal.Title>¿Quiere salir de la sección?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Los cambios no guardados se perderán.</Form.Label>
						</Form.Group>
						<Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant='danger' onClick={handleClose2}>
								Cancelar
							</Button>
							<Button
								variant='success'
								onClick={() => {
									if (isFormOpen) {
										handleClose2();
										setIsFormOpen(false);
										setCurrentFormTitle('');
										setIndexForm('');
										cleanFormSelected();
									} else {
										closePlanification();
										handleClose2();
									}
								}}
							>
								Salir
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
			<Modal show={showCancel} onHide={handleCloseCancel}>
				<Modal.Header closeButton>
					<Modal.Title>Suspender Actividad</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={submitForm}>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Ingrese el motivo de suspensión</Form.Label>
							<Form.Control
								type='nombre'
								placeholder='Motivo'
								autoFocus
								as='textarea'
								rows={2}
								style={{ resize: 'none' }}
								value={term}
								onChange={(e) => setTerm(e.target.value)}
							/>
						</Form.Group>
						<Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant='warning' className='Suspend' type='submit'>
								Suspender
							</Button>
							<Button variant='danger' onClick={handleCloseCancel}>
								Cancelar
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
			<Modal show={showSuspensionCancel} onHide={handleCloseSuspensionCancel}>
				<Modal.Header>
					<Modal.Title>¿Desea anular la Suspensión?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant='danger' onClick={handleCloseSuspensionCancel}>
								Cancelar
							</Button>
							<Button
								variant='success'
								onClick={(event) => {
									event.preventDefault();
									handleCloseSuspensionCancel();
									suspenderActividad({
										idActividad: estadoActualizado.idActividad,
										motivo: null,
									});
								}}
							>
								Anular Suspensión
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
			<Modal show={showEliminarActividad} onHide={handleCloseEliminarActividad}>
				<Modal.Header>
					<Modal.Title>¿Desea Eliminar la actividad?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>La actividad desaparecerá completamente.</Form.Label>
						</Form.Group>
						<Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button variant='danger' onClick={handleCloseEliminarActividad}>
								Cancelar
							</Button>
							<Button
								variant='success'
								onClick={() => {
									eliminarActividad();
									handleCloseEliminarActividad();
								}}
							>
								Eliminar Actividad
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
			<div className='ConteinerTitle d-flex justify-content-between align-items-center mb-2 '>
				<h4 className=' text-break m-2'>
					{name + (currentFormTitle.length > 0 ? ' - ' + currentFormTitle : '')}
				</h4>
				{isFormOpen && (
					<ArrowBack
						fontSize={'large'}
						className='m-1'
						onClick={() => {
							handleShow2();
						}}
					/>
				)}
				{!isFormOpen && (
					<ArrowBack fontSize='large' className=' m-1' onClick={() => handleShow2()} />
				)}
			</div>
			{motCancel !== null && (
				<h2
					style={{
						textAlign: 'center',
						fontSize: 30,
						fontWeight: 'bold',
						backgroundColor: 'yellow',
					}}
				>
					ACTIVIDAD SUSPENDIDA
				</h2>
			)}
			{!isFormOpen ? (
				<div className=' d-flex flex-column justify-content-center align-items-center h-100'>
					Posible vista resumen en desarrollo
					{motCancel === null && (
						<div className=' d-flex justify-content-around w-100'>
							<Button
								variant='warning'
								className='Suspend'
								onClick={() => {
									handleShowCancel();
								}}
							>
								{motCancel ? 'Anular Suspensión' : 'Suspender Actividad'}
							</Button>
							<Button
								variant='danger'
								onClick={() => {
									handleShowEliminarActividad();
								}}
							>
								Eliminar Actividad
							</Button>
						</div>
					)}
				</div>
			) : (
				<>
					{(() => {
						switch (indexForm) {
							case 'descr':
								return (
									<>
										<FormDescriptionUbication onClose={handleCloseForm} />
									</>
								);
							case 'documentacion':
								return (
									<>
										<FormDocuments onClose={handleCloseForm} />
									</>
								);
							case 'pie':
								return (
									<>
										<FormPIE onClose={handleCloseForm} />
									</>
								);
							case 'area':
								return (
									<>
										<FormArSecUU onClose={handleCloseForm} />
									</>
								);
							case 'periodo':
								return (
									<>
										<FormPeriodo onClose={handleCloseForm} />
									</>
								);
							case 'objetivo':
								return (
									<>
										<FormObjetiveEst onClose={handleCloseForm} />
									</>
								);
							case 'organi':
								return (
									<>
										<FormOrgInst onClose={handleCloseForm} />
									</>
								);
							case 'metas':
								return (
									<>
										<FormMetas onClose={handleCloseForm} />
									</>
								);
							default:
								return null;
						}
					})()}
				</>
			)}
		</div>
	);
}
