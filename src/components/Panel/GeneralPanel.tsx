import useAvailableHeight from '../../hooks/useAvailableHeight';

import SideBarNav from './component/SideBarNav';

import formExampleA from '../../mock/formAExample.json';


const GeneralPanel = () => {
	const availableHeight = useAvailableHeight();

	return (
		<div
			style={{
				height: availableHeight,
			}}
			className='d-flex gap-2 p-2'
		>
			<div className=' bg-color-slate rounded ' style={{ width: 300 }}>
				<SideBarNav data={formExampleA} />
			</div>
			<div className='bg-color-slate rounded' style={{ flexGrow: 1 }}>
				<div className='bg-color-white rounded p-2'>
					<h1>Formulario</h1>
				</div>
			</div>
		</div>
	);
};

export default GeneralPanel;
