import React from 'react';
import { Container, Image, Navbar, Nav } from 'react-bootstrap';

export default function NavBar() {
	return (
		<Navbar className='NavBar'>
			<Container>
				<Navbar.Brand href='#home'>
					<a href='https://www.unl.edu.ar/'>
						<Image
							src='../assets/img/unl_identidad.svg'
							alt='UNL Logo'
							width='30'
							height='30'
							className='me-2 '
						/>{' '}
					</a>
					<a href='/'>Secretaria de extension y cultura</a>
				</Navbar.Brand>
				<Nav>
					<Nav.Link href='/login'>Iniciar Sesion</Nav.Link>
					<Nav.Link href='/register'>Registrarse</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}
