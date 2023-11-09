import {  useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';

const Management = () => {
	const navigation = useNavigate();
	const handlerClick = (path: string) => {
		navigation(path);
	};
	return (
		<Container>
			<h1 className='text-center'>Gestión</h1>
			<Row>
				<Col className='text-center' xs={12} md={4}>
					<Button
						variant='outline-secondary'
						className=' w-100'
						style={{ height: '50px' }}
						onClick={() => handlerClick('/gestion/metas')}
					>
						Metas
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
						Proyectos
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
						Practicas
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Management;
