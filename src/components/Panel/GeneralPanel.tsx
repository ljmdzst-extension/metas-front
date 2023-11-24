import useAvailableHeight from '../../hooks/useAvailableHeight';

interface GeneralPanelProps {
	childrenSidebar: React.ReactNode;
	childrenContent: React.ReactNode;
}

const GeneralPanel = ({ childrenSidebar, childrenContent }: GeneralPanelProps) => {
	const availableHeight = useAvailableHeight();

	return (
		<div
			style={{
				height: availableHeight,
			}}
			className='d-flex gap-2 p-2'
		>
			<div className=' bg-color-slate rounded ' style={{ width: 300 }}>
				{childrenSidebar}
			</div>
			<div className='bg-color-slate rounded' style={{ flexGrow: 1 }}>
				{childrenContent}
			</div>
		</div>
	);
};

export default GeneralPanel;
