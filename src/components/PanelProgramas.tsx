import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Card, Form, Image } from 'react-bootstrap';
import LoadingSpinner from './Spinner/LoadingSpinner';
import useAlert from '@/hooks/useAlert';
import { RootState } from '@/redux/store';
import { AreaProps, ProgramaProps } from '@/types/AppProps';

const currentYear = new Date().getFullYear();

export default function PanelProgramas() {
	const [year, setYear] = useState<number>(2023);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [programasTransformados, setProgramasTransformados] = useState<ProgramaProps[]>([]);
	const [indexActivity, setIndexActivity] = useState<AreaProps[]>([]);
	const [indexPrograma, setIndexPrograma] = useState<number>();
	const navigation = useNavigate();
	const { errorAlert } = useAlert();

	const { token } = useSelector((state: RootState) => state.authSlice);

	useEffect(() => {
		// Realizar la solicitud GET en el efecto
		setIsLoading(true);
		axios
			.get(`${import.meta.env.VITE_API_BASE_URL_METAS}/programas/${year}`, {
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
					throw new Error(data.error || 'Error fetching data');
				}
			})
			.catch((error) => {
				if (error.response) {
					// La solicitud fue hecha y el servidor respondió con un código de estado
					// que está fuera del rango de 2xx
					const errorMessage = error.response.data?.error || error.response.statusText;
					console.error('Error al realizar la solicitud GET:', errorMessage);
					errorAlert('Error al realizar la petición: ' + errorMessage);
				} else if (error.request) {
					// La solicitud fue hecha pero no se recibió respuesta
					console.error('No se recibió respuesta del servidor:', error.request);
					errorAlert('No se recibió respuesta del servidor.');
				} else {
					// Algo sucedió en la configuración de la solicitud que desencadenó un error
					console.error('Error en la configuración de la solicitud:', error.message);
					errorAlert('Error en la configuración de la solicitud: ' + error.message);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [token, year]); // Ejecutar cuando token o year cambian

	const openArea = (area: AreaProps) => {
		const areaSinLista = {
			idArea: area.idArea,
			nom: area.nom,
			idPrograma: indexPrograma,
			anio: year,
		};
		localStorage.setItem('currentArea', JSON.stringify(areaSinLista));
		navigation(`/gestion/metas/${areaSinLista.idPrograma}/${areaSinLista.idArea}`);
	};

	const yearsArray = Array.from({ length: currentYear - 2022 }, (_, index) => currentYear - index);

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedYear = parseInt(event.target.value);
		setIndexActivity([]);
		setYear(selectedYear);
	};

	return (
		<div className='ContainerCardMenu d-flex flex-column justify-content-start gap-1 '>
			{/* <h2>Titulo del Sistema</h2> */}

			<Image src='/assets/img/UNL_Logo.png' alt='logo-programas' style={{ width: '15rem' }} />
			{/* Antes validaba con is open */}
			<Form.Group className=' align-self-start d-flex align-items-center mb-2'>
				<label style={{ width: '140px' }}>Seleccione el año:</label>
				<Form.Select value={year} onChange={handleYearChange} size='sm' style={{ width: '100px' }}>
					{yearsArray.map((yearOption) => (
						<option key={yearOption} value={yearOption}>
							{yearOption}
						</option>
					))}
				</Form.Select>
			</Form.Group>
			<div className=' d-flex justify-content-start align-items-center gap-2 w-100  '>
				<Card style={{ width: '18rem' }}>
					<div className='imgCard'>
						<h1>
							<span className='fontYear'>{year}</span>
						</h1>
					</div>
					<Card.Body
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Card.Text style={{ textAlign: 'center' }}>
							Para obtener un análisis de datos generales, presione en "Ver resumen"
						</Card.Text>
						<Button variant='success' onClick={() => navigation('/gestion/metas/graficas')}>
							Ver Resumen
						</Button>
					</Card.Body>
				</Card>
				<div className=' d-flex align-items-center w-100 h-100 '>
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<>
							{programasTransformados.length > 0 ? (
								<>
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
														maxHeight: '300px',
														gap: '10px',
														overflowY: 'auto',
													}}
													className='custom-scrollbar'
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
									</Tab.Container>{' '}
								</>
							) : (
								<div className=' text-center w-100'>
									<h2>El usuario no tiene programas cargados este año.</h2>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
