import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '@/redux/actions/authAction';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '@/redux/store';
import Swal from 'sweetalert2';
import useAlert from '@/hooks/useAlert';
import FormInput from '@/components/Common/FormInput';

interface FormLoginProps {
	email: string;
	password: string;
}

const initialValues: FormLoginProps = {
	email: '',
	password: '',
};

const validationRules = {
	email: {
		required: 'Email es requerido',
		pattern: {
			value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			message: 'Email inválido',
		},
	},
	password: { required: 'Contraseña es requerida' },
};

const FormLogin = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading, isLogged } = useSelector((state: RootState) => state.authSlice);

	const navigate = useNavigate();
	const { errorAlert } = useAlert();

	useEffect(() => {
		if (isLogged) {
			navigate('/gestion');
		}
	}, [isLogged, navigate]);

	const { control, handleSubmit } = useForm<FormLoginProps>({
		defaultValues: initialValues,
	});

	const handleLogin: SubmitHandler<FormLoginProps> = async (values) => {
		const action = await dispatch(loginAsync({ email: values.email, pass: values.password }));
		if (loginAsync.rejected.match(action)) {
			const { error } = action.payload as { error: string };
			errorAlert(error);
		} else {
			const { token, nom, ape, permisos, areas } = action.payload as {
				token: string;
				nom: string;
				ape: string;
				permisos: string[];
				areas: number[];
			};
			localStorage.setItem('token', token);
			localStorage.setItem('user', `${nom} ${ape}`);
			localStorage.setItem('permisos', JSON.stringify(permisos));
			localStorage.setItem('areas', JSON.stringify(areas));

			Swal.fire({
				title: 'Bienvenido!',
				text: `${nom} ${ape}`,
				icon: 'success',
				confirmButtonText: 'Ok',
				timer: 2000,
			});
			navigate('/gestion');
		}
	};

	return (
		<Form
			onSubmit={handleSubmit(handleLogin)}
			className='border rounded p-5 bg-color-slate'
			noValidate
		>
			<p className='mb-4'>Ingrese sus datos de usuario.</p>

			<FormInput
				control={control}
				name='email'
				label='Correo electrónico'
				type='email'
				rules={validationRules.email}
			/>
			<FormInput
				control={control}
				name='password'
				label='Contraseña'
				type='password'
				rules={validationRules.password}
			/>

			<div className='d-flex justify-content-center mt-2'>
				<Button variant='primary' type='submit' className='btn btn-primary' disabled={loading}>
					{loading ? 'Ingresando...' : 'Ingresar'}
				</Button>
			</div>

			<div>
				<p className='mt-4'>
					¿No tienes cuenta?{' '}
					<Link to='/register' style={{ color: '#08473f' }} className='text-decoration-underline'>
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
};

export default FormLogin;
