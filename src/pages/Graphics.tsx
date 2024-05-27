import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Grafico from '../components/Graficos/Grafico';
import { useGraphics } from '../hooks/useGraphics';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

type ChartType = 'line' | 'bar' | 'pie';
export const Graphics = () => {
	const [year, setYear] = useState(currentYear);
	const { graficoEjes, graficoObjEst, graficoLy, graficoUUAA, isLoading } = useGraphics({ year });

	useEffect(() => {
		console.log(graficoEjes, graficoObjEst, graficoLy, graficoUUAA);
	}, [graficoEjes, graficoObjEst, graficoLy, graficoUUAA]);

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setYear(parseInt(e.target.value));
	};

	return (
		<div
			className='d-flex flex-column m-2 border rounded w-100 h-100'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className='d-flex justify-content-center align-items-center m-2'>
				<h2>Graficas y resumenes</h2>
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
			<Container fluid className='h-100 overflow-y-scroll overflow-x-hidden'>
				<Row style={{ height: '90%', maxHeight: '600px' }} gap={2}>
					{[
						{
							title: 'Actividades por Eje',
							type: 'pie' as ChartType,
							data: graficoEjes || [],
							dataKey: 'eje',
							legend: true,
						},
						{
							title: 'Objetivos Estrategicos',
							type: 'bar' as ChartType,
							data: graficoObjEst || [],
							dataKey: 'objEst',
							legend: false,
						},
						{
							title: 'Actividades por LIE',
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
									<p>Cargando...</p>
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
