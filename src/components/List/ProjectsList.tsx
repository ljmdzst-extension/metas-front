import { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { ResponseProjectsProps, ProjectProps } from '@/types/ProjectsProps';

import './ProjectsList.css';
import { ContentCopy } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
	const navigate = useNavigate();

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

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<div className='table-container'>
			<h2 className=' mt-2 '>Listado de Proyectos</h2>
			<Table size='sm' hover>
				{/* Render table headers */}
				<thead style={{ borderBottom: 'border-bottom: 1px solid green' }}>
					<tr>
						<th className='text-center'>Codigo</th>
						<th className='text-center' style={{ width: '150px' }}>
							Responsable
						</th>
						<th className='text-center'>Título</th>
						<th className='text-center' style={{ whiteSpace: 'nowrap', width: '140px' }}>
							Fecha de Creación
						</th>
						<th className='text-center' style={{ width: '80px' }}>
							Estado
						</th>
					</tr>
				</thead>
				<tbody>
					{currentProjects.map((project) => {
						const fixedResponsable = project.responsable
							.toLowerCase()
							.replace(/,(?!\s)/g, ', ')
							.split(' ')
							.map((word) => {
								return word && word[0].toUpperCase() + word.substring(1);
							})
							.join(' ');
						return (
							<tr
								key={project.id}
								onClick={() => navigate(`/gestion/proyectos/summ/${project.id}`)}
								style={{ cursor: 'pointer' }}
							>
								<td>
									<div
										title={`Copiar ${project.codigo} al portapapeles`}
										className=' d-flex flex-column justify-content-center align-items-center'
									>
										<ContentCopy
											onClick={(event) => {
												event.stopPropagation();
												copyToClipboard(project.codigo);
											}}
										/>
									</div>
								</td>
								<td>
									<div title={fixedResponsable}>
										{fixedResponsable.length > 15
											? fixedResponsable.substring(0, 15) + '...'
											: fixedResponsable}
									</div>
								</td>
								<td>
									<div title={project.titulo}>
										{project.titulo.length > 80
											? project.titulo.substring(0, 80) + '...'
											: project.titulo}
									</div>
								</td>
								<td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
									{project.fechaCreacion}
								</td>
								<td style={{ fontSize: '12px', textAlign: 'center' }}>{project.estado}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Pagination className=' mt-auto'>
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
