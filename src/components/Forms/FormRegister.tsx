import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Form, FormSelect, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RegisterProps } from '../../types/AuthProps';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { registerAsync } from '../../redux/actions/authAction';
import Swal from 'sweetalert2';

export interface UnidadesAcademicas {
	idUnidadAcademica: number;
	nom: string;
}

const FormRegister = () => {
	const [unidadesAcademicas, setUnidadesAcademicas] = React.useState([]);

	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useSelector((state: RootState) => state.authSlice);

	const validations = Yup.object().shape({
		dni: Yup.string().required('Campo requerido'),
		ape: Yup.string().required('Campo requerido'),
		nom: Yup.string().required('Campo requerido'),
		email: Yup.string().email('El campo debe ser un correo valido').required('Campo requerido'),
		pass: Yup.string().required('Campo requerido'),
		confirmPass: Yup.string()
			.required('Campo requerido')
			.oneOf([Yup.ref('pass')], 'Las contraseñas no coinciden'),
		idUnidadAcademica: Yup.number()
			.required('Campo requerido')
			.test('is-not-zero', 'Campo requerido', (value) => value !== 0)
			.typeError('Campo requerido')
			.positive('Campo requerido'),
	});

	const getUnidadesAcademicas = async () => {
		await fetch(`${import.meta.env.VITE_API_BASE_URL_AUTH}/bases/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setUnidadesAcademicas(data.data.unidadesAcademicas);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getUnidadesAcademicas();
	}, []);

	const handleRegister = async (values: RegisterProps) => {
		const action = await dispatch(registerAsync(values));
		if (registerAsync.rejected.match(action)) {
			const { error } = action.payload as { error: string };
			Swal.fire({
				title: 'Error!',
				text: `${error}`,
				icon: 'error',
				confirmButtonText: 'Ok',
			});
		} else {
			Swal.fire({
				title: 'Registro exitoso!',
				text: `Se le ha enviado un mail para validar el registro`,
				icon: 'success',
				confirmButtonText: 'Ok',
			});
		}
	};

	return (
		<Formik
			initialValues={
				{
					dni: '',
					ape: '',
					nom: '',
					email: '',
					idUnidadAcademica: -1,
					pass: '',
					confirmPass: '',
				} as RegisterProps
			}
			onSubmit={(values) => {
				handleRegister(values);
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
										name='dni'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.dni}
										isInvalid={!!errors.dni && touched.dni}
										aria-describedby='inputGroupPrepend'
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.dni}
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
										name='nom'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.nom}
										isInvalid={!!errors.nom && touched.nom}
										aria-describedby='inputGroupPrepend'
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.nom}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='text'
										placeholder='Apellido'
										name='ape'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.ape}
										isInvalid={!!errors.ape && touched.ape}
										aria-describedby='inputGroupPrepend'
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.ape}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className=' position-relative mb-4'>
							<Form.Control
								type='email'
								placeholder='Email'
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
							<FormSelect
								aria-label='Default select example'
								name='idUnidadAcademica'
								isInvalid={!!errors.idUnidadAcademica && touched.idUnidadAcademica}
								value={values.idUnidadAcademica}
								onChange={handleChange}
							>
								<option>Seleccione una unidad academica</option>
								{unidadesAcademicas.length > 0 &&
									unidadesAcademicas?.map((unidadAcademica: UnidadesAcademicas) => (
										<option
											key={unidadAcademica.idUnidadAcademica}
											value={unidadAcademica.idUnidadAcademica}
										>
											{unidadAcademica.nom}
										</option>
									))}
							</FormSelect>
						</Form.Group>
						<Row>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='password'
										placeholder='Contraseña'
										name='pass'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.pass}
										isInvalid={!!errors.pass && touched.pass}
									/>
									<Form.Control.Feedback type='invalid' tooltip className='   '>
										{errors.pass}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className=' position-relative mb-4'>
									<Form.Control
										type='password'
										placeholder='Confirmar contraseña'
										name='confirmPass'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.confirmPass}
										isInvalid={!!errors.confirmPass && touched.confirmPass}
									/>
									<Form.Control.Feedback type='invalid' tooltip>
										{errors.confirmPass}
									</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<div className='d-flex justify-content-center'>
							<Button variant='primary' type='submit' className='btn-primary' disabled={loading}>
								{loading ? 'Registrando...' : 'Registrarse'}
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
