import { useEffect } from 'react';
import PanelProgramas from '../components/PanelProgramas';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/reducers/AuthReducer';
import { authAsync } from '../redux/actions/authAction';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Main() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = async () => {
			const [currentToken, user] = ['token', 'user'].map((key) => localStorage.getItem(key) ?? '');

			if (currentToken && user) {
				const action = await dispatch(authAsync(currentToken));

				if (authAsync.rejected.match(action)) {
					const { error } = action.payload;
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					dispatch(logout());
					Swal.fire({
						title: `Error`,
						text: `${error}`,
						icon: 'error',
						confirmButtonText: 'Ok',
					});
					navigate('/login');
					return;
				}

				if (authAsync.fulfilled.match(action)) {
					const { token } = action.payload;
					localStorage.setItem('token', token);
				}
			}
		};
		checkUser();
	}, []);

	return (
		<div className=''>
			<div className='ConteinerCards '>
				<PanelProgramas />
			</div>
		</div>
	);
}
