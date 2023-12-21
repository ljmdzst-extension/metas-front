import { useState } from 'react';
import mockMembers from '../../../mock/memberListData.json';

import {
	Button,
	Container,
	Form,
	FormSelect,
	Table,
	Row,
	Col,
	FormGroup,
	InputGroup,
} from 'react-bootstrap';

import { IntegranteEquipoProps } from '../../../types/ProjectsProps';
import { ModalMember } from './components/ModalMember';
import { Delete, Search } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialValues: IntegranteEquipoProps = {
	tipoMiembro: '',
	tipoDni: '',
	dni: '',
	nom: '',
	ape: '',
	dom: '',
	tel: '',
	email: '',
	lrol: [],
	idUnidadAcademica: 0,
	titulo: '',
	periodoLectivo: undefined,
	categoriaDocente: undefined,
	categoriaDedicacion: undefined,
	tieneTarjeta: 0,
	idArea: 0,
	observ: '',
};

const FormMembers = () => {
	const [members, setMembers] = useState<IntegranteEquipoProps[]>([]);

	const [initialFormValues, setInitialFormValues] = useState<IntegranteEquipoProps>(initialValues);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const handleSubmit = (values: IntegranteEquipoProps) => {
		const updatedMembers = [...members, values];
		setMembers(updatedMembers);
	};

	const handleDelete = (dni: string) => {
		const updatedMembers = members.filter((member) => member.dni !== dni);
		setMembers(updatedMembers);
	};

	const handleRoles = (listMember: IntegranteEquipoProps[]) => {
		setMembers(listMember);
	};

	const handleSearch = (type: string, dni: string) => {
		console.log(type, dni);
		const currentMemberFound = mockMembers.find(
			(member) => member.tipoDni === type && member.dni === dni,
		);
		console.log(currentMemberFound);
		if (currentMemberFound) {
			setInitialFormValues(currentMemberFound);
		} else {
			setInitialFormValues(initialValues);
		}
	};

	const validations = {
		dni: Yup.string().required('Campo requerido'),
		nom: Yup.string().required('Campo requerido'),
		ape: Yup.string().required('Campo requerido'),
		dom: Yup.string().required('Campo requerido'),
		tel: Yup.string().required('Campo requerido'),
		email: Yup.string().required('Campo requerido'),
	};

	return (
		<div className=' d-flex flex-column h-100'>
			<div className=' d-flex gap-2 h-100'>
				<div className=' p-1 d-flex flex-column align-items-end ' style={{ width: '60%' }}>
					<Table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Correo</th>
								<th>UA</th>
								<th>Rol</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{members.length > 0 ? (
								members.map((member: IntegranteEquipoProps) => {
									return (
										<tr key={member.dni}>
											<td>{member.nom}</td>
											<td>{member.email}</td>

											<td>{member.idUnidadAcademica}</td>
											<td>{member.lrol ? member.lrol : ' '}</td>
											<td>
												<Delete onClick={() => handleDelete(member.dni)} />
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td colSpan={5}>No hay miembros cargados</td>
								</tr>
							)}
						</tbody>
					</Table>
					<Button
						variant='primary'
						className=' mb-2 mt-auto '
						onClick={() => setShow(true)}
						disabled={members.length === 0}
					>
						Asignar roles
					</Button>
				</div>
				<div
					className=' '
					style={{
						width: '40%',
						border: '1px solid #c2c2c2',
						borderRadius: '5px',
						background: '#e8e8e8',
					}}
				>
					<Formik
						initialValues={initialFormValues}
						onSubmit={(values) => {
							handleSubmit(values);
						}}
						validationSchema={validations}
						enableReinitialize
					>
						{({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => {
							return (
								<Form className='h-100 ' onSubmit={(e) => handleSubmit(e)}>
									<Container className=' d-flex flex-column justify-content-start gap-1 h-100'>
										<h4 className=' text-center my-2'>Agregar Miembros</h4>
										<Row>
											<Col className=' d-flex'>
												<FormSelect
													name='tipoDni'
													value={values.tipoDni}
													onChange={handleChange}
													onBlur={handleBlur}
													className=' w-25'
													isInvalid={!!errors.tipoDni && touched.tipoDni}
													size='sm'
												>
													<option value=''>Tipo</option>
													<option value='DNI'>DNI</option>
													<option value='PASAP'>Pasaporte</option>
													<option value='LC'>Libreta Civica</option>
													<option value='LE'>Libreta de Enrolamiento</option>
												</FormSelect>
												<InputGroup className=' w-50'>
													<Form.Control
														type='text'
														placeholder='DNI'
														name='dni'
														value={values.dni}
														onChange={handleChange}
														onBlur={handleBlur}
														isInvalid={!!errors.dni && touched.dni}
														size='sm'
													/>
													<Button
														variant='outline-secondary'
														onClick={() => handleSearch(values.tipoDni, values.dni)}
														size='sm'
													>
														<Search />
													</Button>
												</InputGroup>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup>
													<FormSelect
														name='tipoMiembro'
														value={values.tipoMiembro}
														onChange={handleChange}
														onBlur={handleBlur}
														isInvalid={!!errors.tipoMiembro && touched.tipoMiembro}
														size='sm'
													>
														<option value=''>Tipo de miembro</option>
														<option value='DOCENTE'>Docente</option>
														<option value='ESTUDIANTE'>Estudiante</option>
														<option value='GRADUADO'>Graduado</option>
														<option value='NO_DOC'>No Docente</option>
														<option value='NO_UNIV'>No Universitario</option>
													</FormSelect>
												</FormGroup>
											</Col>
											<Col></Col>
										</Row>
										<Row>
											<Col>
												<Form.Group>
													<Form.Control
														size='sm'
														type='text'
														placeholder='Nombre'
														name='nom'
														value={values.nom}
														onChange={handleChange}
														onBlur={handleBlur}
														isInvalid={!!errors.nom && touched.nom}
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<Form.Control
														size='sm'
														type='text'
														placeholder='Apellido'
														name='ape'
														value={values.ape}
														onChange={handleChange}
														onBlur={handleBlur}
														isInvalid={!!errors.ape && touched.ape}
													/>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group>
													<Form.Control
														size='sm'
														type='text'
														placeholder='Domicilio'
														name='dom'
														value={values.dom}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<Form.Control
														size='sm'
														type='text'
														placeholder='Telefono'
														name='tel'
														value={values.tel}
														onChange={handleChange}
														onBlur={handleBlur}
														isInvalid={!!errors.tel && touched.tel}
													/>
												</Form.Group>
											</Col>
										</Row>

										<Form.Group>
											<Form.Control
												size='sm'
												type='email'
												placeholder='Email'
												name='email'
												value={values.email}
												onChange={handleChange}
												onBlur={handleBlur}
												isInvalid={!!errors.email && touched.email}
											/>
										</Form.Group>
										{values.tipoMiembro && (
											<>
												{['DOCENTE', 'GRADUADO', 'NO_DOC', 'NO_UNIV'].includes(
													values.tipoMiembro,
												) && (
													<FormGroup className=' ms-1'>
														<Form.Label style={{ fontSize: '14px' }} className=' mb-0'>
															Posee tarjeta precargable?
														</Form.Label>
														<div>
															<Form.Check
																inline
																label='Si'
																style={{ fontSize: '14px' }}
																type='radio'
																name='precargable'
																value={1}
																checked={values.tieneTarjeta === 1}
																onChange={handleChange}
															/>
															<Form.Check
																inline
																label='No'
																style={{ fontSize: '14px' }}
																type='radio'
																name='precargable'
																value={0}
																checked={values.tieneTarjeta === 0}
																onChange={handleChange}
															/>
														</div>
													</FormGroup>
												)}
												{['DOCENTE', 'ESTUDIANTE', 'GRADUADO'].includes(values.tipoMiembro) && (
													<div className=' d-flex gap-1'>
														<FormGroup className=' w-50'>
															<Form.Control
																size='sm'
																type='text'
																placeholder='Titulo'
																name='titulo'
																value={values.titulo}
																onChange={handleChange}
																onBlur={handleBlur}
															/>
														</FormGroup>

														<FormSelect
															size='sm'
															aria-label='Default select example'
															name='unidadAcademica'
															className=' text-wrap w-50'
															value={values.idUnidadAcademica}
															onChange={handleChange}
															onBlur={handleBlur}
														>
															<option
																style={{
																	whiteSpace: 'nowrap',
																	overflow: 'hidden',
																	textOverflow: 'ellipsis',
																}}
															>
																Unidad Academica
															</option>
															<option value='1'>One</option>
															<option value='2'>Two</option>
															<option value='3'>Three</option>
														</FormSelect>
													</div>
												)}
												{['DOCENTE'].includes(values.tipoMiembro) && (
													<div className=' d-flex gap-1'>
														<FormSelect
															size='sm'
															aria-label='Default select example'
															name='categoria'
															value={values.categoriaDocente}
															onChange={handleChange}
															onBlur={handleBlur}
														>
															<option>Categoria</option>
															<option value='ADJUNTO'>Adjunto</option>
															<option value='ASOCIADO'>Asociado</option>
															<option value='AYUDANTE'>Ayudante</option>
															<option value='JTP'>JTP</option>
															<option value='TITULAR'>Titular</option>
														</FormSelect>

														<FormSelect
															size='sm'
															aria-label='Default select example'
															name='dedicacion'
															value={values.categoriaDedicacion}
															onChange={handleChange}
															onBlur={handleBlur}
														>
															<option>Dedicacion</option>
															<option value='EXCLUSIVA'>Exclusiva</option>
															<option value='EXCLUSIVA_B'>Exclusiva B</option>
															<option value='SEMI_EXCLUSIVA'>Semiexclusiva</option>
															<option value='SIMPLE'>Simple</option>
														</FormSelect>
													</div>
												)}
												{['ESTUDIANTE'].includes(values.tipoMiembro) && (
													<FormSelect
														size='sm'
														aria-label='Default select example'
														name='periodo'
														value={values.periodoLectivo}
														onChange={handleChange}
														onBlur={handleBlur}
													>
														<option>Periodo lectivo</option>
														<option value='INICIAL'>Ciclo Inicial</option>
														<option value='SUPERIOR'>Ciclo Superior</option>
													</FormSelect>
												)}
												{['NO_DOC'].includes(values.tipoMiembro) && (
													// TODO: Agregar valores de areas y unidades academicas y los select de c/u
													<FormGroup className=' ms-1'>
														<Form.Check
															inline
															label='Áreas unl'
															type='radio'
															name='noDoc'
															style={{ fontSize: '14px' }}
															values={1}
															checked={values.idArea === 1}
															onChange={handleChange}
														/>
														<Form.Check
															inline
															label='Unidad Académica'
															type='radio'
															name='noDoc'
															values={2}
															checked={values.idArea === 2}
															onChange={handleChange}
															style={{ fontSize: '14px' }}
														/>
													</FormGroup>
												)}
												<Form.Group>
													<Form.Control
														size='sm'
														as='textarea'
														placeholder='Observaciones'
														name='observ'
														value={values.observ}
														onChange={handleChange}
														onBlur={handleBlur}
														rows={3}
													/>
												</Form.Group>
											</>
										)}
										<Button
											variant='primary'
											size='sm'
											className=' ms-auto mt-auto mb-2 '
											type='submit'
										>
											Agregar
										</Button>
									</Container>
								</Form>
							);
						}}
					</Formik>
				</div>
				<ModalMember
					show={show}
					handleClose={handleClose}
					memberList={members}
					handleRoles={handleRoles}
				/>
			</div>
			<Button variant='success' className=' mb-2 align-self-center '>
				Guardar
			</Button>
		</div>
	);
};

export default FormMembers;
