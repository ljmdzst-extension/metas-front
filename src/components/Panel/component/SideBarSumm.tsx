import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface SideBarSummProps {
	id: string | number;
}

const SideBarSumm = ({ id }: SideBarSummProps) => {
	const navigation = useNavigate();

	return (
		<div className=' d-flex flex-column gap-1'>
			<Button variant='primary'>Ver</Button>
			<Button variant='primary' onClick={() => navigation(`/gestion/proyectos/form/${id}`)}>
				Editar
			</Button>
			<Button variant='danger'>Eliminar</Button>
		</div>
	);
};

export default SideBarSumm;
