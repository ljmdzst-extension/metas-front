import { ArrowBack } from '@mui/icons-material';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import CommonTable from '@/components/Common/CommonTable';
import FormUsers from '@/components/Forms/Admin/FormUsers';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import DetailsUser from '@/components/Forms/Admin/DetailUser';
import { getAllUsers, getUserByID } from '@/services';
import { Categoria, Permiso, UserData, UserShortData } from '@/types/UserProps';
import useFilteredUsers from '@/hooks/useFilteredUsers';
import useAlert from '@/hooks/useAlert'

const MySwal = withReactContent(Swal);

interface UserTableData {
	nroDoc: string;
	nombreCompleto: string;
	email: string;
	categorias: Categoria[];
	permisos: Permiso[];
}

const mapUserDataForTable = (user: UserShortData): UserTableData => {
	const { nroDoc, nom, ape, email, categorias, permisos } = user;

	return {
		nroDoc: nroDoc,
		nombreCompleto: `${nom} ${ape}`,
		email: email,
		categorias: categorias,
		permisos: permisos,
	};
};

const AdminScreen = () => {
	const { errorAlert } = useAlert();
	const navigate = useNavigate();
	const [users, setUsers] = useState<UserShortData[]>([]);
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const fetchUsers = useCallback(async () => {
		try {
			const response = await getAllUsers();
			if (response.ok) {
				setUsers(response.data);
			}
		} catch (err) {
			errorAlert((err as Error).message);
		}
	}, []);
	// NOTE: Obtiene todos los usuarios
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const handleAction = async (action: 'view' | 'edit', item: UserTableData) => {
		try {
			const idUsuario = users.find((user) => user.nroDoc === item.nroDoc)?.idUsuario;
			if (!idUsuario) return;

			const response = await getUserByID(idUsuario);
			const completeUser = response.data;

			if (!completeUser) return;

			if (action === 'view') {
				MySwal.fire({
					title: 'Información de usuario',
					html: <DetailsUser user={completeUser} />,
					showConfirmButton: false,
					width: '600px',
				});
			} else if (action === 'edit') {
				setSelectedUser(completeUser);
			}
		} catch (err) {
			errorAlert('No se pudo obtener la información del usuario');
			console.error(err);
		}
	};

	const filteredUsers = useFilteredUsers(users, searchQuery);
	const mappedFilteredUsers = filteredUsers.map(mapUserDataForTable);

	const tableHeaders = {
		nroDoc: 'Documento',
		nombreCompleto: 'Nombre',
		email: 'Email',
		categorias: 'Categoría',
		permisos: 'Permisos',
	};

	return (
		<div
			className='d-flex flex-column m-2 border rounded h-100'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className='d-flex justify-content-between align-items-center m-2 '>
				<h2 className='m-0 flex-grow-1 text-center'>Administración</h2>
				<ArrowBack
					fontSize='large'
					className=' rounded cursor-pointer'
					style={{ background: '#0a5d52', color: 'white' }}
					onClick={() => {
						navigate('/gestion/metas');
					}}
				/>
			</div>
			<div className='m-2'>
				<FormControl
					type='text'
					placeholder='Buscar...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className=' w-50 mx-auto mb-2'
				/>
			</div>
			<Container fluid>
				<Row>
					<Col
						md={selectedUser ? 8 : 12}
						style={{ overflowY: 'scroll', maxHeight: '70vh' }}
						className='custom-scrollbar'
					>
						<CommonTable<UserTableData>
							data={mappedFilteredUsers}
							headers={tableHeaders}
							onAction={handleAction}
						/>
					</Col>
					{selectedUser && (
						<Col md={4} className='border rounded p-2 bg-color-slate' style={{ maxHeight: '70vh' }}>
							<FormUsers
								userData={selectedUser}
								onClose={() => setSelectedUser(null)}
								updateList={fetchUsers}
							/>
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default AdminScreen;
