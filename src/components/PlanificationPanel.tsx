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
import Swal from 'sweetalert2';
import { errorAlert, successAlert } from '../utils/Alerts';
import ActivityDetail from './metas/ActivityDetail';

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
}: Readonly<Props>) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [indexForm, setIndexForm] = useState(String);
	const [show2, setShow2] = useState(false);

	const [motCancel, setMotCancel] = useState<string | null>(null);
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);
	const { token } = useSelector((state: RootState) => state.authSlice);

	useEffect(() => {
		setMotCancel(estadoActualizado?.motivoCancel);
	}, [estadoActualizado?.motivoCancel]);

	const handleClose2 = () => {
		setShow2(false);
	};
	const handleShow2 = () => {
		setShow2(true);
	};

	const suspenderActividad = (data: { idActividad: number; motivo: string }) => {
		fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad/cancel`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				idActividad: data.idActividad,
				motivoCancel: data.motivo,
			}),
		})
			.then((resp) => resp.json())
			.then((data) => {
				data.ok ? successAlert('Actividad Anulada') : errorAlert(data.error);
				window.location.replace('');
			})
			.catch((error) => errorAlert(JSON.stringify(error)));
	};

	const activarActividad = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad/restore`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ idActividad: estadoActualizado.idActividad }),
			});

			const data = await response.json();
			if (data.ok) {
				successAlert('Actividad restaurada');
			} else {
				errorAlert(data.error);
			}
		} catch (error) {
			errorAlert(JSON.stringify(error));
		}
	};

	const eliminarActividad = () => {
		fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ idActividad: estadoActualizado.idActividad }),
		})
			.then((resp) => resp.json())
			.then((data) => {
				data.ok ? successAlert('Actividad Eliminada !') : errorAlert(data.error);
				setTimeout(() => window.location.replace(''), 1000);
			})
			.catch((error) => errorAlert(JSON.stringify(error)));
	};

	useEffect(() => {
		const changeFromSideBar = () => {
			switch (currentFormSelected) {
				case 'descr':
					setIndexForm('descr');
					setIsFormOpen(true);
					break;
				case 'documentacion':
					setIndexForm('documentacion');
					setIsFormOpen(true);
					break;
				case 'pie':
					setIndexForm('pie');
					setIsFormOpen(true);
					break;
				case 'area':
					setIndexForm('area');
					setIsFormOpen(true);
					break;
				case 'periodo':
					setIndexForm('periodo');
					setIsFormOpen(true);
					break;
				case 'objetivo':
					setIndexForm('objetivo');
					setIsFormOpen(true);
					break;
				case 'organi':
					setIndexForm('organi');
					setIsFormOpen(true);
					break;
				case 'metas':
					setIndexForm('metas');
					setIsFormOpen(true);
					break;
				default:
					break;
			}
		};
		changeFromSideBar();
	}, [currentFormSelected]);

	const handleSuspenderActividad = () => {
		Swal.fire({
			title: '¿Desea suspender la actividad?',
			showDenyButton: true,
			denyButtonText: `Cancelar`,
			confirmButtonText: `Suspender`,
			input: 'textarea',
			inputPlaceholder: 'Ingrese el motivo de la suspensión',
			inputValidator: (value) => {
				if (!value) {
					return 'Debe ingresar un motivo';
				}
			},
		}).then((result) => {
			if (result.isConfirmed) {
				suspenderActividad({
					idActividad: estadoActualizado.idActividad,
					motivo: result.value,
				});
			} else if (result.isDenied) {
				Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};

	const handleDeleteActividad = () => {
		Swal.fire({
			title: '¿Desea eliminar la actividad?',
			showCancelButton: true,
			confirmButtonText: `Eliminar`,
		}).then((result) => {
			if (result.isConfirmed) {
				eliminarActividad();
			}
		});
	};

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
			{/* NOTE: Vista detalle form */}
			<div className='d-flex justify-content-between align-items-center mb-2 border-bottom position-relative '>
				<h4
					className=' text-break m-2 border-3 '
					style={{
						borderBottom: '2px solid #0a5d52',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{name}
				</h4>
				{isFormOpen && (
					<ArrowBack
						fontSize={'large'}
						className='m-1 rounded'
						style={{ background: '#0a5d52', color: 'white' }}
						color='primary'
						onClick={() => {
							handleShow2();
						}}
					/>
				)}
				{!isFormOpen && (
					<ArrowBack
						fontSize='large'
						className='m-1 rounded'
						style={{ background: '#0a5d52', color: 'white' }}
						onClick={() => handleShow2()}
					/>
				)}
			</div>
			{/* NOTE: VISTA ACTIVIDAD SUSPENDIDA */}
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
			{/* NOTE: VISTA PRINCIPAL - Información */}
			{!isFormOpen ? (
				<div className=' d-flex flex-column justify-content-between' style={{ height: '85%' }}>
					<div style={{ height: '85%' }}>
						<ActivityDetail />
					</div>
					{/* // NOTE: VISTA PRINCIPAL - BOTONES ELIMINAR / SUSPENDER */}
					{motCancel === null ? (
						<div className=' d-flex justify-content-around w-100'>
							<Button
								variant='warning'
								className='Suspend'
								onClick={() => {
									handleSuspenderActividad();
								}}
							>
								Suspender Actividad
							</Button>
							<Button
								variant='danger'
								onClick={() => {
									handleDeleteActividad();
								}}
							>
								Eliminar Actividad
							</Button>
						</div>
					) : (
						<Button
							variant='warning'
							className='Suspend'
							onClick={() => {
								activarActividad();
							}}
						>
							Anular Suspensión
						</Button>
					)}
				</div>
			) : (
				<>
					{/* NOTE: FORMULARIOS */}
					{(() => {
						switch (indexForm) {
							case 'descr':
								return <FormDescriptionUbication />;
							case 'documentacion':
								return <FormDocuments />;
							case 'pie':
								return <FormPIE />;
							case 'area':
								return <FormArSecUU />;
							case 'periodo':
								return <FormPeriodo />;
							case 'objetivo':
								return <FormObjetiveEst />;
							case 'organi':
								return <FormOrgInst />;
							case 'metas':
								return <FormMetas />;
							default:
								return null;
						}
					})()}
				</>
			)}
		</div>
	);
}
