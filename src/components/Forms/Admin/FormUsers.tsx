import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface User {
	id: number;
	nom: string;
	ape: string;
	email: string;
	pass: string;
	roles: string[];
	areas: number[];
	[key: string]: any;
}

interface FormUsersProps {
	userData: User;
	onSave: (userData: User) => void;
}

const FormUsers: React.FC<FormUsersProps> = ({ userData, onSave }) => {
	const [formData, setFormData] = useState<User>(userData);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSelectChange = (name: string, selectedOptions: any) => {
		const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
		setFormData({ ...formData, [name]: values });
	};

	const handleSave = () => {
		onSave(formData);
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form>
			<Row>
				<Col>
					<Form.Group controlId='formNom'>
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							size='sm'
							type='text'
							name='nom'
							value={formData.nom}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='formApe'>
						<Form.Label>Apellido</Form.Label>
						<Form.Control
							size='sm'
							type='text'
							name='ape'
							value={formData.ape}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group controlId='formEmail'>
						<Form.Label>Email</Form.Label>
						<Form.Control
							size='sm'
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='formPass'>
						<Form.Label>Contraseña</Form.Label>
						<div className='d-flex align-items-center'>
							<Form.Control
								size='sm'
								type={showPassword ? 'text' : 'password'}
								name='pass'
								value={formData.pass}
								onChange={handleChange}
							/>
							<IconButton onClick={toggleShowPassword} className='ml-2'>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</div>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group controlId='formRoles'>
				<Form.Label>Roles</Form.Label>
				<Select
					isMulti
					name='roles'
					options={roles.map((role) => ({ label: role, value: role }))}
					value={formData.roles.map((role) => ({ label: role, value: role }))}
					onChange={(selectedOptions) => handleSelectChange('roles', selectedOptions)}
				/>
			</Form.Group>
			<Form.Group controlId='formAreas'>
				<Form.Label>Áreas</Form.Label>
				<Select
					isMulti
					name='areas'
					options={areas.map((area) => ({ label: `Area ${area}`, value: area }))}
					value={formData.areas.map((area) => ({ label: `Area ${area}`, value: area }))}
					onChange={(selectedOptions) => handleSelectChange('areas', selectedOptions)}
				/>
			</Form.Group>
			<div className='d-flex justify-content-end mt-2'>
				<Button variant='primary' size='sm' onClick={handleSave}>
					Guardar
				</Button>
			</div>
		</Form>
	);
};

export default FormUsers;

const roles = ['Admin', 'User', 'Manager'];
const areas = [1, 2, 3];
