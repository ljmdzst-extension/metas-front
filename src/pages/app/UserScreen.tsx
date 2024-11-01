import FormInput from '@/components/Common/FormInput';
import LoadingSpinner from '@/components/Common/Spinner/LoadingSpinner';
import CommonTitle from '@/components/Common/Text/CommonTitle';
import useAlert from '@/hooks/useAlert';
import { getPersonaUserData, updatePersonaUserData } from '@/services';
import { Persona } from '@/types/UserProps';
import { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

interface userData {
	nom: string;
	ape: string;
	tel: string;
	dom: string;
	nroDoc: string;
	tipoDoc: number;
	email: string;
	ciudad: string;
	provincia: string;
	pais: string;
}

const validationRules = {
	nom: {
		required: 'El nombre es obligatorio',
		pattern: {
			value: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
			message: 'El nombre solo puede contener letras y debe tener entre 2 y 40 caracteres',
		},
	},
	ape: {
		required: 'El apellido es obligatorio',
		pattern: {
			value: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
			message: 'El apellido solo puede contener letras y debe tener entre 2 y 40 caracteres',
		},
	},
	dom: {
		required: 'La dirección es obligatoria',
		minLength: {
			value: 5,
			message: 'La dirección debe tener al menos 5 caracteres',
		},
	},
	tel: {
		required: 'El teléfono es obligatorio',
		pattern: {
			value: /^[0-9]{7,10}$/,
			message: 'El teléfono debe tener entre 7 y 10 dígitos',
		},
	},
	email: {
		required: 'El email es obligatorio',
		pattern: {
			value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
			message: 'Debe ser un correo electrónico válido',
		},
	},
	ciudad: {
		required: 'La ciudad es obligatoria',
	},
	provincia: {
		required: 'La provincia es obligatoria',
	},
	pais: {
		required: 'El país es obligatorio',
	},
};

const UserScreen = () => {
	const [isLoading, setIsLoading] = useState(true);

	const { successAlert, errorAlert } = useAlert();
	const { control, handleSubmit, reset } = useForm<userData>();

	useEffect(() => {
		setIsLoading(true);
		const userData = localStorage.getItem('user');
		if (userData) {
			const { userId } = JSON.parse(userData);

			getPersonaUserData(userId)
				.then((res) => {
					if (res && res.ok) {
						const initialValues = {
							nom: res.data.nom ?? '',
							ape: res.data.ape ?? '',
							tel: res.data.tel ?? undefined,
							dom: res.data.dom ?? undefined,
							nroDoc: res.data.nroDoc ?? '',
							tipoDoc: res.data.tipoDoc ?? 0,
							email: res.data.email ?? undefined,
							ciudad: res.data.ciudad ?? '',
							provincia: res.data.provincia ?? '',
							pais: res.data.pais ?? '',
						};

						reset(initialValues);

						setIsLoading(false);
					} else {
						errorAlert('Error al cargar la información del usuario: ' + res.error);
						setIsLoading(false);
					}
				})
				.catch((error) => {
					errorAlert('Error al cargar la información del usuario: ' + error.message);
					setIsLoading(false);
				});
		} else {
			errorAlert('No se encontró el usuario en localStorage');
			setIsLoading(false);
		}
	}, [reset]);

	const handleUpdate: SubmitHandler<userData> = async (values) => {
		try {
			const userData = localStorage.getItem('user');
			if (!userData) {
				throw new Error('No se encontró el usuario en localStorage');
			}
			const { userId } = JSON.parse(userData);
			const response = await updatePersonaUserData(userId, values as Persona);

			if (response && response.ok) {
				successAlert('Información actualizada correctamente');
			}
		} catch (err) {
			errorAlert((err as Error).message);
		}
	};

	return (
		<div className='d-flex justify-content-center  '>
			<div
				className='container-sm p-4 my-4 border rounded bg-white shadow-lg'
				style={{ maxWidth: '600px' }}
			>
				<CommonTitle textAlign='center' underline bold padding='1rem'>
					Información Personal
				</CommonTitle>
				{isLoading ? (
					<div className=' h-100 d-flex justify-content-center'>
						<LoadingSpinner />
					</div>
				) : (
					<Form onSubmit={handleSubmit(handleUpdate)} className='p-3' noValidate>
						{/* TODO: mostrar y bloquear
					<Row className='mb-3'>
						<Col md={6}>
							<FormInput control={control} name='nroDoc' label='Número de Documento' rules={validationRules.nroDoc} />
						</Col>
						<Col md={6}>
							<FormInput control={control} name='tipoDoc' label='Tipo de Documento' rules={validationRules.tipoDoc} />
						</Col>
					</Row> */}
						<Row className='mb-3'>
							<Col md={6}>
								<FormInput
									control={control}
									name='nom'
									label='Nombre'
									rules={validationRules.nom}
								/>
							</Col>
							<Col md={6}>
								<FormInput
									control={control}
									name='ape'
									label='Apellido'
									rules={validationRules.ape}
								/>
							</Col>
						</Row>
						<Row className='mb-3'>
							<Col md={6}>
								<FormInput
									control={control}
									name='tel'
									label='Teléfono'
									rules={validationRules.tel}
								/>
							</Col>
							<Col md={6}>
								<FormInput
									control={control}
									name='dom'
									label='Dirección'
									rules={validationRules.dom}
								/>
							</Col>
						</Row>
						<Row className='mb-3'>
							<Col md={6}>
								<FormInput
									control={control}
									name='email'
									label='Email'
									rules={validationRules.email}
								/>
							</Col>
							<Col md={6}>
								<FormInput
									control={control}
									name='ciudad'
									label='Ciudad'
									rules={validationRules.ciudad}
								/>
							</Col>
						</Row>
						<Row className='mb-3'>
							<Col md={6}>
								<FormInput
									control={control}
									name='provincia'
									label='Provincia'
									rules={validationRules.provincia}
								/>
							</Col>
							<Col md={6}>
								<FormInput
									control={control}
									name='pais'
									label='País'
									rules={validationRules.pais}
								/>
							</Col>
						</Row>
						<div className='d-flex justify-content-center mt-4'>
							<Button type='submit' className='btn btn-primary-custom'>
								Actualizar
							</Button>
						</div>
					</Form>
				)}
			</div>
		</div>
	);
};

export default UserScreen;
