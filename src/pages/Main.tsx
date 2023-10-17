import { useEffect } from 'react';
import CardYear from '../components/CardYear';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setUserData } from '../redux/reducers/AuthReducer';
import { authAsync } from '../redux/actions/authAction';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function Main() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const checkUser = async () => {
		const currentToken = localStorage.getItem('token') || '';
		const user = localStorage.getItem('user') || '';

		if (currentToken && user) {
			const action = await dispatch(authAsync(currentToken));
			if (authAsync.rejected.match(action)) {
				const { error } = action.payload as { error: string };
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				dispatch({ type: 'logout' });
				Swal.fire({
					title: `Error`,
					text: `${error}`,
					icon: 'error',
					confirmButtonText: 'Ok',
				});
				navigate('/login');
			}
			if (authAsync.fulfilled.match(action)) {
				const { token } = action.payload;
				localStorage.setItem('token', token);
				dispatch(setUserData({ user, token }));
			}
		}
	};

	useEffect(() => {
		checkUser();
	}, []);

	return (
		<>
			<div className=''>
				<div className='ConteinerCards '>
					{/* <CardYear title={"2022"}></CardYear> */}
					<CardYear title={'2023'}></CardYear>
				</div>
			</div>
		</>
	);
}
