import { ArrowBack } from '@mui/icons-material';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminScreen = () => {
	const navigation = useNavigate();
	return (
		<div
			className=' d-flex flex-column m-2 border rounded h-100'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className='d-flex justify-content-between align-items-center m-2 '>
				<h2 className='m-0 flex-grow-1 text-center'>Administración</h2>
				<ArrowBack
					fontSize='large'
					className='m-1 rounded cursor-pointer'
					style={{ background: '#0a5d52', color: 'white' }}
					onClick={() => {
						navigation('/gestion/metas');
					}}
				/>
			</div>
			<div className=' d-flex w-100 flex-grow-1 '>
				<div className=' d-flex flex-column w-75'>
					<h2>Buscador aqui</h2>
					{/* Buscador y listado de miembros */}
					<Table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Email</th>
								<th>Contraseña</th>
								<th>Area</th>
							</tr>
						</thead>
						{/*TODO: Fila de datos */}
					</Table>
				</div>
				{/* TODO: Formulario lateral para modificar algun usuario o permiso */}
				<div
					className=' w-25 h-100'
					style={{
						border: '1px solid #c2c2c2',
						borderRadius: '5px',
						background: '#e8e8e8',
					}}
				>
					Formulario modificacion de usuario
				</div>
			</div>
		</div>
	);
};

export default AdminScreen;
