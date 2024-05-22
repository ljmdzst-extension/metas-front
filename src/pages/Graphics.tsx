import { Col, Container, Row } from 'react-bootstrap';

import Grafico from '../components/Graficos/Grafico';

const data = [
	{ name: 'Pie 1', value: 400 },
	{ name: 'Pie 2', value: 600 },
	{ name: 'Pie 3', value: 300 },
];

const lineData = [
	{ name: 'Page A', valor1: 4000, valor2: 2400, amt: 2400 },
	{ name: 'Page B', valor1: 3000, valor2: 1398, amt: 2210 },
	{ name: 'Page C', valor1: 2000, valor2: 9800, amt: 2290 },
	{ name: 'Page D', valor1: 2780, valor2: 3908, amt: 2000 },
	{ name: 'Page E', valor1: 1890, valor2: 4800, amt: 2181 },
	{ name: 'Page F', valor1: 2390, valor2: 3800, amt: 2500 },
	{ name: 'Page G', valor1: 3490, valor2: 4300, amt: 2100 },
];

const lineData2 = [
	{ name: 'Page A', valor1: 4000, valor2: 2400, valor3: 1500 },
	{ name: 'Page B', valor1: 3000, valor2: 1398, valor3: 2100 },
	{ name: 'Page C', valor1: 2000, valor2: 9800, valor3: 1800 },
	{ name: 'Page D', valor1: 2780, valor2: 3908, valor3: 2500 },
	{ name: 'Page E', valor1: 1890, valor2: 4800, valor3: 3000 },
	{ name: 'Page F', valor1: 2390, valor2: 3800, valor3: 2100 },
	{ name: 'Page G', valor1: 3490, valor2: 4300, valor3: 3200 },
];

const lineData3 = [
	{ name: 'Page A', valor1: 4000, valor2: 2400, valor3: 1500, valor4: 3200, valor5: 2100 },
	{ name: 'Page B', valor1: 3000, valor2: 1398, valor3: 2100, valor4: 4000, valor5: 2200 },
	{ name: 'Page C', valor1: 2000, valor2: 9800, valor3: 1800, valor4: 4500, valor5: 2300 },
	{ name: 'Page D', valor1: 2780, valor2: 3908, valor3: 2500, valor4: 3600, valor5: 2400 },
	{ name: 'Page E', valor1: 1890, valor2: 4800, valor3: 3000, valor4: 3700, valor5: 2500 },
	{ name: 'Page F', valor1: 2390, valor2: 3800, valor3: 2100, valor4: 3800, valor5: 2600 },
	{ name: 'Page G', valor1: 3490, valor2: 4300, valor3: 3200, valor4: 3900, valor5: 2700 },
];

console.log(lineData2);

export const Graphics = () => {
	return (
		<div
			className=' d-flex flex-column m-2 border rounded w-100 h-100'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className='d-flex justify-content-center align-items-center m-2'>
				<h2>Graficas y resumenes</h2>
			</div>
			<Container fluid className='h-100'>
				<Row style={{ height: '90%', maxHeight: '600px' }}>
					<Col md={4}>
						<div
							className=' d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de Lineas </h2>
							{/* NOTE: Filtros */}
							<div
								className='d-flex align-items-center justify-content-start align-content-center p-1 
								gap-2 border border-2 rounded  '
							>
								<p className='mb-0'>Filtros?:</p>
								<p className='mb-0' style={{ color: 'blue' }}>
									Fecha
								</p>
								<p className='mb-0' style={{ color: 'blue' }}>
									Area
								</p>

								<p
									className='cursor-pointer border-1 border rounded px-2 text-center ms-auto fw-semibold mb-0'
									style={{ color: 'green' }}
								>
									Filtrar
								</p>
							</div>
							<Grafico data={lineData3} type='line' />
						</div>
					</Col>
					<Col md={4}>
						<div
							className=' d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de Torta </h2>
							{/* NOTE: Filtros */}
							<div
								className='d-flex align-items-center justify-content-start align-content-center p-1 
								gap-2 border border-2 rounded  '
							>
								<p className='mb-0'>Filtros?:</p>
								<p className='mb-0' style={{ color: 'blue' }}>
									Fecha
								</p>
								<p className='mb-0' style={{ color: 'blue' }}>
									Area
								</p>

								<p
									className='cursor-pointer border-1 border rounded px-2 text-center ms-auto fw-semibold mb-0'
									style={{ color: 'green' }}
								>
									Filtrar
								</p>
							</div>
							<Grafico data={data} type='pie' />
						</div>
					</Col>

					<Col md={4}>
						<div
							className=' d-flex flex-column border rounded w-100 h-100 p-2'
							style={{ backgroundColor: '#f5f5f5' }}
						>
							<h2>Grafico de Barras </h2>
							{/* NOTE: Filtros */}
							<div
								className='d-flex align-items-center justify-content-start align-content-center p-1 
								gap-2 border border-2 rounded  '
							>
								<p className='mb-0'>Filtros?:</p>
								<p className='mb-0' style={{ color: 'blue' }}>
									Fecha
								</p>
								<p className='mb-0' style={{ color: 'blue' }}>
									Area
								</p>

								<p
									className='cursor-pointer border-1 border rounded px-2 text-center ms-auto fw-semibold mb-0'
									style={{ color: 'green' }}
								>
									Filtrar
								</p>
							</div>
							<Grafico data={lineData2} type='bar' />
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
