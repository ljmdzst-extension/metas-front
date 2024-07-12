import ProjectsList from '@/components/Propuestas/List/ProjectsList';
import GeneralPanel from '@/components/Common/PanelLayout/GeneralPanel';
import SideBarNews from '@/components/Common/PanelLayout/component/SideBarNews';

const ProyectosScreen = () => {
	// logica de login y roles de usuario?
	return <GeneralPanel SideBarPanel={<SideBarNews />} ContentPanel={<ProjectsList />} />;
};

export default ProyectosScreen;
