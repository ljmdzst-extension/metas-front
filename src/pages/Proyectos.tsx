import GeneralPanel from '../components/Panel/GeneralPanel';
import SideBarNav from '../components/Panel/component/SideBarNav';

import data from '../mock/formAExample.json';

const Proyectos = () => {
	// logica de login y roles de usuario?
	return <GeneralPanel SideBarPanel={<SideBarNav data={data} />} ContentPanel={<div>Panel</div>} />;
};

export default Proyectos;
