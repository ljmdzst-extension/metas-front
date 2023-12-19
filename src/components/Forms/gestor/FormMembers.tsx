import { useState } from 'react';

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

const FormMembers = () => {
	const [members, setMembers] = useState<IntegranteEquipoProps[]>([]);
	const [memberType, setMemberType] = useState('');

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	// const addMember = (memberData: IntegranteEquipoProps) => {
	// 	setMembers([...members, memberData]);
	// };

	const handleMemberType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMemberType(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log('submit');
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const newMember: IntegranteEquipoProps = {
			dni: formData.get('dni') as string,
			nom: formData.get('nom') as string,
			ape: formData.get('ape') as string,
			dom: formData.get('dom') as string,
			tel: formData.get('tel') as string,
			email: formData.get('email') as string,
			lrol: [],
			idUnidadAcademica: parseInt(formData.get('unidadAcademica') as string, 10),
			titulo: (formData.get('titulo') as string) || '',
			periodoLectivo: (formData.get('periodo') as string) || null,
			categoriaDocente: (formData.get('categoria') as string) || null,
			categoriaDedicacion: (formData.get('dedicacion') as string) || null,
			tieneTarjeta: parseInt(formData.get('precargable') as string, 10),
			idArea: parseInt(formData.get('noDoc') as string, 10),
			observ: '',
		};

		setMembers([...members, newMember]);
		console.log('usuario: ' + newMember.nom + ' ' + newMember.ape + ' agregado');

		e.currentTarget.reset();
	};

	const handleDelete = (dni: string) => {
		const updatedMembers = members.filter((member) => member.dni !== dni);
		setMembers(updatedMembers);
	};

	const handleRoles = (listMember: IntegranteEquipoProps[]) => {
		setMembers(listMember);
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
					className=' p-1 d-flex flex-column'
					style={{
						width: '40%',
						border: '1px solid #c2c2c2',
						borderRadius: '5px',
						background: '#e8e8e8',
					}}
				>
					<Form className='mt-2 h-100 ' onSubmit={(e) => handleSubmit(e)}>
						<Container className=' d-flex flex-column justify-content-start h-100 gap-1'>
							<Row>
								<Col>
									<InputGroup size='sm'>
										<Form.Control size='sm' type='text' placeholder='DNI' name='dni' />
										<Button variant='outline-secondary' size='sm'>
											<Search />
										</Button>
									</InputGroup>
								</Col>
								<Col> </Col>
							</Row>
							<Row>
								<Col>
									<FormGroup>
										<FormSelect
											aria-label='Default select example'
											name='memberType'
											size='sm'
											onChange={handleMemberType}
										>
											<option value=''>Tipo de miembro</option>
											<option value='doc'>Docente</option>
											<option value='est'>Estudiante</option>
											<option value='grad'>Graduado</option>
											<option value='noDoc'>No Docente</option>
											<option value='noUni'>No Universitario</option>
										</FormSelect>
									</FormGroup>
								</Col>
								<Col></Col>
							</Row>
							<Row>
								<Col>
									<Form.Group>
										<Form.Control size='sm' type='text' placeholder='Nombre' name='nom' />
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Control size='sm' type='text' placeholder='Apellido' name='ape' />
									</Form.Group>
								</Col>
							</Row>

							<Form.Group>
								<Form.Control size='sm' type='text' placeholder='Domicilio' name='dom' />
							</Form.Group>

							<Form.Group>
								<Form.Control size='sm' type='text' placeholder='Telefono' name='tel' />
							</Form.Group>

							<Form.Group>
								<Form.Control size='sm' type='email' placeholder='Email' name='email' />
							</Form.Group>
							{memberType && (
								<>
									{['doc', 'grad', 'noDoc', 'noUni'].includes(memberType) && (
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
												/>
												<Form.Check
													inline
													label='No'
													style={{ fontSize: '14px' }}
													type='radio'
													name='precargable'
													value={0}
												/>
											</div>
										</FormGroup>
									)}
									{['doc', 'est', 'grad'].includes(memberType) && (
										<div className=' d-flex gap-1'>
											<FormGroup className=' w-50'>
												<Form.Control size='sm' type='text' placeholder='Titulo' name='titulo' />
											</FormGroup>

											<FormSelect
												size='sm'
												aria-label='Default select example'
												name='unidadAcademica'
												className=' text-wrap w-50'
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
									{['doc'].includes(memberType) && (
										<div className=' d-flex gap-1'>
											<FormSelect size='sm' aria-label='Default select example' name='categoria'>
												<option>Categoria</option>
												<option value='1'>Adjunto</option>
												<option value='2'>Asociado</option>
												<option value='3'>Ayudante</option>
												<option value='4'>JTP</option>
												<option value='5'>Titular</option>
											</FormSelect>

											<FormSelect size='sm' aria-label='Default select example' name='dedicacion'>
												<option>Dedicacion</option>
												<option value='1'>Exclusivo</option>
												<option value='2'>Exclusivo B</option>
												<option value='3'>Semiexclusivo</option>
												<option value='4'>Simple</option>
											</FormSelect>
										</div>
									)}
									{['est'].includes(memberType) && (
										<FormSelect size='sm' aria-label='Default select example' name='periodo'>
											<option>Periodo lectivo</option>
											<option value='1'>Ciclo Inicial</option>
											<option value='2'>Ciclo Superior</option>
										</FormSelect>
									)}
									{['noDoc'].includes(memberType) && (
										<FormGroup>
											<Form.Check inline label='Áreas unl' type='radio' name='noDoc' />
											<Form.Check inline label='Unidad Académica' type='radio' name='noDoc' />
										</FormGroup>
									)}
								</>
							)}
							<Button variant='primary' size='sm' className=' ms-auto mt-auto mb-1 ' type='submit'>
								Agregar
							</Button>
						</Container>
					</Form>
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
