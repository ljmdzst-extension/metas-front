import { Edit, Visibility } from '@mui/icons-material';
import React from 'react';
import { Table, Button } from 'react-bootstrap';

interface CommonTableProps<T> {
	data: T[];
	onAction: (action: 'view' | 'edit', item: T) => void;
}

const CommonTable = <T,>({ data, onAction }: CommonTableProps<T>) => {
	if (!data || data.length === 0) return <div>No data available</div>;

	const keys = Object.keys(data[0]).filter((key) => key !== 'pass') as (keyof T)[];

	return (
		<Table bordered hover>
			<thead>
				<tr>
					{keys.map((key) => (
						<th key={String(key)}>{key}</th>
					))}
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index}>
						{keys.map((key) => (
							<td key={String(key)}>{String(item[key])}</td>
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
