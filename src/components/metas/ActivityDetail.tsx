import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {
	idActivity: number;
}

const ActivityDetail = ({ idActivity }: Props) => {
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	return (
		<div>
			<div>ActivityDetail {idActivity}</div>
			<div>{JSON.stringify(estadoActualizado)}</div>
		</div>
	);
};

export default ActivityDetail;
