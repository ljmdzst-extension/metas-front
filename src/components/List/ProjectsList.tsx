import { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { ResponseProjectsProps, ProjectProps } from '../../types/ProjectsProps';

import './ProjectsList.css';

const ProjectsList = () => {
	const [projects, setProjects] = useState<ProjectProps[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const projectsPerPage = 10;

	useEffect(() => {
		const getProjects = async () => {
			const response = await fetch('http://168.197.50.94:4003/api/gestor/p/all/1');
			const data: ResponseProjectsProps = await response.json();
			console.log(data);
			if (data.ok) {
				const formattedProjects = data.data.listaProyectosUsuario.map((project) => {
					const fechaCreacion = new Date(project.fechaCreacion).toLocaleDateString('es-ES');
					return { ...project, fechaCreacion };
				});
				setProjects(formattedProjects);
			}
		};
		getProjects();
	}, []);

	// Calculate current projects
	const indexOfLastProject = currentPage * projectsPerPage;
	const indexOfFirstProject = indexOfLastProject - projectsPerPage;
	const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

	// Change page
	const paginate = (pageNumber: number) => {
		if (pageNumber < 1) pageNumber = 1;
		const totalPages = Math.ceil(projects.length / projectsPerPage);
		if (pageNumber > totalPages) pageNumber = totalPages;

		setCurrentPage(pageNumber);
	};

	return (
		<div className='table-container'>
			<Table size='sm' hover>
				{/* Render table headers */}
				<thead style={{ borderBottom: 'border-bottom: 1px solid green' }}>
					<tr>
						<th style={{ width: '80px' }}>Codigo</th>
						<th style={{ width: '80px' }}>Fecha de Creación</th>
						<th>Título</th>
						<th style={{ width: '100px' }}>Responsable</th>
						<th>Estado</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{currentProjects.map((project) => {
						return (
							<tr key={project.id}>
								<td style={{ fontSize: '10px' }}>{project.codigo}</td>
								<td style={{ whiteSpace: 'nowrap' }}>{project.fechaCreacion}</td>
								<td>
									{project.titulo.length > 75
										? project.titulo.substring(0, 75) + '...'
										: project.titulo}
								</td>
								<td>
									{project.responsable.length > 10
										? project.responsable.substring(0, 10) + '...'
										: project.responsable}
								</td>
								<td>{project.estado}</td>
								<td>Acciones</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Pagination className=' d-flex justify-content-center'>
				<Pagination.First onClick={() => paginate(1)} />
				<Pagination.Prev onClick={() => paginate(currentPage - 1)} />
				<Pagination.Item active>{currentPage}</Pagination.Item>
				<Pagination.Next onClick={() => paginate(currentPage + 1)} />
				<Pagination.Last
					onClick={() => paginate(Math.ceil(projects.length / projectsPerPage))}
				/>{' '}
			</Pagination>
		</div>
	);
};

export default ProjectsList;
