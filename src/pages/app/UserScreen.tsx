import FormInput from '@/components/Common/FormInput';
import CommonTitle from '@/components/Common/Text/CommonTitle';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

interface userData {
	nom: string;
	ape: string;
	tel: string;
	dir: string;
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
	dir: {
		required: 'La dirección es obligatoria',
		minLength: {
			value: 5,
			message: 'La dirección debe tener al menos 5 caracteres',
		},
	},
	tel: {
		required: 'El teléfono es obligatorio',
		pattern: {
			value: /^[0-9]{10}$/,
			message: 'El teléfono debe tener 10 dígitos',
		},
	},
};

const UserScreen = () => {
	const { control, handleSubmit } = useForm<userData>();

	const handleUpdate: SubmitHandler<userData> = async (values) => {
		console.log(values);
	};

	return (
		<div className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
			<div
				className='container-sm p-4 border rounded bg-white shadow-lg'
				style={{ maxWidth: '600px' }}
			>
				<CommonTitle textAlign='center' underline bold padding='1rem'>
					Información Personal
				</CommonTitle>

				<Form onSubmit={handleSubmit(handleUpdate)} className='p-3' noValidate>
					<Row className='mb-3'>
						<Col md={6}>
							<FormInput control={control} name='nom' label='Nombre' rules={validationRules.nom} />
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
								name='dir'
								label='Dirección'
								rules={validationRules.dir}
							/>
						</Col>
					</Row>
					<div className='d-flex justify-content-center mt-4'>
						<Button type='submit' className='btn btn-primary-custom'>
							Actualizar
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default UserScreen;
