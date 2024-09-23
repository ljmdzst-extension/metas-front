import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/reducers/AuthReducer';
import { authAsync } from '@/redux/actions/authAction';
import { isRejectedWithValue, unwrapResult } from '@reduxjs/toolkit';
import useAlert from './useAlert';

const TOKEN_LIFETIME_MS = 4 * 60 * 60 * 1000; // 4 hours
const RENEW_WINDOW_MS = 0.5 * 60 * 60 * 1000; // 30 minutes

const useAuth = () => {
	const { errorAlert } = useAlert();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = async () => {
			const [currentToken, user] = ['token', 'user'].map((key) => localStorage.getItem(key) ?? '');

			if (currentToken && user) {
				const tokenExpiry = localStorage.getItem('tokenExpiry');
				const isTokenExpired =
					tokenExpiry && new Date().getTime() > new Date(parseInt(tokenExpiry, 10)).getTime();
				const renewWindowStart =
					tokenExpiry && new Date(parseInt(tokenExpiry, 10)).getTime() - RENEW_WINDOW_MS;
				const isInRenewWindow =
					renewWindowStart !== null && new Date().getTime() > Number(renewWindowStart);

				if (isTokenExpired) {
					handleAuthError('Session expired');
				} else if (isInRenewWindow) {
					await renewToken();
				} else {
					localStorage.setItem('lastActivity', new Date().getTime().toString());
				}
			}
		};

		const renewToken = async () => {
			try {
				const action = await dispatch(authAsync());

				if (isRejectedWithValue(action)) {
					handleAuthError((action.payload as { error: string }).error);
				} else {
					const { token } = unwrapResult(action);
					const expiryDate = new Date().getTime() + TOKEN_LIFETIME_MS;
					localStorage.setItem('token', token);
					localStorage.setItem('tokenExpiry', expiryDate.toString());
					localStorage.setItem('lastActivity', new Date().getTime().toString());
				}
			} catch (err) {
				console.error('Error occurred:', err);
				handleAuthError('Unknown error');
			}
		};

		const handleAuthError = (error: null | string) => {
			console.log(error);
			localStorage.clear();
			dispatch(logout());
			errorAlert(`${error ?? 'Unknown error'}`);
			navigate('/login');
		};

		checkUser();
	}, [dispatch, navigate]);
};

export default useAuth;
