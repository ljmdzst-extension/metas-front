import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }: any) => {
	return (
		<div className='vh-100'>
			<NavBar />
			<div className='h-100 container'>
				{children}
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
