import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RootState, useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import useAvailableHeight from '@/hooks/useAvailableHeight';
import { checkPermisoCurrentArea } from '@/redux/reducers/AuthReducer';
import { getBases } from '@/redux/actions/metasActions';
import { errorAlert } from '@/utils/Alerts';

const PrivateLayout = ({ children }: any) => {
	const { isLogged, token } = useSelector((state: RootState) => state.auth);
	const dispatch = useAppDispatch();
	const navigation = useNavigate();
	const location = useLocation();
	const availableHeight = useAvailableHeight();

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
	}, [dispatch, token]);

	useEffect(() => {
		if (!isLogged) {
			navigation('/login');
		}
	}, [isLogged, navigation]);

	// Realizar el chequeo cada vez que cambia la ruta
	useEffect(() => {
		dispatch(checkPermisoCurrentArea());
	}, [dispatch, location.pathname]);

	return (
		<div className=' d-flex flex-column'>
			<div className=' vh-100 pb-4' style={{ backgroundColor: '#efe6e6' }}>
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
