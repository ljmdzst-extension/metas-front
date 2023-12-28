import { useState } from 'react';
import mockMembers from '../../../mock/memberListData.json';
import mockAreas from '../../../mock/areasData.json';

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
import { Delete, Search, Visibility } from '@mui/icons-material';
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
	const [mode, setMode] = useState<'add' | 'edit' | 'view'>('add');

	const [initialFormValues, setInitialFormValues] = useState<IntegranteEquipoProps>(initialValues);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

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
			console.log('encontrado');
			setInitialFormValues(currentMemberFound);
		} else {
			setInitialFormValues(initialValues);
		}
	};

	const checkDniUniqueness = (dni: string) => {
		const existMember = members.find((member) => member.dni === dni);
		return !!existMember;
	};

	const validations = Yup.object().shape({
		tipoDni: Yup.string().required('Campo requerido'),
		dni: Yup.string()
			.required('Campo requerido')
			.test('dniUnique', 'Ya existe un usuario con ese DNI', async (value) => {
				if (mode === 'edit') return true;
				const exist = await checkDniUniqueness(value);
				return !exist;
			}),
		nom: Yup.string().required('Campo requerido'),
		ape: Yup.string().required('Campo requerido'),
		dom: Yup.string().required('Campo requerido'),
		tel: Yup.string().required('Campo requerido'),
		email: Yup.string().email().required('Campo requerido'),
	});

	const handleCreate = () => {
		setInitialFormValues(initialValues);
		setMode('add');
	};

	const handleEdit = (dni: string) => {
		const currentMember = members.find((member) => member.dni === dni);
		if (currentMember) {
			setInitialFormValues(currentMember);
			setMode('edit');
		}
	};

	const handleVisibility = (dni: string) => {
		console.log('modod visible');
		const currentMember = members.find((member) => member.dni === dni);
		if (currentMember) {
			setInitialFormValues(currentMember);
			setMode('view');
		}
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
												<Visibility onClick={() => handleVisibility(member.dni)} />
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
						size='sm'
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
						onSubmit={(values, { resetForm }) => {
							if (mode === 'add') {
								setMembers([...members, values]);
								resetForm({ values: initialValues });
								setInitialFormValues(initialValues);
								console.log(' limpia');
							} else if (mode === 'edit') {
								const updatedMembers = members.map((member) => {
									if (member.dni === values.dni) {
										return values;
									}
									return member;
								});
								setMembers(updatedMembers);
								resetForm({ values: initialValues });
								setInitialFormValues(initialValues);
								setMode('add');
							}
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
													disabled={mode === 'view'}
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
														disabled={mode === 'view'}
														size='sm'
													/>
													<Button
														variant='outline-secondary'
														onClick={() => handleSearch(values.tipoDni, values.dni)}
														disabled={mode === 'view'}
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
														disabled={mode === 'view'}
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
														disabled={mode === 'view'}
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
														disabled={mode === 'view'}
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
														disabled={mode === 'view'}
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
														disabled={mode === 'view'}
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
												disabled={mode === 'view'}
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
																disabled={mode === 'view'}
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
															disabled={mode === 'view'}
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
															disabled={mode === 'view'}
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
															disabled={mode === 'view'}
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
														disabled={mode === 'view'}
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
													<FormSelect
														disabled={mode === 'view'}
														size='sm'
														name='idArea'
														value={values.idArea}
														onChange={handleChange}
														isInvalid={!!errors.idArea && touched.idArea}
													>
														<option>Seleccione el área académica al que pertenece</option>
														{mockAreas.length ? (
															mockAreas.map((area) => (
																<option
																	key={`${area.nom}-${area.idRelacion}`}
																	value={area.idRelacion}
																>
																	{area.nom}
																</option>
															))
														) : (
															<option value=''>Error en la conexion con la base de datos</option>
														)}
													</FormSelect>
												)}
												<Form.Group>
													<Form.Control
														disabled={mode === 'view'}
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
											className={' ms-auto mt-auto mb-2 ' + (mode === 'view' ? 'd-none' : '')}
											type='submit'
										>
											{mode === 'add' ? 'Agregar' : 'Guardar'}
										</Button>
										<div
											className={
												'd-flex justify-content-end gap-2 mb-2 mt-auto ' +
												(mode === 'view' ? '' : 'd-none')
											}
										>
											<Button variant='primary' size='sm' onClick={() => handleEdit(values.dni)}>
												Editar
											</Button>
											<Button variant='primary' size='sm' onClick={handleCreate}>
												Cerrar
											</Button>
										</div>
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
