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

	const [motCancel, setMotCancel] = useState<string | null>(null);
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	useEffect(() => {
		setMotCancel(estadoActualizado?.motivoCancel);
	}, [estadoActualizado?.motivoCancel]);

	const handleClose2 = () => {
		setShow2(false);
	};
	const handleShow2 = () => {
		setShow2(true);
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
		if (motCancel) {
			Swal.fire({
				title: '¿Desea anular la suspensión?',
				showDenyButton: true,
				confirmButtonText: `Anular Suspensión`,
				denyButtonText: `Cancelar`,
			}).then((result) => {
				if (result.isConfirmed) {
					suspenderActividad({
						idActividad: estadoActualizado.idActividad,
						motivo: null,
					});
				} else if (result.isDenied) {
					Swal.fire('Changes are not saved', '', 'info');
				}
			});
		} else {
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
		}
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
			<div className='ConteinerTitle d-flex justify-content-between align-items-center mb-2 '>
				<h4 className=' text-break m-2'>{name}</h4>
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
					<div>
						<h4>
							<span>Fechas:</span>
							<p>{`Inicio ${estadoActualizado.fechaDesde} / Fin ${estadoActualizado.fechaHasta}`}</p>
						</h4>
					</div>
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
								handleSuspenderActividad();
							}}
						>
							Anular Suspensión
						</Button>
					)}
				</div>
			) : (
				<>
					{(() => {
						switch (indexForm) {
							case 'descr':
								return <FormDescriptionUbication onClose={handleCloseForm} />;
							case 'documentacion':
								return <FormDocuments onClose={handleCloseForm} />;
							case 'pie':
								return <FormPIE onClose={handleCloseForm} />;
							case 'area':
								return <FormArSecUU onClose={handleCloseForm} />;
							case 'periodo':
								return <FormPeriodo onClose={handleCloseForm} />;
							case 'objetivo':
								return <FormObjetiveEst onClose={handleCloseForm} />;
							case 'organi':
								return <FormOrgInst onClose={handleCloseForm} />;
							case 'metas':
								return <FormMetas onClose={handleCloseForm} />;
							default:
								return null;
						}
					})()}
				</>
			)}
		</div>
	);
}
