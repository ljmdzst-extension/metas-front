import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Grafico from '../components/Graficos/Grafico';
import { useGraphics } from '../hooks/useGraphics';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

type ChartType = 'line' | 'bar' | 'pie';
export const Graphics = () => {
	const [year, setYear] = useState(currentYear);
	const { graficoEjes, graficoObjEst, graficoLy, graficoUUAA, isLoading } = useGraphics({ year });

	const navigation = useNavigate();

	useEffect(() => {
		console.log(graficoEjes, graficoObjEst, graficoLy, graficoUUAA);
	}, [graficoEjes, graficoObjEst, graficoLy, graficoUUAA]);

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setYear(parseInt(e.target.value));
	};

	return (
		<div
			className='d-flex flex-column m-2 border rounded h-100'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className='d-flex justify-content-between align-items-center m-2'>
				<h2 className='m-0 flex-grow-1 text-center'>Gráficos y resúmenes</h2>
				<ArrowBack
					fontSize='large'
					className='m-1 rounded cursor-pointer'
					style={{ background: '#0a5d52', color: 'white' }}
					onClick={() => {
						navigation('/gestion/metas');
					}}
				/>
			</div>

			<div className='d-flex justify-content-center align-items-center m-2'>
				<label htmlFor='year-select'>Selecciona el año: </label>
				<select id='year-select' value={year} onChange={handleYearChange}>
					{years.map((yearOption) => (
						<option key={yearOption} value={yearOption}>
							{yearOption}
						</option>
					))}
				</select>
			</div>
			<Container fluid className='h-100 overflow-y-scroll overflow-x-hidden custom-scrollbar'>
				<Row style={{ height: '90%', maxHeight: '600px' }} gap={2}>
					{[
						{
							title: 'Distribución de actividades según Eje Estratégico - PIE',
							type: 'pie' as ChartType,
							data: graficoEjes || [],
							dataKey: 'eje',
							legend: true,
						},
						{
							title: 'Actividades según LIE y objetivo del PIE',
							type: 'bar' as ChartType,
							data: graficoObjEst || [],
							dataKey: 'objEst',
							legend: false,
						},
						{
							title: 'Actividades según Objetivo Estratégico de la SEC',
							type: 'bar' as ChartType,
							data: graficoLy || [],
							dataKey: 'lie',
							legend: false,
						},
						{
							title: 'Actividades por UA',
							type: 'bar' as ChartType,
							data: graficoUUAA || [],
							dataKey: 'ua',
							legend: false,
						},
					].map((item, index) => (
						<Col key={index} md={6} className=' mb-3'>
							<div
								className='d-flex flex-column border rounded w-100 h-100 p-2'
								style={{ backgroundColor: '#f5f5f5', minHeight: '400px' }}
							>
								<h2>{item.title}</h2>
								{isLoading ? (
									<div className=' d-flex flex-column justify-content-center align-items-center w-100 h-100'>
										<Spinner animation='border' role='output'>
											<span className='visually-hidden'>Cargando...</span>
										</Spinner>
									</div>
								) : (
									<Grafico
										dataKey={item.dataKey}
										data={item.data}
										type={item.type}
										valueKeys={['cantActividades']}
										legend={item.legend}
									/>
								)}
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};
