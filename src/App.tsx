import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Activity from './pages/Activity';
import Layout from './components/Layout/Layout';
import Main from './pages/Main';

import './App.css';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />

					<Route path='/:idPrograma/:idArea' element={<Activity />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
