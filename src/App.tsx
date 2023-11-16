import { Route, Routes } from 'react-router-dom';

import Activity from './pages/Activity';
import Confirm from './pages/Confirm';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import PrivateLayout from './components/Layout/PrivateLayout';
import Management from './pages/Management';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<h2>Pagina principal</h2>} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/register/validation/:validationString' element={<Confirm />} />
			</Route>
			<Route path='/gestion' element={<PrivateLayout />}>
				<Route index element={<Management />} />
				<Route path='metas' element={<Main />} />
				<Route path='metas/:idPrograma/:idArea' element={<Activity />} />
			</Route>
		</Routes>
	);
}

export default App;
