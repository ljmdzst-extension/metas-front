import { Table } from 'react-bootstrap';
import { projectHistoryProps } from '../../types/ProjectsProps';

interface dataProps {
	data: projectHistoryProps[];
}

const ProjectHistory = ({ data }: dataProps) => {
	return (
		<div>
			<div>
				<h2>Proyecto: Test Title</h2>
			</div>
			<Table>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Estado</th>
						<th>Descripción</th>
						<th>Accion</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						const date = new Date(item.fechaCreacion);
						return (
							<tr key={item.id}>
								<td>{date.toLocaleDateString('es-ES')}</td>
								<td>{item.tipoEstado}</td>
								<td>{item.desc}</td>
								<td>Accion</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
};

export default ProjectHistory;
