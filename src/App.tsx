import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Confirm from './pages/Confirm';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';

import Activity from './pages/Activity';
import Layout from './components/Layout/Layout';
import Main from './pages/Main';
import Management from './pages/Management';
import PrivateLayout from './components/Layout/PrivateLayout';
import Proyectos from './pages/Proyectos';
import ProjectForm from './pages/ProjectForm';
import ProjectSum from './pages/ProjectSum';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<h2>Pagina principal</h2>} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/register/validation/:validationString' element={<Confirm />} />
				<Route path='/ayuda' element={<Help />} />
			</Route>
			<Route path='/gestion' element={<PrivateLayout />}>
				<Route index element={<Management />} />
				<Route path='metas' element={<Main />} />
				<Route path='metas/:idPrograma/:idArea' element={<Activity />} />
				<Route path='proyectos' element={<Proyectos />} />
				<Route path='proyectos/summ/:id' element={<ProjectSum />} />
				<Route path='proyectos/form/:id' element={<ProjectForm />} />
			</Route>
		</Routes>
	);
}

export default App;
