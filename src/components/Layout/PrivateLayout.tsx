import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import useAvailableHeight from '../../hooks/useAvailableHeight';

const PrivateLayout = ({ children }: any) => {
	const { isLogged } = useSelector((state: RootState) => state.authSlice);
	const navigation = useNavigate();
	const availableHeight = useAvailableHeight();

	useEffect(() => {
		if (!isLogged) {
			navigation('/login');
		}
	}, [isLogged, navigation]);

	return (
		<div className=' d-flex flex-column'>
			<div className=' vh-100 pb-4' style={{ backgroundColor: '#efe6e6' }}>
				<NavBar />
				<div style={{ backgroundColor: '#efe6e6', height: availableHeight, paddingBottom: '.5rem' }}>
					{children}
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default PrivateLayout;
