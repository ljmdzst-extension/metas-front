import { Button } from 'react-bootstrap';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const data = [
	{ name: 'Pie 1', value: 400 },
	{ name: 'Pie 2', value: 600 },
	{ name: 'Pie 3', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export const Graphics = () => {
	return (
		<div className=' d-flex flex-column m-2 border rounded' style={{ backgroundColor: '#fefefe' }}>
			<h2>Graficas y resumenes</h2>
			<div
				className=' d-flex flex-column border rounded m-2 p-2 '
				style={{ backgroundColor: '#f5f5f5' }}
			>
				{/* TODO: Filtros */}
				<div className=' d-flex gap-2 '>
					<p>Filtros?:</p>
					<p style={{ color: 'blue' }}>Fecha</p>
					<p style={{ color: 'blue' }}>Area</p>
					<p style={{ color: 'blue' }}>Estado</p>

					<p
						style={{
							color: 'green',
						}}
						className=' cursor-pointer border-1 border rounded px-2 text-center fw-semibold'
					>
						Filtrar
					</p>
				</div>

				{/* TODO: Mover a componente GraphicPie o algo similar */}

				<div style={{ width: '40rem', height: '20rem' }}>
					<ResponsiveContainer width='100%' height='100%'>
						<PieChart>
							<Pie
								data={data}
								cx='50%'
								cy='50%'
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={80}
								fill='#8884d8'
								dataKey='value'
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
				{/* TODO: Leyenda grafico */}

				<div className=' d-flex flex-column'>
					<h3>Leyenda</h3>
					<div className=' d-flex gap-2 align-items-center justify-content-start'>
						<div className=' d-flex gap-2 '>
							<div style={{ width: '20px', height: '20px', backgroundColor: COLORS[0] }} />
							<p className='text-center'>Pie 1</p>
						</div>
						<div className=' d-flex gap-2'>
							<div style={{ width: '20px', height: '20px', backgroundColor: COLORS[1] }} />
							<p className='text-center'>Pie 2</p>
						</div>
						<div className=' d-flex gap-2'>
							<div style={{ width: '20px', height: '20px', backgroundColor: COLORS[2] }} />
							<p className='text-center'>Pie 3</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
