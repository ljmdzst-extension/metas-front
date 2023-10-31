import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { guardarActividad } from '../../redux/actions/putActividad';

interface FormMetasProps {
	onClose: () => void;
}

interface Valoracion {
	idValoracion: number;
	nom: string;
}
interface metas {
	idMeta: number | null;
	descripcion: string | null;
	resultado: string | null;
	observaciones: string | null;
	valoracion: number | null;
}

const defaultNuevaMeta = {
	idMeta: 0,
	descripcion: '',
	resultado: '',
	observaciones: '',
	valoracion: 0,
};

const FormMetas = ({ onClose }: FormMetasProps) => {
	const dispatch = useDispatch();
	const [listadoMetas, setListadoMetas] = useState<metas[]>([]);
	const [nuevaMeta, setNuevaMeta] = useState<metas>(defaultNuevaMeta);
	const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
	const [showModal, setShowModal] = useState(false);
	const indexCurrentMeta = useRef(-1);

	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	useEffect(() => {
		const getValoraciones = async () => {
			try {
				const response = await axios.get('http://168.197.50.94:4005/metas/v2/bases/');
				if (response.data.ok) {
					setValoraciones(response.data.data.listaValoraciones);
				} else {
					console.error('Error en la respuesta de la API');
				}
			} catch (error) {
				console.error('Error al obtener la lista de objetivos:', error);
			}
		};

		getValoraciones();
	}, []);

	useEffect(() => {
		const sincronizarMetas = () => {
			if (estadoActualizado.listaMetas) {
				setListadoMetas(estadoActualizado.listaMetas);
			}
		};
		sincronizarMetas();
	}, [estadoActualizado.listaMetas]);

	useEffect(() => {
		const actualizarRedux = () => {
			dispatch({
				type: 'UPDATE_ACTIVIDAD',
				payload: {
					...estadoActualizado,
					listaMetas: listadoMetas,
				},
			});
		};
		actualizarRedux();
	}, [dispatch, estadoActualizado, listadoMetas]);

	const openModal = () => {
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
	};

	const botonAgregarMeta = () => {
		console.log(indexCurrentMeta.current);
		console.log('Agregar');
		indexCurrentMeta.current = -1;
		setNuevaMeta(defaultNuevaMeta);
		openModal();
	};

	const guardarBotonModal = () => {
		console.log(indexCurrentMeta.current);
		console.log('Guardar');
		if (indexCurrentMeta.current === -1) {
			// Agregar
			const newListadoMetas = [...listadoMetas];
			newListadoMetas.push(nuevaMeta);
			setListadoMetas(newListadoMetas);
		} else {
			// Editar
			const newListadoMetas = [...listadoMetas];
			newListadoMetas[indexCurrentMeta.current] = nuevaMeta;
			setListadoMetas(newListadoMetas);
		}

		closeModal();
	};

	const editarMeta = (index: number) => {
		console.log('Editar');
		indexCurrentMeta.current = index;
		console.log(indexCurrentMeta.current);
		setNuevaMeta(listadoMetas[index]);
		openModal();
	};

	const eliminarMeta = (index: number) => {
		console.log('Eliminar');
		const newListadoMetas = [...listadoMetas];
		newListadoMetas.splice(index, 1);
		setListadoMetas(newListadoMetas);
	};

	return (
		<div className=' d-flex flex-column mx-4 '>
			<Button
				onClick={() => {
					botonAgregarMeta();
				}}
				className='my-4 ms-auto me'
			>
				Agregar
				<AddBoxRoundedIcon className=' ms-2' />
			</Button>
			<div className='tabla-metas-contenedor'>
				<Table>
					<thead>
						<tr>
							<th>#</th>
							<th>Meta/resultado esperado</th>
							<th>Resultado Alcanzado</th>
							<th>Observaciones</th>
							<th>Valoraciones</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{listadoMetas.map((meta, index) => (
							<tr key={`${meta.descripcion}-${meta.idMeta} `}>
								<td>{index + 1}</td>
								<td>{meta.descripcion}</td>
								<td>{meta.resultado}</td>
								<td>{meta.observaciones}</td>
								<td>{meta.valoracion}</td>
								<td>
									<EditIcon
										color='action'
										className='cursor-pointer'
										onClick={() => editarMeta(index)}
									/>
									<DeleteIcon
										color='error'
										className='cursor-pointer'
										onClick={() => eliminarMeta(index)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<Button
				variant='success'
				// center and bottom
				className='mt-auto align-self-center'
				onClick={() => {
					guardarActividad(
						{
							...estadoActualizado,
							listaMetas: listadoMetas,
						},
						dispatch,
					);
					onClose();
				}}
			>
				Guardar
			</Button>
			<Modal show={showModal} onHide={closeModal} size='lg'>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body className=' d-flex flex-column gap-4 '>
					<Form.Control
						as='textarea'
						name='descripcion'
						className='ParrafoDescripcion'
						placeholder={'Descripción'}
						value={nuevaMeta.descripcion ?? ''}
						onChange={(e) => {
							setNuevaMeta({ ...nuevaMeta, descripcion: e.target.value });
						}}
					/>
					<Form.Control
						as='textarea'
						rows={4}
						name='editResultado'
						className='ParrafoResultado'
						placeholder={'Resultado'}
						value={nuevaMeta.resultado ?? ''}
						onChange={(e) => {
							setNuevaMeta({ ...nuevaMeta, resultado: e.target.value });
						}}
					/>
					<Form.Control
						as='textarea'
						rows={4}
						name='editObservaciones'
						className='ParrafoObservaciones'
						placeholder={'Observaciones'}
						value={nuevaMeta.observaciones ?? ''}
						onChange={(e) => {
							setNuevaMeta({ ...nuevaMeta, observaciones: e.target.value });
						}}
					/>
					<Form.Select
						name='valoracion'
						className='ParrafoObservaciones'
						placeholder={'Valoración'}
						value={nuevaMeta.valoracion ?? ''}
						onChange={(e) => {
							setNuevaMeta({ ...nuevaMeta, valoracion: parseInt(e.target.value) });
						}}
					>
						<option key={'nn'} value={''}>
							Seleccione
						</option>
						{valoraciones?.map((valoracion) => (
							<option
								key={`${valoracion.nom}-${valoracion.idValoracion}`}
								value={valoracion.idValoracion}
							>
								{valoracion.nom}
							</option>
						))}
					</Form.Select>
				</Modal.Body>
				<Modal.Footer>
					<button className='btn btn-primary' onClick={guardarBotonModal}>
						Guardar
					</button>
					<button className='btn btn-danger' onClick={closeModal}>
						Cancelar
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default FormMetas;
