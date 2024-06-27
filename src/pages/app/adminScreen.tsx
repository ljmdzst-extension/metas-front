import { ArrowBack } from '@mui/icons-material';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userMockData from '@/mocks/userData.json';
import { useEffect, useState } from 'react';
import CommonTable from '@/components/Common/CommonTable';
import FormUsers from '@/components/Forms/Admin/FormUsers';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import DetailsUser from '@/components/Forms/Admin/DetailUser';

const MySwal = withReactContent(Swal);

interface User {
	id: number;
	nom: string;
	ape: string;
	email: string;
	pass: string;
	roles: string[];
	areas: number[];
	[key: string]: any;
}

const AdminScreen = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<User[]>(userMockData);
	const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const handleAction = (action: 'view' | 'edit', user: User) => {
		if (action === 'view') {
			MySwal.fire({
				title: <p>User Details</p>,
				html: <DetailsUser user={user} />,
				showConfirmButton: false,
				width: '600px',
			});
		} else if (action === 'edit') {
			setSelectedUser(user);
		}
	};

	const handleSave = (userData: User) => {
		setUsers((prevUsers) => prevUsers.map((user) => (user.id === userData.id ? userData : user)));
		setSelectedUser(null);
	};

	useEffect(() => {
		const lowercasedQuery = searchQuery.toLowerCase();
		const filteredData = users.filter((user) =>
			Object.values(user).some((value) => value.toString().toLowerCase().includes(lowercasedQuery)),
		);
		setFilteredUsers(filteredData);
	}, [searchQuery, users]);

	return (
		<div
			className='d-flex flex-column m-2 border rounded h-100'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className='d-flex justify-content-between align-items-center m-2 '>
				<h2 className='m-0 flex-grow-1 text-center'>Administración</h2>
				<ArrowBack
					fontSize='large'
					className='m-1 rounded cursor-pointer'
					style={{ background: '#0a5d52', color: 'white' }}
					onClick={() => {
						navigate('/gestion/metas');
					}}
				/>
			</div>
			<Container fluid>
				<Row>
					<Col md={selectedUser ? 8 : 12}>
						<FormControl
							type='text'
							placeholder='Buscar...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='my-2'
						/>
						<div style={{ overflowY: 'scroll', maxHeight: '65vh' }} className='custom-scrollbar'>
							<CommonTable<User> data={filteredUsers} onAction={handleAction} />
						</div>
					</Col>
					{selectedUser && (
						<Col md={4} className='border rounded p-2 bg-color-slate'>
							<FormUsers userData={selectedUser} onSave={handleSave} />
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default AdminScreen;
