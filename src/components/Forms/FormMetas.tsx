import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Table, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import axios from 'axios';
import { guardarActividad } from '../../redux/actions/putActividad';
interface FormMetas {
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

export default function FormMetas({ onClose }: FormMetas) {
	const dispatch = useDispatch();
	const [Valoraciones, setValoraciones] = useState<Valoracion[]>([]);
	const [indexMetas, setIndexMetas] = useState<metas[]>([]);
	const [nuevaMeta, setNuevaMeta] = useState<metas>(defaultNuevaMeta);
	const [disable, setDisable] = useState<{ index: number; state: boolean }[]>([]);

	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	useEffect(() => {
		const fetchData = async () => {
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
		fetchData();
	}, []);

	useEffect(() => {
		const sincronizarMetas = () => {
			if (estadoActualizado.listaMetas) {
				setIndexMetas(estadoActualizado.listaMetas);
			}
		};
		sincronizarMetas();
	}, [estadoActualizado.listaMetas]);

	useEffect(() => {
		setDisable(indexMetas.map((_item, index) => ({ index, state: true })));

		return () => {
			setDisable([]);
		};
	}, [indexMetas]);

	const eliminarMeta = (_index: number | null) => {
		if (_index !== null) {
			setIndexMetas(indexMetas.filter((_item, index) => index !== _index));
		}
	};

	const agregarMeta = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if (nuevaMeta.descripcion?.length) {
			if (nuevaMeta.idMeta && nuevaMeta.idMeta > 0) {
				setIndexMetas(
					indexMetas.map((meta) => (meta.idMeta === nuevaMeta.idMeta ? nuevaMeta : meta)),
				);
			} else {
				setIndexMetas([...indexMetas, nuevaMeta]);
			}
			setNuevaMeta(defaultNuevaMeta);
		}
	};

	return (
		<>
			<div className='FormMetas'>
				<h1>Metas y Resultados</h1>
				<h4>Se puede cargar más de una.</h4>
				<div className='ConteinerDescriptionMetas'>
					<div className='Descripcion'>
						<span className='SubtituloMetas'>Meta/resultado esperado :</span>
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
					</div>
					{/* <div className="ResultadoEsperado">
                  <span className="SubtituloMetas">Resultado alcanzado :</span>
                  <Form.Control
                    as="textarea"
                    name="resultado"
                    className="ParrafoResultados"
    
                    placeholder={'Resultado'}
                    value={nuevaMeta.resultado ||''}
                    onChange={ (e)=>{setNuevaMeta({...nuevaMeta,resultado : e.target.value})}}
                  />
                </div>
                <div className="Observaciones">
                  <span className="SubtituloMetas">
                    {`Observaciones ` }
                  </span>
                  <small>{`(puede incorporarse cualquier detalle o 
                        información adicional que complemente los resultados alcanzados. También pueden ingresarse links a documentos o recursos anexo).`}</small>
                  <Form.Control
                    as="textarea"
                    name="observaciones"
                    className="ParrafoObservaciones"
                    placeholder={'Observaciones'}
                    value={nuevaMeta.observaciones ||''}
                    onChange={ (e)=>{setNuevaMeta({...nuevaMeta, observaciones : e.target.value})}}
                 
                  />
                </div>
                <div className="Valoraciones">
                  <span className="SubtituloMetas">
                    {`Valoración general de la actividad y los resultados alcanzados :`}
                  </span>
                  <Form.Select
                    name="valoracion"
                    className="ParrafoObservaciones"
                    placeholder={'Valoración'}
                    value={nuevaMeta.valoracion || ''}
                    onChange={ (e)=>{setNuevaMeta({...nuevaMeta, valoracion : Number(e.target.value)})}}
                    
                  >
                    <option key={'nn'} value={''}>Seleccione</option>
                    {
                      Valoraciones &&
                      Valoraciones.map( (valoracion,index) => 
                          
                          <option key={index} value={valoracion.idValoracion} >{valoracion.nom}</option>
                        
                        )
                    }
                  </Form.Select>
                </div> */}
				</div>
				<Button variant='outline-success' className='SaveChange' onClick={agregarMeta}>
					Agregar meta
				</Button>
				<div className='ListaInstituciones'>
					<h6>Metas cargadas:</h6>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th style={{ width: '30px' }}>#</th>
								<th style={{ width: '30%' }}>Meta/resultado esperado</th>
								<th style={{ width: '30%' }}>Resultado alcanzado</th>
								<th style={{ width: '20%' }}>
									Observaciones
									<small>
										{` (puede incorporarse cualquier detalle o información adicional que complemente los resultados alcanzados. 
                      También pueden ingresarse links a documentos o recursos anexo).`}
									</small>
								</th>
								<th style={{ width: '20%' }}>
									Valoración general de la actividad y los resultados alcanzados
								</th>
								<th style={{ width: '20px' }}></th>
							</tr>
						</thead>
						<tbody>
							{indexMetas.map((item, index) => (
								<tr key={index}>
									<td style={{ width: '30px' }}>{index + 1}</td>
									<td style={{ width: '30%' }}>
										{!disable[index] || disable[index].state ? (
											item.descripcion
										) : (
											<Form.Control
												as='textarea'
												rows={4}
												name='editDescripcion'
												className='ParrafoDescripcion'
												placeholder={'Descripción'}
												value={item.descripcion ?? ''}
												onChange={(e) => {
													setIndexMetas(
														indexMetas.map((meta, _index) =>
															_index === index ? { ...item, descripcion: e.target.value } : meta,
														),
													);
												}}
											/>
										)}
									</td>
									<td style={{ width: '30%' }}>
										{' '}
										{!disable[index] || disable[index].state ? (
											item.resultado
										) : (
											<Form.Control
												as='textarea'
												rows={4}
												name='editResultado'
												className='ParrafoResultado'
												placeholder={'Resultado'}
												value={item.resultado ?? ''}
												onChange={(e) => {
													setIndexMetas(
														indexMetas.map((meta, _index) =>
															_index === index ? { ...item, resultado: e.target.value } : meta,
														),
													);
												}}
											/>
										)}
									</td>
									<td style={{ width: '20%' }}>
										{' '}
										{!disable[index] || disable[index].state ? (
											item.observaciones
										) : (
											<Form.Control
												as='textarea'
												rows={4}
												name='editObservaciones'
												className='ParrafoObservaciones'
												placeholder={'Observaciones'}
												value={item.observaciones ?? ''}
												onChange={(e) => {
													setIndexMetas(
														indexMetas.map((meta, _index) =>
															_index === index ? { ...item, observaciones: e.target.value } : meta,
														),
													);
												}}
											/>
										)}
									</td>
									<td style={{ width: '20%' }}>
										{' '}
										{!disable[index] || disable[index].state ? (
											Valoraciones.find((valoracion) => valoracion.idValoracion === item.valoracion)
												?.nom ?? ''
										) : (
											<Form.Select
												name='valoracion'
												className='ParrafoObservaciones'
												placeholder={'Valoración'}
												value={item.valoracion ?? ''}
												onChange={(e) => {
													console.log(e.target.value);
													setIndexMetas(
														indexMetas.map((meta, _index) =>
															_index === index
																? { ...item, valoracion: Number(e.target.value) }
																: meta,
														),
													);
												}}
											>
												<option key={'nn'} value={''}>
													Seleccione
												</option>
												{Valoraciones &&
													Valoraciones.map((valoracion, index) => (
														<option key={index} value={valoracion.idValoracion}>
															{valoracion.nom}
														</option>
													))}
											</Form.Select>
										)}
									</td>
									<td style={{ width: '20px' }}>
										<Button
											variant='secondary'
											onClick={() =>
												setDisable(
													disable.map((item) =>
														item.index === index ? { ...item, state: !item.state } : item,
													),
												)
											}
										>
											<img
												src={
													!disable[index] || disable[index].state
														? '../assets/img/boton-editar.png'
														: '../assets/img/guardar.png'
												}
												className='imgboton'
												alt={!disable[index] || disable[index].state ? 'editar' : 'guardar'}
											/>
										</Button>
										<Button variant='danger' onClick={() => eliminarMeta(index)}>
											<img src='../assets/img/eliminar.png' className='imgboton' alt='eliminar' />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
			<Button
				variant='success'
				className='Save'
				onClick={() => {
					guardarActividad(
						{
							...estadoActualizado,
							listaMetas: indexMetas,
						},
						dispatch,
					);
					onClose();
				}}
			>
				Guardar Actividad
			</Button>
		</>
	);
}

interface ModalProps {
	metaData: metas;
	onClose: () => void;
	valoraciones: Valoracion[];
}

function ModalForm({ metaData, onClose, valoraciones }: ModalProps) {
	const [meta, setMeta] = useState<metas>(metaData);

	useEffect(() => {
		setMeta(metaData);
	}, [metaData]);

	return (
		<Modal
			show={true}
			onHide={onClose}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Meta</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className='mb-3'>
						<Form.Label>Meta/resultado esperado :</Form.Label>
						<Form.Control
							as='textarea'
							rows={4}
							name='descripcion'
							className='ParrafoDescripcion'
							placeholder={'Descripción'}
							value={meta.descripcion ?? ''}
							onChange={(e) => {
								setMeta({ ...meta, descripcion: e.target.value });
							}}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Resultado alcanzado :</Form.Label>
						<Form.Control
							as='textarea'
							rows={4}
							name='resultado'
							className='ParrafoResultado'
							placeholder={'Resultado'}
							value={meta.resultado ?? ''}
							onChange={(e) => {
								setMeta({ ...meta, resultado: e.target.value });
							}}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>
							Observaciones
							<small>
								{` (puede incorporarse cualquier detalle o información adicional que complemente los resultados alcanzados. 
                      También pueden ingresarse links a documentos o recursos anexo).`}
							</small>
						</Form.Label>
						<Form.Control
							as='textarea'
							rows={4}
							name='observaciones'
							className='ParrafoObservaciones'
							placeholder={'Observaciones'}
							value={meta.observaciones ?? ''}
							onChange={(e) => {
								setMeta({ ...meta, observaciones: e.target.value });
							}}
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>
							Valoración general de la actividad y los resultados alcanzados :
						</Form.Label>
						<Form.Select
							name='valoracion'
							className='ParrafoObservaciones'
							placeholder={'Valoración'}
							value={meta.valoracion ?? ''}
							onChange={(e) => {
								setMeta({ ...meta, valoracion: Number(e.target.value) });
							}}
						>
							<option key={'nn'} value={''}>
								Seleccione
							</option>
							{valoraciones?.map((valoracion, index) => (
								<option key={index} value={valoracion?.idValoracion}>
									{valoracion?.nom}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onClose}>
					Cerrar
				</Button>
				<Button variant='success' onClick={() => onClose()}>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
