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
				<ResponsiveContainer
					width='100%'
					height='100%'
					className=' border rounded mt-2 p-2 bg-white'
				>
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
				<ResponsiveContainer
					width='100%'
					height='100%'
					className=' border rounded mt-2 p-2 bg-white'
				>
					<BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						{keysWithValue.map((key, index) => (
							<Bar key={index} dataKey={key} fill={COLORS[index % COLORS.length]} />
						))}
					</BarChart>
				</ResponsiveContainer>
			);
		case 'pie':
			return (
				<ResponsiveContainer
					width='100%'
					height='100%'
					className=' border rounded mt-2 p-2 bg-white'
				>
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
