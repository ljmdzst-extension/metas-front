import { useParams } from 'react-router-dom';
import ProjectHistory from '@/components/List/ProjectHistory';
import GeneralPanel from '@/components/Panel/GeneralPanel';
import { projectHistoryProps } from '@/types/ProjectsProps';

import data from '@/mocks/historyExample.json';
import SideBarSumm from '@/components/Panel/component/SideBarSumm';

const ProjectSumScreen = () => {
	const typeData: projectHistoryProps[] = data.map((item) => {
		const date = new Date(item.fechaCreacion);
		return { ...item, fechaCreacion: date };
	});

	const { id } = useParams();
	if (id === undefined) return <h2>404</h2>;

	// TODO: Fetch project data from API

	return (
		<GeneralPanel
			SideBarPanel={<SideBarSumm id={id} />}
			ContentPanel={<ProjectHistory data={typeData} />}
		/>
	);
};

export default ProjectSumScreen;
