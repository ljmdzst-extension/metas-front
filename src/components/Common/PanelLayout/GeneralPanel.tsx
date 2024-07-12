import { ReactNode } from 'react';

import useAvailableHeight from '@/hooks/useAvailableHeight';

interface GeneralPanelProps {
	SideBarPanel: ReactNode;
	ContentPanel: ReactNode;
}

const GeneralPanel = ({ ContentPanel, SideBarPanel }: GeneralPanelProps) => {
	const availableHeight = useAvailableHeight();

	return (
		<div
			style={{
				height: availableHeight,
			}}
			className='d-flex gap-2 p-2'
		>
			<div className=' bg-color-slate rounded p-2 h-100' style={{ width: 300 }}>
				{SideBarPanel}
			</div>
			<div className=' rounded p-2 bg-color-slate rounded border-2 ' style={{ width: '100%' }}>
				{ContentPanel}
			</div>
		</div>
	);
};

export default GeneralPanel;
