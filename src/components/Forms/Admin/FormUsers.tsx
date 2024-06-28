import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormInput from '@/components/Common/FormInput';

const MySwal = withReactContent(Swal);

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
	onClose: () => void;
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

const FormUsers: React.FC<FormUsersProps> = ({ userData, onSave, onClose }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const { handleSubmit, control, reset, formState } = useForm<User>({
		defaultValues: userData,
	});

	const onSubmit = (data: User) => {
		onSave(data);
		reset(data);
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClose = () => {
		if (formState.isDirty) {
			MySwal.fire({
				title: '¿Estás seguro?',
				text: 'Tienes cambios no guardados. ¿Seguro que deseas cerrar?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Sí, cerrar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					onClose();
				}
			});
		} else {
			onClose();
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className=' d-flex flex-column h-100'>
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
					<Form.Group controlId='formPass' className=' mb-2'>
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
			<Form.Group controlId='formRoles' className=' mb-2'>
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
			<div className='d-flex justify-content-end mt-2 gap-2 mt-auto'>
				<Button variant='secondary' size='sm' className='mr-2' onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant='primary' size='sm' type='submit'>
					Guardar
				</Button>
			</div>
		</Form>
	);
};

export default FormUsers;
