import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DataRender from '../DataRender/DataRender';

interface Props {
	idActivity: number;
}

const ActivityDetail = ({ idActivity }: Props) => {
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	return (
		<div className=' h-100 overflow-y-scroll custom-scrollbar p-3'>
			<div>ActivityDetail {idActivity}</div>
			<DataRender objectData={estadoActualizado} />
		</div>
	);
};

export default ActivityDetail;
