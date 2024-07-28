import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RootState, useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import useAvailableHeight from '@/hooks/useAvailableHeight';
import { checkPermisoCurrentArea, logout } from '@/redux/reducers/AuthReducer';
import { getBases } from '@/redux/actions/metasActions';
import { errorAlert } from '@/utils/Alerts';
import { authAsync } from '@/redux/actions/authAction';
import { isRejectedWithValue, unwrapResult } from '@reduxjs/toolkit';

const TOKEN_LIFETIME_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const RENEW_WINDOW_MS = 0.5 * 60 * 60 * 1000; // 0.5 hours (30 minutes) in milliseconds

const PrivateLayout = ({ children }: any) => {
	const { isLogged } = useSelector((state: RootState) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const availableHeight = useAvailableHeight();

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
					console.log('renew token');
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
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			localStorage.removeItem('tokenExpiry');
			localStorage.removeItem('lastActivity');
			dispatch(logout());
			errorAlert(`${error ?? 'Unknown error'}`);
			navigate('/login');
		};

		checkUser();
	}, [dispatch, navigate]);

	useEffect(() => {
		const dispachBases = async () => {
			const action = await dispatch(getBases());
			if (getBases.rejected.match(action)) {
				if (action.payload?.error) {
					errorAlert(action.payload.error);
				}
			}
		};
		dispachBases();
	}, [dispatch]);

	useEffect(() => {
		if (!isLogged) {
			navigate('/login');
		}
	}, [isLogged, navigate]);

	// Realizar el chequeo cada vez que cambia la ruta
	useEffect(() => {
		dispatch(checkPermisoCurrentArea());
	}, [dispatch, location.pathname]);

	return (
		<div className='d-flex flex-column'>
			<div className='vh-100 pb-4' style={{ backgroundColor: '#efe6e6' }}>
				<NavBar />
				<div style={{ backgroundColor: '#efe6e6', height: availableHeight, paddingBottom: '1rem' }}>
					{children}
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PrivateLayout;
