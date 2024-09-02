import React, { useState } from 'react';
import { Card, Button, ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';

import { UserData } from '@/types/UserProps';
import { Visibility, VisibilityOff } from '@mui/icons-material'

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
				<ListGroupItem key={index}>{renderItem(item)}</ListGroupItem>
			))}
		</ListGroup>
	);

	return (
		<Container>
			<Row className='mb-3'>
				<Col>
					<Card>
						<Card.Header>Datos Personales</Card.Header>
						<Card.Body>
							<Card.Text>
								<strong>Nombre:</strong> {user.persona.nom}
							</Card.Text>
							<Card.Text>
								<strong>Apellido:</strong> {user.persona.ape}
							</Card.Text>
							<Card.Text>
								<strong>Email:</strong> {user.usuario.email || 'No proporcionado'}
							</Card.Text>
							<Card.Text>
								<strong>Teléfono:</strong> {user.persona.tel || 'No proporcionado'}
							</Card.Text>
							<Card.Text>
								<strong>Dirección:</strong> {user.persona.dom || 'No proporcionado'}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col>
					<Card>
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
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col>
					<Card>
						<Card.Header>Categorías</Card.Header>
						<Card.Body>
							{renderList(user.categorias, (categoria) => (
								<span>
									<strong>Nombre:</strong> {categoria.nombre}
								</span>
							))}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col>
					<Card>
						<Card.Header>Permisos</Card.Header>
						<Card.Body>
							{renderList(user.permisos, (permiso) => (
								<span>
									<strong>Nombre:</strong> {permiso.nombre}
								</span>
							))}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className='mb-3'>
				<Col>
					<Card>
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
											<p>
												<strong>Nombre:</strong> {programa.nom}
											</p>
											<p>
												<strong>Áreas:</strong>
											</p>
											{renderList(programa.listaAreas, (area) => (
												<span>{area.nom}</span>
											))}
										</div>
									))}
								</div>
							))}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default DetailsUser;
