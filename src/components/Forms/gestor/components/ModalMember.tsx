import React, { useState } from 'react';
import { Col, Container, Form, FormGroup, FormSelect, Modal, Row } from 'react-bootstrap';
import { IntegranteEquipoProps } from '../../../../types/ProjectsProps';

interface ModalMemberProps {
	show: boolean;
	handleClose: () => void;
	editMember?: IntegranteEquipoProps;
	submitMember?: (memberData: IntegranteEquipoProps) => void;
}

export const ModalMember = ({ show, handleClose, editMember, submitMember }: ModalMemberProps) => {
	const [memberType, setMemberType] = useState('');

	const handleMemberType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMemberType(e.target.value);
	};
	return (
		<Modal show={show} onHide={handleClose} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FormGroup>
					<FormSelect
						aria-label='Default select example'
						name='memberType'
						onChange={handleMemberType}
					>
						<option>Seleccione un tipo de miembro</option>
						<option value='doc'>Docente</option>
						<option value='est'>Estudiante</option>
						<option value='grad'>Graduado</option>
						<option value='noDoc'>No Docente</option>
						<option value='noUni'>No Universitario</option>
					</FormSelect>
				</FormGroup>
				{memberType && (
					<Form className='mt-2'>
						<Container>
							<Row>
								<Col>
									<Form.Group>
										<Form.Control type='text' placeholder='DNI' />
									</Form.Group>
								</Col>
								<Col />
							</Row>
							<Row>
								<Col>
									<Form.Group>
										<Form.Control type='text' placeholder='Nombre' />
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Control type='text' placeholder='Apellido' />
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group>
										<Form.Control type='text' placeholder='Domicilio' />
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Control type='text' placeholder='Telefono' />
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group>
										<Form.Control type='email' placeholder='Email' />
									</Form.Group>
								</Col>
								<Col></Col>
							</Row>
							{['doc', 'grad', 'noDoc', 'noUni'].includes(memberType) && (
								<FormGroup>
									<Form.Label>Posee tarjeta precargable?</Form.Label>
									<Form.Check inline label='Si' type='radio' name='precargable' />
									<Form.Check inline label='No' type='radio' name='precargable' />
								</FormGroup>
							)}
							{['doc', 'est', 'grad'].includes(memberType) && (
								<Row>
									<Col>
										<FormGroup>
											<Form.Control type='text' placeholder='Titulo' />
										</FormGroup>
									</Col>
									<Col>
										<FormSelect aria-label='Default select example' name='unidadAcademica'>
											<option>Unidad Academica</option>
											<option value='1'>One</option>
											<option value='2'>Two</option>
											<option value='3'>Three</option>
										</FormSelect>
									</Col>
								</Row>
							)}
							{['doc'].includes(memberType) && (
								<Row>
									<Col>
										<FormSelect aria-label='Default select example' name='categoria'>
											<option>Categoria</option>
											<option value='1'>Adjunto</option>
											<option value='2'>Asociado</option>
											<option value='3'>Ayudante</option>
											<option value='4'>JTP</option>
											<option value='5'>Titular</option>
										</FormSelect>
									</Col>
									<Col>
										<FormSelect aria-label='Default select example' name='dedicacion'>
											<option>Dedicacion</option>
											<option value='1'>Exclusivo</option>
											<option value='2'>Exclusivo B</option>
											<option value='3'>Semiexclusivo</option>
											<option value='4'>Simple</option>
										</FormSelect>
									</Col>
								</Row>
							)}

							{['est'].includes(memberType) && (
								<Row>
									<Col>
										<FormSelect aria-label='Default select example' name='periodo'>
											<option>Periodo lectivo</option>
											<option value='1'>Ciclo Inicial</option>
											<option value='2'>Ciclo Superior</option>
										</FormSelect>
									</Col>
								</Row>
							)}
							{['noDoc'].includes(memberType) && (
								<Row>
									<Col>
										<FormGroup>
											<Form.Check inline label='Áreas unl' type='radio' name='noDoc' />
											<Form.Check inline label='Unidad Académica' type='radio' name='noDoc' />
										</FormGroup>
									</Col>
								</Row>
							)}
						</Container>
					</Form>
				)}
			</Modal.Body>
			<Modal.Footer>
				<button className='btn btn-secondary' onClick={handleClose}>
					Cerrar
				</button>
				<button className='btn btn-primary' onClick={handleClose}>
					Guardar
				</button>
			</Modal.Footer>
		</Modal>
	);
};
