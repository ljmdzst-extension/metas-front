import React, { useState } from 'react';
import { Col, Form, FormGroup, FormSelect, Modal, Row } from 'react-bootstrap';
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
					<>
						<p>Formulario de {memberType}</p>
						<Form className='mt-3'>
							<Form.Group>
								<Form.Control type='text' placeholder='DNI' />
							</Form.Group>
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
							<Form.Group>
								<Form.Control type='email' placeholder='Email' />
							</Form.Group>
							{/* Si el miembro es docente, graduado, no doc- no univ */}
							{ memberType === 'doc' || memberType === 'grad' || memberType === 'noDoc' || memberType === 'noUni' && (<></>)}
						</Form>
					</>
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
