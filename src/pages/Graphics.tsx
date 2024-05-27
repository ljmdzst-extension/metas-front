import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Grafico from '../components/Graficos/Grafico';
import { useGraphics } from '../hooks/useGraphics';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

export const Graphics = () => {
	const [year, setYear] = useState(currentYear);
	const { graficoEjes, graficoObjEst, graficoLy, graficoUUAA, isLoading } = useGraphics({ year });

	useEffect(() => {
		console.log(graficoEjes, graficoObjEst, graficoLy, graficoUUAA);
	}, [graficoEjes, graficoObjEst, graficoLy, graficoUUAA]);

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setYear(parseInt(e.target.value));
	};

	const graficoEjesKeys = ['cantActividades'];
	const graficoObjEstKeys = ['cantActividades'];
	const graficoLyKeys = ['cantActividades'];
	const graficoUUAAKeys = ['cantActividades'];

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
			<Container fluid className='h-100 overflow-y-scroll'>
				<Row style={{ height: '90%', maxHeight: '600px' }}>
					<Col md={6}>
						<div
							className='d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de Ejes</h2>
							{isLoading ? (
								<p>Cargando...</p>
							) : (
								<Grafico
									dataKey='eje'
									data={graficoEjes || []}
									type='bar'
									valueKeys={graficoEjesKeys}
								/>
							)}
						</div>
					</Col>
					<Col md={6}>
						<div
							className='d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de Objetivos Estrategicos</h2>
							{isLoading ? (
								<p>Cargando...</p>
							) : (
								<Grafico
									dataKey='objEst'
									data={graficoObjEst || []}
									type='bar'
									valueKeys={graficoObjEstKeys}
								/>
							)}
						</div>
					</Col>
					<Col md={6}>
						<div
							className='d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de Ly</h2>
							<Grafico dataKey='lie' data={graficoLy || []} type='bar' valueKeys={graficoLyKeys} />
						</div>
					</Col>
					<Col md={6}>
						<div
							className='d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de UUAA</h2>
							{isLoading ? (
								<p>Cargando...</p>
							) : (
								<Grafico
									dataKey='ua'
									data={graficoUUAA || []}
									type='bar'
									valueKeys={graficoUUAAKeys}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
