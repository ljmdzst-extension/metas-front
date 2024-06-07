import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';

const Management = () => {
	const navigation = useNavigate();
	const handlerClick = (path: string) => {
		navigation(path);
	};
	return (
		<Container
			className='my-2 border rounded h-100 '
			style={{ backgroundColor: 'rgba(245, 245, 245, 0.959)' }}
		>
			<div className=' my-2'>
				<h2 className='text-center' style={{ color: '#0a5d52' }}>
					Seleccionar la plataforma a la que desee acceder{' '}
				</h2>
			</div>
			<Row className='my-2'>
				<Col className='text-center' xs={12} md={4}>
					<Button
						variant='success'
						className=' w-100'
						style={{ height: '50px' }}
						onClick={() => handlerClick('/gestion/metas')}
					>
						Planificaciones y resultados
					</Button>
				</Col>
				<Col className='text-center' xs={12} md={4}>
					<Button
						variant='success'
						className=' w-100'
						style={{ height: '50px' }}
						onClick={() => handlerClick('/gestion/proyectos')}
						disabled
					>
						Gestor de Proyectos de Extensión
					</Button>
				</Col>
				<Col className='text-center' xs={12} md={4}>
					<Button
						variant='success'
						className=' w-100'
						style={{ height: '50px' }}
						onClick={() => handlerClick('/gestion/programas')}
						disabled
					>
						Gestor de P.E.E.E
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Management;
