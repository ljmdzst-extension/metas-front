import { ArrowBack } from '@mui/icons-material';

type ActivityHeaderProps = {
	name: string;
	hayCambios: boolean;
	isFormOpen: boolean;
	closePlanification: () => void;
	cleanFormSelected: () => void;
	handleModalShow: () => void;
	setIsFormOpen: (open: boolean) => void;
	setIndexForm: (index: string) => void;
};

const ActivityHeader = ({
	name,
	hayCambios,
	isFormOpen,
	closePlanification,
	cleanFormSelected,
	handleModalShow,
	setIsFormOpen,
	setIndexForm,
}: ActivityHeaderProps) => {
	return (
		<div className='d-flex justify-content-between align-items-center mb-2 border-bottom'>
			<h4
				className='text-break m-2 border-3'
				style={{
					borderBottom: '2px solid #0a5d52',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
				}}
			>
				{name}
			</h4>
			<ArrowBack
				fontSize='large'
				className='m-1 rounded'
				style={{ background: '#0a5d52', color: 'white' }}
				color='primary'
				onClick={() => {
					if (hayCambios) {
						handleModalShow();
					} else if (isFormOpen) {
						setIsFormOpen(false);
						setIndexForm('');
						cleanFormSelected();
					} else {
						closePlanification();
					}
				}}
			/>
		</div>
	);
};

export default ActivityHeader;
