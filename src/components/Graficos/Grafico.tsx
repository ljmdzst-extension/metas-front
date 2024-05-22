import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	PieChart,
	Pie,
	ResponsiveContainer,
	Cell,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'pie';

interface GraficoProps {
	type: ChartType;
	data: any[];
}

const RADIAN = Math.PI / 180;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57'];

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

const Grafico: React.FC<GraficoProps> = ({ type, data }) => {
	const keysWithValue = Object.keys(data[0]).filter((key) => key.includes('valor'));

	switch (type) {
		case 'line':
			return (
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						{keysWithValue.map((key, index) => (
							<Line
								key={index}
								type='monotone'
								dataKey={key}
								stroke={COLORS[index % COLORS.length]}
							/>
						))} 
					</LineChart>
				</ResponsiveContainer>
			);
		case 'bar':
			return (
				<BarChart
					width={500}
					height={300}
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Legend />
					{keysWithValue.map((key, index) => (
						<Bar key={index} dataKey={key} fill={COLORS[index % COLORS.length]} />
					))}
				</BarChart>
			);
		case 'pie':
			return (
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<Pie
							dataKey='value'
							data={data}
							cx='50%'
							cy='50%'
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							label={renderCustomizedLabel}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			);
		default:
			return null;
	}
};

export default Grafico;

const componentePrueba = () => {
	return (
		<div
			className=' d-flex flex-column border rounded w-100 h-100 p-2'
			style={{ backgroundColor: '#f5f5f5' }}
		>
			<h3 className='mb-0'>Grafica de Patas</h3>

			{/* NOTE: Filtros */}
			<div
				className='d-flex align-items-center justify-content-start align-content-center 
				p-1
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

			{/* NOTE: Mover a componente GraphicPie o algo similar */}
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
			{/* NOTE: Leyenda grafico */}
			<div className=' d-flex flex-column border rounded m-2 p-2 '>
				<h5>Leyenda</h5>
				<div className=' d-flex gap-2 align-items-center justify-content-start'>
					{data.map(({ name }, index) => (
						<div className=' d-flex gap-2 ' key={index}>
							<div
								style={{
									width: '20px',
									height: '20px',
									backgroundColor: COLORS[index % COLORS.length],
								}}
							/>
							<p className='text-center mb-0'>{name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
