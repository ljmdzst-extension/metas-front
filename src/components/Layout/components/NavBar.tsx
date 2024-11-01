import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

import { logout } from '@/redux/reducers/AuthReducer';

import { Container, Image, Navbar, Nav, Button } from 'react-bootstrap';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import logoUNL from '@/assets/unl_identidad.svg';

export default function NavBar() {
	const { isLogged, isAdmin } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
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
		<Navbar className='NavBar' id='header'>
			<Container>
				<Navbar.Brand>
					<a href='https://www.unl.edu.ar/'>
						<Image
							src={logoUNL}
							alt='logo UNL'
							className=' me-2'
							style={{ width: '2.5rem', height: '2.5rem' }}
						/>
					</a>
					<a href='/'>Secretaría de Extensión y Cultura</a>
				</Navbar.Brand>
				<Nav>
					{isLogged ? (
						<>
							<Nav.Link href='/gestion'>
								<Button variant='outline-light'>Inicio</Button>
							</Nav.Link>
							{isAdmin ? (
								<Nav.Link href='/gestion/admin'>
									<Button variant='outline-light'>Admin</Button>
								</Nav.Link>
							) : null}
							<Nav.Link
								onClick={handleLogout}
								className=' d-flex flex-column justify-content-center'
							>
								<LogoutIcon />
							</Nav.Link>
						</>
					) : (
						<Nav.Link href='/login'>Iniciar Sesión</Nav.Link>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
