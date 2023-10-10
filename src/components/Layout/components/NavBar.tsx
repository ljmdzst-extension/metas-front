import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Image, Navbar, Nav } from 'react-bootstrap';
import { ReactComponent as LogoutIcon } from '../../../assets/logout.svg';

export default function NavBar() {
	const { user } = useSelector((state: any) => state.authSlice);

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
