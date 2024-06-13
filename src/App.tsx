import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LoadingSpinner from './components/Spinner/LoadingSpinner';

const Confirm = lazy(() => import('./pages/Confirm'));
const Help = lazy(() => import('./pages/Help'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Activity = lazy(() => import('./pages/Activity'));
const Layout = lazy(() => import('./components/Layout/Layout'));
const Main = lazy(() => import('./pages/Main'));
const Management = lazy(() => import('./pages/Management'));
const PrivateLayout = lazy(() => import('./components/Layout/PrivateLayout'));
const Proyectos = lazy(() => import('./pages/Proyectos'));
const ProjectForm = lazy(() => import('./pages/ProjectForm'));
const ProjectSum = lazy(() => import('./pages/ProjectSum'));
const ResumenArea = lazy(() => import('./pages/ResumenArea'));
const Graphics = lazy(() => import('./pages/Graphics'));


function App() {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Login />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='register/validation/:validationString' element={<Confirm />} />
					<Route path='ayuda' element={<Help />} />
				</Route>
				<Route path='/gestion' element={<PrivateLayout />}>
					<Route index element={<Management />} />
					<Route path='metas' element={<Main />} />
					<Route path='metas/graficas' element={<Graphics />} />
					<Route path='metas/:idPrograma/:idArea' element={<Activity />} />
					<Route path='metas/:idPrograma/:idArea/resumen' element={<ResumenArea />} />
					<Route path='proyectos' element={<Proyectos />} />
					<Route path='proyectos/summ/:id' element={<ProjectSum />} />
					<Route path='proyectos/form/:id' element={<ProjectForm />} />
				</Route>
				<Route path='*' element={<div>404 Not Found</div>} />
			</Routes>
		</Suspense>
	);
}

export default App;
