import { useEffect, useState } from 'react';
import { Form, FormSelect, Modal } from 'react-bootstrap';
import { IntegranteEquipoProps } from '../../../../types/ProjectsProps';

interface ModalMemberProps {
	show: boolean;
	handleClose: () => void;
	memberList: IntegranteEquipoProps[];
	handleRoles: (memberList: IntegranteEquipoProps[]) => void;
}

interface importanRolesProps {
	director: string | null;
	coDirector: string | null;
	coordinador: string | null;
	respFinanciero: string | null;
	Especialista: string[] | null;
}

export const ModalMember = ({ show, handleClose, memberList, handleRoles }: ModalMemberProps) => {
	const [importanRoles, setImportanRoles] = useState<importanRolesProps>({
		director: null,
		coDirector: null,
		coordinador: null,
		respFinanciero: null,
		Especialista: null,
	});

	useEffect(() => {
		console.log(' memberList:  t');
		const addRolesToMembers = () => {
			if (memberList.length > 0) {
				const updatedMembers = memberList.map((member) => {
					if (importanRoles.director === member.dni && !member.lrol.includes('Director')) {
						return { ...member, lrol: [...member.lrol, 'Director'] };
					} else if (
						importanRoles.coDirector === member.dni &&
						!member.lrol.includes('Co-Director')
					) {
						return { ...member, lrol: [...member.lrol, 'Co-Director'] };
					} else if (
						importanRoles.coordinador === member.dni &&
						!member.lrol.includes('Coordinador')
					) {
						return { ...member, lrol: [...member.lrol, 'Coordinador'] };
					} else if (
						importanRoles.respFinanciero === member.dni &&
						!member.lrol.includes('Responsable Financiero')
					) {
						return { ...member, lrol: [...member.lrol, 'Responsable Financiero'] };
					} else if (
						importanRoles.Especialista?.includes(member.dni) &&
						!member.lrol.includes('Especialista')
					) {
						return { ...member, lrol: [...member.lrol, 'Especialista'] };
					} else {
						return member;
					}
				});

				handleRoles(updatedMembers);
			}
		};

		addRolesToMembers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [importanRoles]);

	return (
		<Modal show={show} onHide={handleClose} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
							{memberList.length > 0 &&
								memberList?.map((member: IntegranteEquipoProps) => (
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
							{memberList.length > 0 &&
								memberList?.map((member: IntegranteEquipoProps) => (
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
							onChange={(e) => setImportanRoles({ ...importanRoles, coordinador: e.target.value })}
						>
							<option>Seleccione un Coordinador</option>
							{memberList.length > 0 &&
								memberList?.map((member: IntegranteEquipoProps) => (
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
							{memberList.length > 0 &&
								memberList?.map((member: IntegranteEquipoProps) => (
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
							{memberList.length > 0 &&
								memberList?.map((member: IntegranteEquipoProps) => (
									<option key={member.dni} value={member.dni}>
										{member.nom}
									</option>
								))}
						</FormSelect>
					</Form.Group>
				</Form>
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
