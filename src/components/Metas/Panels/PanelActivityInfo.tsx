import InfoCard from '@/components/Common/Cards/InfoCards';
import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
	cantidadActividades: number;
}

export const PanelActivityInfo: React.FC<Props> = ({ cantidadActividades }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const handleViewAllClick = () => {
		navigate(location.pathname + '/resumen');
	};

	const handleBudgetUpload = () => {
		console.log('Cargar presupuesto');
	};

	return (
		<Container className='mt-4'>
			<Row>
				<InfoCard
					title='Actividades'
					info={cantidadActividades} // Cantidad de actividades
					buttonLabel='Ver todas'
					onButtonClick={handleViewAllClick}
					variant='primary'
					textColor='White'
					centerText
					infoFontSize='4rem'
				/>

				<InfoCard
					title='Presupuesto'
					info='Plantilla de presupuesto disponible'
					link={{ href: '/descargar/plantilla', text: 'Descargar Plantilla' }}
					variant='success'
					textColor='white'
					customButton={
						<div className='d-flex justify-content-between gap-2'>
							<Button variant='light' onClick={handleBudgetUpload}>
								Cargar
							</Button>
							<Button variant='light' onClick={() => console.log('Ver Documento')}>
								Ver
							</Button>
						</div>
					}
				/>
			</Row>
		</Container>
	);
};
