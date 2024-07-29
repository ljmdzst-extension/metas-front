import { ArrowBack } from '@mui/icons-material';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommonTable from '@/components/Common/CommonTable';
import FormUsers from '@/components/Forms/Admin/FormUsers';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import DetailsUser from '@/components/Forms/Admin/DetailUser';
import { getAllUsers } from '@/services';
import { Categoria, UserData } from '@/types/UserProps';
import { errorAlert } from '@/utils/Alerts';

const MySwal = withReactContent(Swal);

interface UserTableData {
	nroDoc: string;
	email: string;
	pass: string;
	categorias: Categoria[];
}

const mapUserDataForTable = (user: UserData): UserTableData => {
	const { usuario } = user;

	return {
		nroDoc: usuario.nroDoc,
		email: usuario.email,
		pass: usuario.pass,
		categorias: user.categorias,
	};
};

const AdminScreen = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<UserData[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserData[]>(users);
	const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');

	// NOTE: Obtiene todos los usuarios
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getAllUsers();
				if (response.ok) {
					setUsers(response.data);
					setFilteredUsers(response.data);
				}
			} catch (err) {
				errorAlert((err as Error).message);
			}
		};

		fetchUsers();
	}, []);

	const handleAction = (action: 'view' | 'edit', user: UserTableData) => {
		const originalUser = users.find((u) => u.usuario.nroDoc === user.nroDoc); // Encuentra el usuario original por Documento
		if (!originalUser) return;
		console.log(originalUser);
		if (action === 'view') {
			MySwal.fire({
				title: 'User Details',
				html: <DetailsUser user={originalUser} />,
				showConfirmButton: false,
				width: '600px',
			});
		} else if (action === 'edit') {
			setSelectedUser(originalUser);
		}
	};

	const handleSave = (userData: UserData) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) => (user.persona.nroDoc === userData.persona.nroDoc ? userData : user)),
		);
		setSelectedUser(null);
	};

	useEffect(() => {
		const lowercasedQuery = searchQuery.toLowerCase();

		const filterUser = (user: UserData): boolean => {
			const personaMatches = Object.values(user.persona).some((value) =>
				value?.toString().toLowerCase().includes(lowercasedQuery),
			);

			const usuarioMatches = Object.values(user.usuario).some((value) =>
				value?.toString().toLowerCase().includes(lowercasedQuery),
			);

			const categoriasMatches = user.categorias.some((categoria) =>
				categoria.nombre.toLowerCase().includes(lowercasedQuery),
			);

			const permisosMatches = user.permisos.some((permiso) =>
				permiso.nombre.toLowerCase().includes(lowercasedQuery),
			);

			const areasMatches = user.areas.some((area) =>
				Object.values(area).some((value) =>
					Array.isArray(value)
						? value.some((subValue) => subValue.nom.toLowerCase().includes(lowercasedQuery))
						: value?.toString().toLowerCase().includes(lowercasedQuery),
				),
			);

			return (
				personaMatches || usuarioMatches || categoriasMatches || permisosMatches || areasMatches
			);
		};

		const filteredData = users.filter(filterUser);
		setFilteredUsers(filteredData);
	}, [searchQuery, users]);

	const mappedFilteredUsers = filteredUsers.map(mapUserDataForTable);

	const tableHeaders = {
		nroDoc: 'Documento',
		email: 'Email',
		pass: 'Contraseña',
		categorias: 'Categoría',
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
						style={{ overflowY: 'scroll', maxHeight: '65vh' }}
						className='custom-scrollbar'
					>
						<CommonTable<UserTableData>
							data={mappedFilteredUsers}
							headers={tableHeaders}
							onAction={handleAction}
						/>
					</Col>
					{selectedUser && (
						<Col md={4} className='border rounded p-2 bg-color-slate'>
							<FormUsers
								userData={selectedUser}
								onSave={handleSave}
								onClose={() => setSelectedUser(null)}
							/>
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default AdminScreen;
