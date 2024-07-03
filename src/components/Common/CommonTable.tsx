import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import { Table, Button } from 'react-bootstrap';
import { useState } from 'react';

interface CommonTableProps<T extends object> {
	data: T[];
	headers: { [K in keyof T]: string }; // Encabezados como objeto
	onAction: (action: 'view' | 'edit', item: T) => void;
}

const CommonTable = <T extends object>({ data, headers, onAction }: CommonTableProps<T>) => {
	const [visiblePasswords, setVisiblePasswords] = useState<{ [index: number]: boolean }>({});

	if (!data || data.length === 0) return <div>No data available</div>;

	const keys = Object.keys(data[0]) as (keyof T)[];

	const togglePasswordVisibility = (index: number) => {
		setVisiblePasswords((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<Table bordered hover size='sm'>
			<thead style={{ position: 'sticky', top: -0.1 }}>
				<tr>
					{keys.map((key) => (
						<th key={String(key)}>{headers[key]}</th>
					))}
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index}>
						{keys.map((key) => (
							<td key={String(key)} className=''>
								{key === 'pass' ? (
									<p>
										{visiblePasswords[index] ? String(item[key]) : '********'}
										<Button variant='link' onClick={() => togglePasswordVisibility(index)}>
											{visiblePasswords[index] ? <VisibilityOff /> : <Visibility />}
										</Button>
									</p>
								) : (
									String(item[key])
								)}
							</td>
						))}
						<td>
							<Button variant='outlined-info' onClick={() => onAction('view', item)}>
								<Visibility />
							</Button>
							<Button variant='outlined-warning' onClick={() => onAction('edit', item)}>
								<Edit />
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default CommonTable;
