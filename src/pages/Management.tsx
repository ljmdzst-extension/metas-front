import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';

const Management = () => {
	const navigation = useNavigate();
	const handlerClick = (path: string) => {
		navigation(path);
	};
	return (
		<Container>
			<h2 className='text-center '>Seleccionar la plataforma a la que  desee acceder </h2>
			<Row>
				<Col className='text-center' xs={12} md={4}>
					<Button
						variant='outline-secondary'
						className=' w-100'
						style={{ height: '50px' }}
						onClick={() => handlerClick('/gestion/metas')}
					>
						Planificaciones y resultados
					</Button>
				</Col>
				<Col className='text-center' xs={12} md={4}>
					<Button
						variant='outline-secondary'
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
						variant='outline-secondary'
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
