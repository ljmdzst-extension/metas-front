import { useEffect } from 'react';
import { Container, Image, Navbar, Nav } from 'react-bootstrap';
import LogoutIcon from '../../../assets/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { logout, setUserData } from '../../../redux/reducers/AuthReducer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
	const { user } = useSelector((state: RootState) => state.authSlice);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem('user') ?? '';
		const token = localStorage.getItem('token') ?? '';
		dispatch(setUserData({ user, token }));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(logout());
		Swal.fire({
			title: 'Sesión cerrada',
			text: 'La sesión se ha cerrado correctamente',
			icon: 'success',
			confirmButtonText: 'Ok',
			timer: 2000,
		});
		navigate('/');
	};

	return (
		<Navbar className='NavBar'>
			<Container>
				<Navbar.Brand>
					<a href='https://www.unl.edu.ar/'>
						<Image
							src='../assets/img/unl_identidad.svg'
							alt='UNL Logo'
							width='30'
							height='30'
							className='me-2'
						/>{' '}
					</a>
					<a href='/'>Secretaría de extensión y cultura</a>
				</Navbar.Brand>
				<Nav>
					{user ? (
						<>
							<p className=' text-white m-auto bold me-2'>Usuario: {user}</p>
							<LogoutIcon
								width={30}
								height={30}
								fill='#fff'
								stroke='#fff'
								className='me-2 logout-icon'
								onClick={handleLogout}
							/>
						</>
					) : (
						<>
							<Nav.Link href='/login'>Iniciar Sesión</Nav.Link>
							<Nav.Link href='/register'>Registrarse</Nav.Link>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
