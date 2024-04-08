import ProjectsList from '../components/List/ProjectsList';
import GeneralPanel from '../components/Panel/GeneralPanel';
import SideBarNews from '../components/Panel/component/SideBarNews';

const Proyectos = () => {
	// logica de login y roles de usuario?
	return <GeneralPanel 
		SideBarPanel={<SideBarNews />} 
		ContentPanel={<ProjectsList />} 
	/>;
};

export default Proyectos;
