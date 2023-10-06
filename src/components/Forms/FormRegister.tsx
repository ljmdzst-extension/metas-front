import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Form,Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormRegister = () => {
	const validations = Yup.object().shape({
		DNI: Yup.string().required('Campo requerido'),
		lastName: Yup.string().required('Campo requerido'),
		name: Yup.string().required('Campo requerido'),
		email: Yup.string().email('El campo debe ser un correo valido').required('Campo requerido'),
		ua: Yup.string().required('Campo requerido'),
		password: Yup.string().required('Campo requerido'),
		confirmPassword: Yup.string().required('Campo requerido'),
	});

	return (
		<Formik
			initialValues={{
				DNI: '',
				lastName: '',
				name: '',
				email: '',
				ua: '',
				password: '',
				confirmPassword: '',
			}}
			onSubmit={(values) => {
				console.log(values);
			}}
			validationSchema={validations}
		>
			{({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => {
				return (
					<Form onSubmit={handleSubmit} className='border rounded p-5 bg-color-slate' noValidate>
						<p>Complete con sus datos</p>
						<Row>
							<Col>
								<Form.Group className='position-relative mb-4'>
									<Form.Control
										type='text'
										placeholder='DNI'
										name='DNI'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.DNI}
										isInvalid={!!errors.DNI && touched.DNI}
										aria-describedby='inputGroupPrepend'
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.DNI}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col></Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='text'
										placeholder='Nombre'
										name='name'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										isInvalid={!!errors.name && touched.name}
										aria-describedby='inputGroupPrepend'
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.name}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='text'
										placeholder='Apellido'
										name='lastName'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.lastName}
										isInvalid={!!errors.lastName && touched.lastName}
										aria-describedby='inputGroupPrepend'
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.lastName}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className=' position-relative mb-4'>
							<Form.Control
								type='email'
								placeholder=' email'
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

						<Form.Group className=' position-relative mb-4'>
							<Form.Control
								type='text'
								placeholder='Unidad académica'
								name='ua'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.ua}
								isInvalid={!!errors.ua && touched.ua}
								aria-describedby='inputGroupPrepend'
							/>
							<Form.Control.Feedback type='invalid' tooltip>
								{errors.ua}
							</Form.Control.Feedback>
						</Form.Group>

						<Row>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='password'
										placeholder='Contraseña'
										name='password'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										isInvalid={!!errors.password && touched.password}
									/>
									<Form.Control.Feedback type='invalid' tooltip className='   '>
										{errors.password}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='password'
										placeholder='Confirmar contraseña'
										name='confirmPassword'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.confirmPassword}
										isInvalid={!!errors.confirmPassword && touched.confirmPassword}
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.confirmPassword}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<div className='d-flex justify-content-center'>
							<Button type='submit' className='btn btn-primary'>
								Registrarse
							</Button>
						</div>

						<div className=' mt-4'>
							<p>Una vez registrado, se le enviará un mail para validar el registro.</p>
							<p>
								Ya posee un usuario? Ingrese{' '}
								<Link
									to={'/login'}
									style={{ color: '#08473f' }}
									className=' text-decoration-underline'
								>
									aqui
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

export default FormRegister;
