import React from 'react';
import { Container, Image, Navbar } from 'react-bootstrap';

export default function NavBar() {
	return (
		<Navbar className='NavBar'>
			<Container>
				<Navbar.Brand href='#home'>
					<Image
						src='../assets/img/unl_identidad.svg'
						alt='UNL Logo'
						width='30'
						height='30'
						className='logo ml-2'
					/>{' '}
					<a href=''>Secretaria de extension y cultura</a>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}
