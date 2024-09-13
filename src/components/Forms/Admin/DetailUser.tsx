import React, { useState } from 'react';
import {
	Card,
	Button,
	ListGroup,
	ListGroupItem,
	Container,
	Tabs,
	Tab,
} from 'react-bootstrap';

import { UserData } from '@/types/UserProps';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface DetailsUserProps {
	user: UserData;
}

const DetailsUser: React.FC<DetailsUserProps> = ({ user }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const renderPassword = (password: string) => (
		<span>
			{showPassword ? password : '********'}
			<Button variant='link' onClick={toggleShowPassword} className='p-0 ml-2'>
				{showPassword ? <VisibilityOff /> : <Visibility />}
			</Button>
		</span>
	);

	const renderList = (list: any[], renderItem: (item: any) => JSX.Element) => (
		<ListGroup>
			{list.map((item, index) => (
				<ListGroupItem key={index} className="text-start">
					{renderItem(item)}
				</ListGroupItem>
			))}
		</ListGroup>
	);

	return (
		<Container>
			<Tabs variant='tabs' transition fill className='mb-2'>
				<Tab title='Personal' eventKey={'personal'} className='mb-3'>
					<Card className="text-start">
						<Card.Header>Datos Personales</Card.Header>
						<Card.Body>
							<Card.Text>
								<strong>Nombre:</strong> {user.persona.nom}
							</Card.Text>
							<Card.Text>
								<strong>Apellido:</strong> {user.persona.ape}
							</Card.Text>
							<Card.Text>
								<strong>Teléfono:</strong> {user.persona.tel || 'No proporcionado'}
							</Card.Text>
							<Card.Text>
								<strong>Dirección:</strong> {user.persona.dom || 'No proporcionado'}
							</Card.Text>
						</Card.Body>
					</Card>
				</Tab>
				<Tab title='Cuenta' eventKey={'account'} className='mb-3'>
					<Card className="text-start">
						<Card.Header>Usuario</Card.Header>
						<Card.Body>
							<Card.Text>
								<strong>ID Usuario:</strong> {user.usuario.idUsuario}
							</Card.Text>
							<Card.Text>
								<strong>Email:</strong> {user.usuario.email}
							</Card.Text>
							<Card.Text>
								<strong>Contraseña:</strong> {renderPassword(user.usuario.pass)}
							</Card.Text>
						</Card.Body>
					</Card>
				</Tab>
				<Tab title='Permisos y Categorías' eventKey={'permissions'} className='mb-3'>
					<Card className="text-start">
						<Card.Header>Categorías</Card.Header>
						<Card.Body>
							{renderList(user.categorias, (categoria) => (
								<li>{categoria.nombre}</li>
							))}
						</Card.Body>
					</Card>

					<Card className="text-start">
						<Card.Header>Permisos</Card.Header>
						<Card.Body>
							{renderList(user.permisos, (permiso) => (
								<li>{permiso.nombre}</li>
							))}
						</Card.Body>
					</Card>
				</Tab>
				<Tab title='Areas' eventKey={'areas'} className='mb-3'>
					<Card className="text-start">
						<Card.Header>Áreas</Card.Header>
						<Card.Body>
							{renderList(user.areas, (area) => (
								<div>
									<p>
										<strong>Año:</strong> {area.anio}
									</p>
									<p>
										<strong>Programas:</strong>
									</p>
									{renderList(area.listaProgramas, (programa) => (
										<div>
											<p>{programa.nom}</p>
											<p><strong>Áreas:</strong></p>
											{renderList(programa.listaAreas, (area) => (
												<li>{area.nom}</li>
											))}
										</div>
									))}
								</div>
							))}
						</Card.Body>
					</Card>
				</Tab>
			</Tabs>
		</Container>
	);
};

export default DetailsUser;
