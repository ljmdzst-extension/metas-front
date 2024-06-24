import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LoadingSpinner from '@/components/Spinner/LoadingSpinner';

const Layout = lazy(() => import('@/components/Layout/Layout'));
const PrivateLayout = lazy(() => import('@/components/Layout/PrivateLayout'));
const Help = lazy(() => import('@/pages/Help'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const Confirm = lazy(() => import('@/pages/auth/Confirm'));
const Admin = lazy(() => import('@/pages/app/adminScreen'));

const Activity = lazy(() => import('@/pages/metas/Activity'));
const Graphics = lazy(() => import('@/pages/metas/Graphics'));
const Main = lazy(() => import('@/pages/metas/Main'));
const Management = lazy(() => import('@/pages/Management'));
const ResumenArea = lazy(() => import('@/pages/metas/ResumenArea'));

const Proyectos = lazy(() => import('@/pages/gestor/Proyectos'));
const ProjectForm = lazy(() => import('@/pages/gestor/ProjectForm'));
const ProjectSum = lazy(() => import('@/pages/gestor/ProjectSum'));

function App() {
	return (
		<Suspense
			fallback={
				<div className='vh-100'>
					<LoadingSpinner />
				</div>
			}
		>
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
					<Route path='admin' element={<Admin />} />
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
