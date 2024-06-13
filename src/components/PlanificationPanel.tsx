import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { CargarDatosActividadAction } from '../redux/actions/activityAction';
import { SET_HAY_CAMBIOS } from '../redux/reducers/ActivityReducer';

import useAvailableHeight from '../hooks/useAvailableHeight';
import useAlert from '../hooks/useAlert';

import { Button, Form, Modal } from 'react-bootstrap';
import { ArrowBack, Info } from '@mui/icons-material';
import Swal from 'sweetalert2';

import {
	FormArSecUU,
	FormDescriptionUbication,
	FormDocuments,
	FormMetas,
	FormObjetiveEst,
	FormOrgInst,
	FormPeriodo,
	FormPIE,
} from './Forms/metas';

import ActivityDetail from './metas/ActivityDetail';
import LoadingSpinner from './Spinner/LoadingSpinner';

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
	const dispatch = useDispatch<AppDispatch>();

	const [isFormOpen, setIsFormOpen] = useState(false);
	const [indexForm, setIndexForm] = useState(String);
	const [show2, setShow2] = useState(false);

	const [motCancel, setMotCancel] = useState<string | null>(null);
	const { activity, isLoading, hayCambios } = useSelector(
		(state: RootState) => state.actividadSlice,
	);
	const { token, puedeEditar } = useSelector((state: RootState) => state.authSlice);

	const availableHeight = useAvailableHeight();
	const { errorAlert, successAlert } = useAlert();

	useEffect(() => {
		setMotCancel(activity?.motivoCancel);
	}, [activity?.motivoCancel]);

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
				dispatch(CargarDatosActividadAction(activity.idActividad));
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
				body: JSON.stringify({ idActividad: activity.idActividad }),
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
			body: JSON.stringify({ idActividad: activity.idActividad }),
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
					idActividad: activity.idActividad,
					motivo: result.value,
				});
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
	const handleSuspensionModal = () => {
		Swal.fire({
			title: 'Actividad Suspendida',
			text: `Motivo: ${motCancel}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Anular Suspensión',
			cancelButtonText: 'Ocultar',
		}).then((result) => {
			if (result.isConfirmed) {
				activarActividad().then(() => {
					dispatch(CargarDatosActividadAction(activity.idActividad));
					// navigate(0); // Use navigate or history.push('/') if you want to redirect to a specific path
				});
			}
		});
	};

	return (
		<div className=' h-100'>
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
										dispatch(SET_HAY_CAMBIOS({ valor: false }));
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
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					{/* NOTE: Vista detalle form */}
					<div className='d-flex justify-content-between align-items-center mb-2 border-bottom  '>
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
						<ArrowBack
							fontSize={'large'}
							className='m-1 rounded'
							style={{ background: '#0a5d52', color: 'white' }}
							color='primary'
							onClick={() => {
								if (hayCambios) {
									handleShow2();
								} else {
									if (isFormOpen) {
										setIsFormOpen(false);
										setIndexForm('');
										cleanFormSelected();
									} else {
										closePlanification();
									}
								}
							}}
						/>
					</div>
					{/* NOTE: VISTA ACTIVIDAD SUSPENDIDA */}

					{indexForm === '' && motCancel !== null && (
						<Button
							variant='outline-warning'
							className='d-flex align-items-center justify-content-center mx-auto text-black'
							onClick={handleSuspensionModal}
							size='sm'
							style={{ width: 'fit-content' }}
						>
							Actividad Suspendida
							<Info fontSize='medium' style={{ color: 'orange', marginLeft: '8px' }} />
						</Button>
					)}
					{/* NOTE: VISTA PRINCIPAL - Información */}
					{!isFormOpen ? (
						<div className=' d-flex flex-column h-100 '>
							<div
								className=' overflow-y-scroll custom-scrollbar '
								style={{ height: availableHeight - 170 }}
							>
								<ActivityDetail />
							</div>
							{/* // NOTE: VISTA PRINCIPAL - BOTONES ELIMINAR / SUSPENDER */}
							{motCancel === null && (
								<div
									className={` d-flex justify-content-around mb-2  ${puedeEditar ? '' : 'd-none'} `}
								>
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
							)}
						</div>
					) : (
						<div style={{ height: availableHeight - 110 }}>
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
						</div>
					)}
				</>
			)}
		</div>
	);
}
