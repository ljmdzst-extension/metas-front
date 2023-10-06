import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { login } from '../../redux/reducers/AuthReducer';

const FormLogin = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const validations = Yup.object().shape({
		email: Yup.string().email('El campo debe ser un correo valido').required('Campo requerido'),
		password: Yup.string().required('Campo requerido'),
	});

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			onSubmit={(values) => {
				//BORRAR ESTO EQUIS DE
				if (values.email === 'admin@admin.com' && values.password === 'admin') {
					dispatch(login({ user: 'admin', token: 'token1234' }));
					navigate('/');
				}

				console.log(values);
			}}
			validationSchema={validations}
		>
			{({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => {
				return (
					<Form
						onSubmit={handleSubmit}
						className=' w-25 border rounded p-5 bg-color-slate  '
						noValidate
					>
						<Form.Group className=' position-relative mb-5'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Ingrese su email'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								isInvalid={!!errors.email && touched.email}
								aria-describedby='inputGroupPrepend'
							/>
							<Form.Control.Feedback type='invalid' tooltip>
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className=' position-relative mb-5'>
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type='password'
								placeholder='Ingrese su password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								isInvalid={!!errors.password && touched.password}
							/>
							<Form.Control.Feedback type='invalid' tooltip>
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>
						<div className='d-flex justify-content-center'>
							<Button type='submit' className='btn btn-primary'>
								Iniciar
							</Button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default FormLogin;
