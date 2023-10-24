import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../redux/actions/authAction';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../../redux/store';
import Swal from 'sweetalert2';

interface FormLoginProps {
	email: string;
	password: string;
}

const initialValues: FormLoginProps = {
	email: '',
	password: '',
};

const FormLogin = () => {
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const validations = Yup.object().shape({
		email: Yup.string().email().required('Campo requerido'),
		password: Yup.string().required('Campo requerido'),
	});

	const handleLogin = async (values: any) => {
		const action = await dispatch(loginAsync({ email: values.email, pass: values.password }));
		if (loginAsync.rejected.match(action)) {
			const { error } = action.payload as { error: string };
			Swal.fire({
				title: 'Error!',
				text: `${error}`,
				icon: 'error',
				confirmButtonText: 'Ok',
			});
		} else {
			const { token, nom, ape } = action.payload as { token: string, nom: string, ape: string };
			localStorage.setItem('token', token);
			localStorage.setItem('user', `${nom} ${ape}`);
			Swal.fire({
				title: 'Bienvenido!',
				text: `${nom} ${ape}`,
				icon: 'success',
				confirmButtonText: 'Ok',
				timer: 2000,
			});
			navigate('/');
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values) => {
				handleLogin(values);
			}}
			validationSchema={validations}
		>
			{({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => {
				return (
					<Form onSubmit={handleSubmit} className=' border rounded p-5 bg-color-slate  ' noValidate>
						<p className='mb-4'>Ingrese sus datos de usuario.</p>
						<Form.Group className=' position-relative mb-4 d-flex justify-content-center'>
							<Form.Control
								type='email'
								placeholder='Ingrese su email'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								isInvalid={!!errors.email && touched.email}
								aria-describedby='inputGroupPrepend'
								className='w-50'
							/>
							<Form.Control.Feedback type='invalid' tooltip>
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='position-relative mb-4 d-flex justify-content-center'>
							<Form.Control
								type='password'
								placeholder='Ingrese su contraseña'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								isInvalid={!!errors.password && touched.password}
								className='w-50'
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

						<div>
							<p className='mt-4'>
								¿No tienes cuenta?{' '}
								<Link
									to='/register'
									style={{ color: '#08473f' }}
									className='text-decoration-underline'
								>
									Registrate
								</Link>
							</p>

							<p>
								Si olvidó su contraseña, comuníquese con Mesa de Ayuda{' '}
								<Link
									to='mailto:gestor.extunl@gmail.com'
									style={{ color: '#08473f' }}
									className='text-decoration-underline'
								>
									gestor.extunl@gmail.com
								</Link>
								.
							</p>

							<p>
								Para mayor información, ingrese a{' '}
								<Link to='' style={{ color: '#08473f' }} className=' text-decoration-underline'>
									Seccion de ayuda
								</Link>
								.
							</p>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default FormLogin;
