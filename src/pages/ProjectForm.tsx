import GeneralPanel from '../components/Panel/GeneralPanel';
import SideBarNav from '../components/Panel/component/SideBarNav';
import data from '../mock/formAExample.json';

const ProjectForm = () => {
	return (
		<GeneralPanel SideBarPanel={<SideBarNav data={data} />} ContentPanel={<div>Formulario</div>} />
	);
};

export default ProjectForm;
