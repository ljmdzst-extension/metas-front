import { useEffect } from 'react';
import PanelProgramas from '../components/PanelProgramas';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/reducers/AuthReducer';
import { authAsync } from '../redux/actions/authAction';

import { useNavigate } from 'react-router-dom';
import { isRejectedWithValue, unwrapResult } from '@reduxjs/toolkit';
import { AuthResponse } from '../types/AuthProps';
import useAlert from '../hooks/useAlert';

export default function Main() {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { errorAlert } = useAlert();

	useEffect(() => {
		const checkUser = async () => {
			const [currentToken, user] = ['token', 'user'].map((key) => localStorage.getItem(key) ?? '');

			if (currentToken && user) {
				try {
					const action = await dispatch(authAsync(currentToken));

					if (isRejectedWithValue(action)) {
						handleAuthError((action.payload as AuthResponse).error);
					} else {
						const { data } = unwrapResult(action);
						localStorage.setItem('token', data.token);
					}
				} catch (err) {
					console.error('Error occurred:', err);
					handleAuthError('Unknown error');
				}
			}
		};

		const handleAuthError = (error: null | string) => {
			console.log(error);
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			dispatch(logout());
			errorAlert(`${error ?? 'Unknown error'}`);
			navigate('/login');
		};

		checkUser();
	}, [dispatch, navigate]);

	return (
		<div className=''>
			<div className='ConteinerCards '>
				<PanelProgramas />
			</div>
		</div>
	);
}
