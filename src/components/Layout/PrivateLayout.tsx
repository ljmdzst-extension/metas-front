import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import useAvailableHeight from '../../hooks/useAvailableHeight';
import { checkPermisoCurrentArea } from '../../redux/reducers/AuthReducer';

const PrivateLayout = ({ children }: any) => {
	const { isLogged } = useSelector((state: RootState) => state.authSlice);
	const dispatch = useDispatch<AppDispatch>();
	const navigation = useNavigate();
	const location = useLocation();
	const availableHeight = useAvailableHeight();

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
				<div
					style={{ backgroundColor: '#efe6e6', height: availableHeight, paddingBottom: '.5rem' }}
				>
					{children}
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PrivateLayout;
