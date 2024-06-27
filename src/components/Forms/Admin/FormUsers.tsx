import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

const roles = ['Admin', 'User', 'Manager'];
const areas = [1, 2, 3];

const validationRules = {
	nom: { required: 'Nombre es requerido' },
	ape: { required: 'Apellido es requerido' },
	email: {
		required: 'Email es requerido',
		pattern: {
			value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			message: 'Email inválido',
		},
	},
	pass: { required: 'Contraseña es requerida' },
};

const FormInput = ({ control, name, label, type = 'text', rules }: any) => (
	<Form.Group controlId={`form${name}`}>
		<Form.Label>{label}</Form.Label>
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<>
					<Form.Control size='sm' type={type} isInvalid={!!error} {...field} />
					<Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
				</>
			)}
		/>
	</Form.Group>
);

const FormUsers: React.FC<FormUsersProps> = ({ userData, onSave }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { handleSubmit, control } = useForm<User>({
		defaultValues: userData,
	});

	const onSubmit = (data: User) => {
		onSave(data);
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col>
					<FormInput control={control} name='nom' label='Nombre' rules={validationRules.nom} />
				</Col>
				<Col>
					<FormInput control={control} name='ape' label='Apellido' rules={validationRules.ape} />
				</Col>
			</Row>
			<Row>
				<Col>
					<FormInput
						control={control}
						name='email'
						label='Email'
						type='email'
						rules={validationRules.email}
					/>
				</Col>
				<Col>
					<Form.Group controlId='formPass'>
						<Form.Label>Contraseña</Form.Label>
						<div className='d-flex align-items-center'>
							<Controller
								name='pass'
								control={control}
								rules={validationRules.pass}
								render={({ field, fieldState: { error } }) => (
									<div>
										<Form.Control
											size='sm'
											type={showPassword ? 'text' : 'password'}
											isInvalid={!!error}
											{...field}
										/>
										<Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
									</div>
								)}
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
				<Controller
					name='roles'
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							isMulti
							options={roles.map((role) => ({ label: role, value: role }))}
							value={field.value.map((role: string) => ({ label: role, value: role }))}
							onChange={(selectedOptions) =>
								field.onChange(selectedOptions.map((option: any) => option.value))
							}
						/>
					)}
				/>
			</Form.Group>
			<Form.Group controlId='formAreas'>
				<Form.Label>Áreas</Form.Label>
				<Controller
					name='areas'
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							isMulti
							options={areas.map((area) => ({ label: `Area ${area}`, value: area }))}
							value={field.value.map((area: number) => ({ label: `Area ${area}`, value: area }))}
							onChange={(selectedOptions) =>
								field.onChange(selectedOptions.map((option: any) => option.value))
							}
						/>
					)}
				/>
			</Form.Group>
			<div className='d-flex justify-content-end mt-2'>
				<Button variant='primary' size='sm' type='submit'>
					Guardar
				</Button>
			</div>
		</Form>
	);
};

export default FormUsers;
