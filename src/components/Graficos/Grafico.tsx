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
	dataKey?: string;
	valueKeys: string[];
	legend?: boolean;
}

const RADIAN = Math.PI / 180;

const COLORS = [
	'#8884d8',
	'#82ca9d',
	'#ffc658',
	'#ff8042',
	'#8dd1e1',
	'#a4de6c',
	'#d0ed57',
	'#ffbb28',
	'#ff7f50',
	'#0088fe',
	'#00c49f',
	'#ff6f61',
	'#6a5acd',
	'#20b2aa',
	'#ffb6c1',
];

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

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div
				className='custom-tooltip'
				style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}
			>
				<p className='label'>{`${label} :`}</p>
				<p>Cantidad de Actividades: {payload[0].value}</p>
			</div>
		);
	}
	return null;
};

const Grafico: React.FC<GraficoProps> = ({
	dataKey = 'name',
	type,
	data,
	valueKeys,
	legend = true,
}) => {
	if (data.length === 0) {
		return <div>No data available</div>;
	}

	const shouldHideTicks = data.length > 10;

	switch (type) {
		case 'line':
			return (
				<ResponsiveContainer
					width='100%'
					height='100%'
					className='border rounded mt-2 p-2 bg-white'
				>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey={dataKey} tick={shouldHideTicks ? false : undefined} />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						{legend && <Legend />}
						{valueKeys.map((key, index) => (
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
				<ResponsiveContainer
					width='100%'
					height='100%'
					className='border rounded mt-2 p-2 bg-white'
				>
					<BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey={dataKey} tick={shouldHideTicks ? false : undefined} />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						{legend && <Legend />}
						{valueKeys.map((key, index) => (
							<Bar key={index} dataKey={key} fill={COLORS[index % COLORS.length]}>
								{data.map((entry, idx) => (
									<Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
								))}
							</Bar>
						))}
					</BarChart>
				</ResponsiveContainer>
			);
		case 'pie':
			return (
				<ResponsiveContainer
					width='100%'
					height='100%'
					className='border rounded mt-2 p-2 bg-white'
				>
					<PieChart>
						<Pie
							dataKey='cantActividades'
							data={data}
							cx='50%'
							cy='50%'
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							label={renderCustomizedLabel}
							nameKey={dataKey}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip />
						{legend && <Legend />}
					</PieChart>
				</ResponsiveContainer>
			);
		default:
			return null;
	}
};

export default Grafico;
