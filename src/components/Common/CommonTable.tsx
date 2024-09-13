import { Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import { Table, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { Categoria, Permiso } from '@/types/UserProps';

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

	const renderCell = (key: keyof T, item: T, index: number) => {
		if (key === 'pass') {
			return (
				<>
					{visiblePasswords[index] ? String(item[key]) : '********'}
					<Button variant='link' onClick={() => togglePasswordVisibility(index)}>
						{visiblePasswords[index] ? <VisibilityOff /> : <Visibility />}
					</Button>
				</>
			);
		}

		// Renderizar categorías
		if (key === 'categorias' && Array.isArray(item[key])) {
			return (
				<div>
					{(item[key] as Categoria[]).map((categoria) => (
						<Badge bg='secondary' key={categoria.idCategoria} className='me-1'>
							{categoria.nombre}
						</Badge>
					))}
				</div>
			);
		}

		// Renderizar permisos (Similar a las categorías)
		if (key === 'permisos' && Array.isArray(item[key])) {
			return (
				<div>
					{(item[key] as Permiso[]).map((permiso) => (
						<Badge bg='info' key={permiso.idPermiso} className='me-1'>
							{permiso.nombre}
						</Badge>
					))}
				</div>
			);
		}

		return String(item[key]);
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
							<td key={String(key)} className='align-middle'>
								{renderCell(key, item, index)}
							</td>
						))}
						<td className='d-flex justify-content-start gap-1'>
							<Button variant='outline-info' size='sm' onClick={() => onAction('view', item)}>
								<Visibility onClick={() => onAction('view', item)} />
							</Button>
							<Button variant='outline-warning' size='sm'>
								<Edit onClick={() => onAction('edit', item)} />
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default CommonTable;
