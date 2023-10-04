import React from 'react';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }: any) => {
	return (
		<>
			<NavBar />
			<div className='ConteinerMain'>
				{children}
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
