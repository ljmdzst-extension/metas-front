import { useEffect, useState } from 'react';
import { Button, Form, FormSelect, Modal, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { IntegranteEquipoProps } from '../../../types/ProjectsProps';
import { ModalMember } from './components/ModalMember';

interface importanRolesProps {
	director: string | null;
	coDirector: string | null;
	coordinador: string | null;
	respFinanciero: string | null;
	Especialista: string[] | null;
}
const FormMembers = () => {
	const [members, setMembers] = useState<IntegranteEquipoProps[]>([]);
	const [show, setShow] = useState(false);
	const [importanRoles, setImportanRoles] = useState<importanRolesProps>({
		director: null,
		coDirector: null,
		coordinador: null,
		respFinanciero: null,
		Especialista: null,
	});

	const handleClose = () => setShow(false);
	const addMember = (memberData: IntegranteEquipoProps) => {
		setMembers([...members, memberData]);
	};

	useEffect(() => {
		const addRolesToMembers = () => {
			if (members.length > 0) {
				const updatedMembers = members.map((member) => {
					if (importanRoles.director === member.dni) {
						return { ...member, lrol: ['Director'] };
					} else if (importanRoles.coDirector === member.dni) {
						return { ...member, lrol: ['Co-Director'] };
					} else if (importanRoles.coordinador === member.dni) {
						return { ...member, lrol: ['Coordinador'] };
					} else if (importanRoles.respFinanciero === member.dni) {
						return { ...member, lrol: ['Responsable Financiero'] };
					} else if (importanRoles.Especialista?.includes(member.dni)) {
						return { ...member, lrol: ['Especialista'] };
					} else {
						return member;
					}
				});

				setMembers(updatedMembers);
			}
		};

		addRolesToMembers();
	}, [importanRoles, members]);

	return (
		<>
			<div className=' d-flex gap-2 h-100'>
				<div className=' w-50 d-flex flex-column align-items-end'>
					<Table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Correo</th>
								<th>UA</th>
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
											<td>{member.unidadAcademica}</td>
											<td>
												<button>Eliminar</button>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td colSpan={4}>No hay miembros cargados</td>
								</tr>
							)}
						</tbody>
					</Table>
					<Button variant='primary' className=' mb-2 mt-auto ' onClick={() => setShow(true)}>
						Agregar
					</Button>
				</div>
				<div className=' w-50'>
					<Form>
						<Form.Group>
							<Form.Label>Director</Form.Label>
							<FormSelect
								aria-label='Default select example'
								name='director'
								value={importanRoles.director ?? ''}
								onChange={(e) => setImportanRoles({ ...importanRoles, director: e.target.value })}
							>
								<option>Seleccione un director</option>
								{members.length > 0 &&
									members?.map((member: IntegranteEquipoProps) => (
										<option key={member.dni} value={member.dni}>
											{member.nom}
										</option>
									))}
							</FormSelect>
						</Form.Group>
						<Form.Group>
							<Form.Label>Co-Director</Form.Label>
							<FormSelect
								aria-label='Default select example'
								name='coDirector'
								value={importanRoles.coDirector ?? ''}
								onChange={(e) => setImportanRoles({ ...importanRoles, coDirector: e.target.value })}
							>
								<option>Seleccione un Co-Director</option>
								{members.length > 0 &&
									members?.map((member: IntegranteEquipoProps) => (
										<option key={member.dni} value={member.dni}>
											{member.nom}
										</option>
									))}
							</FormSelect>
						</Form.Group>
						<Form.Group>
							<Form.Label>Coordinador</Form.Label>
							<FormSelect
								aria-label='Default select example'
								name='coordinador'
								value={importanRoles.coordinador ?? ''}
								onChange={(e) =>
									setImportanRoles({ ...importanRoles, coordinador: e.target.value })
								}
							>
								<option>Seleccione un Coordinador</option>
								{members.length > 0 &&
									members?.map((member: IntegranteEquipoProps) => (
										<option key={member.dni} value={member.dni}>
											{member.nom}
										</option>
									))}
							</FormSelect>
						</Form.Group>
						<Form.Group>
							<Form.Label>Responsable Financiero</Form.Label>
							<FormSelect
								aria-label='Default select example'
								name='respFinanciero'
								value={importanRoles.respFinanciero ?? ''}
								onChange={(e) =>
									setImportanRoles({ ...importanRoles, respFinanciero: e.target.value })
								}
							>
								<option>Seleccione un Responsable Financiero</option>
								{members.length > 0 &&
									members?.map((member: IntegranteEquipoProps) => (
										<option key={member.dni} value={member.dni}>
											{member.nom}
										</option>
									))}
							</FormSelect>
						</Form.Group>
						<Form.Group>
							<Form.Label>Especialistas</Form.Label>
							<FormSelect
								aria-label='Default select example'
								name='Especialista'
								value={importanRoles.Especialista ?? ''}
								onChange={(e) =>
									setImportanRoles({ ...importanRoles, Especialista: [e.target.value] })
								}
							>
								<option>Seleccione un Especialista</option>
								{members.length > 0 &&
									members?.map((member: IntegranteEquipoProps) => (
										<option key={member.dni} value={member.dni}>
											{member.nom}
										</option>
									))}
							</FormSelect>
						</Form.Group>
					</Form>
				</div>
			</div>
			<ModalMember show={show} handleClose={handleClose} submitMember={addMember} />
		</>
	);
};

export default FormMembers;
