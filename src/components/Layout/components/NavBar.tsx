import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

import { logout } from '../../../redux/reducers/AuthReducer';

import { Container, Image, Navbar, Nav, Button } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';

export default function NavBar() {
	const { isLogged } = useSelector((state: RootState) => state.authSlice);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

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
					{isLogged ? (
						<>
							<Nav.Link href='/gestion'>
								<Button variant='outline-light'>Gestión</Button>
							</Nav.Link>
							<Nav.Link
								onClick={handleLogout}
								className=' d-flex flex-column justify-content-center'
							>
								<LogoutIcon />
							</Nav.Link>
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
