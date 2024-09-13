
import GeneralPanel from '@/components/Common/PanelLayout/GeneralPanel';
import SideBarNav from '@/components/Common/PanelLayout/component/SideBarNav';
import FormMembers from '@/components/Propuestas/forms/FormMembers'
import data from '@/mocks/formAExample.json';

const ProjectFormScreen = () => {
	return <GeneralPanel SideBarPanel={<SideBarNav data={data} />} ContentPanel={<FormMembers />} />;
};

export default ProjectFormScreen;
