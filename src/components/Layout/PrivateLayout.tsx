import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const PrivateLayout = ({ children }: any) => {
	const { isLogged } = useSelector((state: RootState) => state.authSlice);
	const navigation = useNavigate();

	useEffect(() => {
		// if (!isLogged) {
		// 	navigation('/login');
		// }
	}, [isLogged, navigation]);

	return (
		<div className=' vh-100' style={{ backgroundColor: '#efe6e6' }}>
			<NavBar />
			<div className=' h-100 ' style={{ backgroundColor: '#efe6e6' }} >
				{children}
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default PrivateLayout;
