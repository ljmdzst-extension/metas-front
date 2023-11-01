import { useEffect, useState } from 'react';
import FormDescriptionUbication from './Forms/FormDescriptionUbication';
import FormPIE from './Forms/FormPIE';
import FormArSecUU from './Forms/FormArSecUU';
import FormPeriodo from './Forms/FormPeriodo';
import FormObjetiveEst from './Forms/FormObjetiveEst';
import FormOrgInst from './Forms/FormOrgInst';
import FormMetas from "./Forms/FormMetas";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import FormDocuments from './Forms/FormDocuments';
import { ArrowBack } from '@mui/icons-material';
type Props = {
	name: string;
};
export default function PlanificationPanel({ name }: Props) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [indexForm, setIndexForm] = useState(String);
	const [show2, setShow2] = useState(false);
	const [term, setTerm] = useState(String);
	const [showCancel, setShowCancel] = useState(false);
	const [showSuspensionCancel, setShowSuspensionCancel] = useState(false);
	const [showEliminarActividad, setShowEliminarActividad] = useState(false);

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
	return (
		<div className='MenuPlanification'>
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
									handleClose2();
									setIsFormOpen(false);
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
			<div className='ConteinerTitle'>
				<h1 style={{ wordWrap: 'break-word' }}>{name}</h1>
				{isFormOpen && (
					<Button
						variant='success'
						className='buttonCloseForm'
						style={{ width: '60px', height: '60px' }}
						onClick={() => {
							handleShow2();
						}}
					>
						<ArrowBack fontSize={'large'} />
					</Button>
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
				<>
					<div className='ConteinerColumn'>
						<div className='Column'>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('descr');
										setIsFormOpen(true);
									}}
								>
									Descripción y ubicación
								</Button>
							</div>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('pie');
										setIsFormOpen(true);
									}}
								>
									Plan institucional estratégico
								</Button>
							</div>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('area');
										setIsFormOpen(true);
									}}
								>
									UA , áreas internas y otras secretarías relacionadas.
								</Button>
							</div>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('metas');
										setIsFormOpen(true);
									}}
								>
									Metas y Resultados
								</Button>
							</div>
						</div>
						<div className='Column'>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('periodo');
										setIsFormOpen(true);
									}}
								>
									Período / Fecha
								</Button>
							</div>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('objetivo');
										setIsFormOpen(true);
									}}
								>
									Objetivo Estratégico
								</Button>
							</div>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('organi');
										setIsFormOpen(true);
									}}
								>
									Organizaciones e instituciones relacionadas
								</Button>
							</div>
							<div className='rowForm'>
								<Button
									variant='outline-success'
									className='Form'
									onClick={() => {
										setIndexForm('documentacion');
										setIsFormOpen(true);
									}}
								>
									Documentación
								</Button>
							</div>
						</div>
					</div>
					<div className='ButtonPlanification'>
						<Button
							variant='warning'
							className='Suspend'
							onClick={() => {
								handleShowCancel();
							}}
						>
							{motCancel ? 'Cancelar Suspension' : 'Suspender Actividad'}
						</Button>
						<Button
							variant='danger'
							className='Delete'
							onClick={() => {
								handleShowEliminarActividad();
							}}
						>
							Eliminar Actividad
						</Button>
					</div>
				</>
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
