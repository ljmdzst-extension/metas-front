import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DataRender from '../DataRender/DataRender';
import { FormSelect } from 'react-bootstrap';

interface Props {
	idActivity: number;
}

const ActivityDetail = ({ idActivity }: Props) => {
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);
	const [filteredData, setFilteredData] = useState({});
	const [dataValue, setDataValue] = useState(1);

	const getSimplifiedData = (object) => {
		return {
			desc: object.desc,
			listaMetas: object.listaMetas,
		};
	};

	const getCompleteCleanData = (object) => {
		return {
			descripcion: object.desc,
			fechaDesde: object.fechaDesde,
			fechaHasta: object.fechaHasta,
			listaMetas: object.listaMetas,
			listaInstituciones: object.listaInstituciones,
			listaEnlaces: object.listaEnlaces,
		};
	};

	useEffect(() => {
		if (estadoActualizado) {
			const filteredData =
				dataValue === 1
					? getCompleteCleanData(estadoActualizado)
					: getSimplifiedData(estadoActualizado);
			setFilteredData(filteredData);
		}
	}, [dataValue, estadoActualizado]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDataValue(Number(event.target.value));
	};

	return (
		<div className=' h-100 overflow-y-scroll custom-scrollbar m-3 '>
			<div
				className=' p-2 '
				style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '10' }}
			>
				<FormSelect className=' w-25' size='sm' onChange={handleChange}>
					<option value='1'>Completo</option>
					<option value='2'>Simplificado</option>
				</FormSelect>
			</div>
			<DataRender objectData={filteredData} />
		</div>
	);
};

export default ActivityDetail;
