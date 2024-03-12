import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AreaProps, ProgramaProps } from '../types/AppProps';

export default function CardYear() {
	const [programasTransformados, setProgramasTransformados] = useState<ProgramaProps[]>([]);
	const [indexActivity, setIndexActivity] = useState<AreaProps[]>([]);
	const [indexPrograma, setIndexPrograma] = useState<number>();
	const navigation = useNavigate();

	const { token } = useSelector((state: RootState) => state.authSlice);

	useEffect(() => {
		// Realizar la solicitud GET en el efecto
		axios
			.get(`${import.meta.env.VITE_API_BASE_URL_METAS}/programas/2023`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				const data = response.data;

				// Verifica si la respuesta tiene la estructura esperada
				if (data?.ok && data?.data) {
					const programas: ProgramaProps[] = data.data;
					setProgramasTransformados(programas);
				} else {
					console.error('La respuesta no tiene la estructura esperada.');
				}
			})
			.catch((error) => {
				console.error('Error al realizar la solicitud GET:', error);
			});
	}, [token]); // Ejecutar una sola vez al montar el componente

	const openArea = (area: AreaProps) => {
		const areaSinLista = {
			idArea: area.idArea,
			nom: area.nom,
			idPrograma: indexPrograma,
		};
		localStorage.setItem('currentArea', JSON.stringify(areaSinLista));
		navigation(`/gestion/metas/${areaSinLista.idPrograma}/${areaSinLista.idArea}`);
	};

	return (
		<div className='ConteinerCardMenu d-flex flex-column'>
			<h2>Titulo del Sistema</h2>
			{/* Antes validaba con is open */}
			<div className='menu'>
				<Tab.Container id='list-group-tabs-example' defaultActiveKey='#link1'>
					<Row>
						<Col sm={4}>
							<ListGroup
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: '400px',
									gap: '10px',
								}}
							>
								{programasTransformados.map((item, index) => (
									<ListGroup.Item
										action
										variant='secondary'
										onClick={() => {
											setIndexActivity(item.listaAreas);
											setIndexPrograma(item.idPrograma);
										}}
										key={index}
									>
										{item.nom}
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
					</Row>
				</Tab.Container>
				<Tab.Container id='list-group-tabs-example' defaultActiveKey='#link1'>
					<Row>
						<Col sm={4}>
							<ListGroup
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: '400px',
									gap: '10px',
								}}
							>
								{indexActivity.map((elemento, index) => (
									<ListGroup.Item
										key={index}
										action
										variant='light'
										onClick={() => openArea(elemento)}
									>
										{elemento.nom}
									</ListGroup.Item>
								))}
							</ListGroup>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		</div>
	);
}
