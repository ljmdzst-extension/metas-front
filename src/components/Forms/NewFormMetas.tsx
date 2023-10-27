import { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

import axios from 'axios';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { Form, Modal, Table } from 'react-bootstrap';

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

const FormMetas = () => {
	const [listadoMetas, setListadoMetas] = useState<metas[]>([]);
	const [nuevaMeta, setNuevaMeta] = useState<metas>(defaultNuevaMeta);
	const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
	const [showModal, setShowModal] = useState(false);

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

	const openModal = () => {
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
	};

	const botonAgregarMeta = () => {
		setNuevaMeta(defaultNuevaMeta);
		openModal();
	};

	const guardarBotonModal = () => {
		console.log('Guardar');
		if (nuevaMeta.idMeta === 0) {
			// Crear nueva meta
			const TempListMetas = [...listadoMetas];
			TempListMetas.push(nuevaMeta);
			// Next id
			const nextId = Math.max(...TempListMetas.map((meta) => meta.idMeta)) + 1;
			TempListMetas[TempListMetas.length - 1].idMeta = nextId;

			setListadoMetas(TempListMetas);
			closeModal();
		} else {
			// Actualizar meta
			const TempListMetas = [...listadoMetas];
			const index = TempListMetas.findIndex((meta) => meta.idMeta === nuevaMeta.idMeta);
			TempListMetas[index] = nuevaMeta;
			setListadoMetas(TempListMetas);
			closeModal();
		}
	};

	const editarMeta = (meta: metas) => {
		setNuevaMeta(meta);
		openModal();
	};

	return (
		<>
			<AddBoxRoundedIcon onClick={botonAgregarMeta} />
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
						<tr key={meta.idMeta}>
							<td>{index + 1}</td>
							<td>{meta.descripcion}</td>
							<td>{meta.resultado}</td>
							<td>{meta.observaciones}</td>
							<td>{meta.valoracion}</td>
							<td>
								<button className='btn btn-primary' onClick={() => editarMeta(meta)}>
									Editar
								</button>
								<button className='btn btn-danger'>Eliminar</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
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
					>
						<option key={'nn'} value={''}>
							Seleccione
						</option>
						{valoraciones?.map((valoracion, index) => (
							<option key={index} value={valoracion.idValoracion}>
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
		</>
	);
};

export default FormMetas;
