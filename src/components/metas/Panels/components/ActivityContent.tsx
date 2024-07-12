import { Button } from 'react-bootstrap';
import ActivityDetail from './ActivityDetail'
import { Info } from '@mui/icons-material'
import { Actividad } from '@/types/ActivityProps'


type ActivityContentProps = {
	activity: Actividad;
	availableHeight: number;
	puedeEditar: boolean;
	handleSuspenderActividad: () => void;
	handleDeleteActividad: () => void;
	handleSuspensionModal: () => void;
};

const ActivityContent = ({
	activity,
	availableHeight,
	puedeEditar,
	handleSuspenderActividad,
	handleDeleteActividad,
	handleSuspensionModal,
}: ActivityContentProps) => {
	return (
		<div className='d-flex flex-column h-100'>
			{activity.motivoCancel !== null && (
				<Button
					variant='outline-warning'
					className='d-flex align-items-center justify-content-center mx-auto text-black'
					onClick={handleSuspensionModal}
					size='sm'
					style={{ width: 'fit-content' }}
				>
					Actividad Suspendida
					<Info fontSize='medium' style={{ color: 'orange', marginLeft: '8px' }} />
				</Button>
			)}
			<div className='overflow-y-scroll custom-scrollbar' style={{ height: availableHeight - 170 }}>
				<ActivityDetail />
			</div>
			{activity.motivoCancel === null && puedeEditar && (
				<div className='d-flex justify-content-around mb-2'>
					<Button variant='warning' onClick={handleSuspenderActividad}>
						Suspender Actividad
					</Button>
					<Button variant='danger' onClick={handleDeleteActividad}>
						Eliminar Actividad
					</Button>
				</div>
			)}
		</div>
	);
};

export default ActivityContent;
