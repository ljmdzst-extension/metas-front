import InfoCard from '@/components/Common/Cards/InfoCards';
import useAlert from '@/hooks/useAlert';
import { getArchivoPresupuesto, postArchivoPresupuesto } from '@/services/api/private/metas';

import React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
	anio: string;
	idArea: number;
	idPrograma: number;
	cantidadActividades: number;
}

export const PanelActivityInfo: React.FC<Props> = ({
	cantidadActividades,
	anio,
	idArea,
	idPrograma,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { errorAlert, successAlert } = useAlert();
	const handleViewAllClick = () => {
		navigate(location.pathname + '/resumen');
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		// Obtener el archivo seleccionado
		const file = e.target.files?.[0];
		if (!file) {
			errorAlert('No se ha seleccionado ningún archivo');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await postArchivoPresupuesto(formData, Number(anio), idArea, idPrograma);

			if (res.ok) {
				successAlert('Archivo cargado con éxito');
			} else {
				errorAlert(`Error al cargar el archivo: ${res.error}`);
			}
		} catch (error) {
			console.error('Error inesperado al cargar el archivo:', error);
			errorAlert('Error inesperado al cargar el archivo');
		}
	};

	const handleDownloadClick = async () => {
		const result = await getArchivoPresupuesto(Number(anio), idArea, idPrograma);

		if (result.ok) {
			successAlert('Archivo descargado con éxito');
		} else {
			errorAlert(`Error al descargar el archivo: ${result.error}`);
		}
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
					buttonVariant='light'
					buttonSize='sm'
					buttonDisabled={cantidadActividades === 0}
				/>

				<InfoCard
					title='Presupuesto'
					info='Plantilla de presupuesto disponible'
					link={{ href: '/descargar/plantilla', text: 'Descargar Plantilla' }}
					variant='success'
					textColor='white'
					customButton={
						<div className='d-flex flex-column  gap-2'>
							<Form.Group controlId='formFile' className=''>
								<Form.Control type='file' size='sm' onChange={handleFileChange} />
							</Form.Group>
							<Button size='sm' variant='light' onClick={handleDownloadClick}>
								Ver
							</Button>
						</div>
					}
				/>
			</Row>
		</Container>
	);
};
