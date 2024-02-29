/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DataRender from '../DataRender/DataRender';
import { FormSelect } from 'react-bootstrap';
import spanishTitles from '../../mock/MetasSpanishTitles.json';

interface Props {
	idActivity: number;
}

const ActivityDetail = ({ idActivity }: Props) => {
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);
	const [filteredData, setFilteredData] = useState({});
	const [dataValue, setDataValue] = useState(1);

	useEffect(() => {
		if (estadoActualizado) {
			const filteredData =
				dataValue === 1
					? {
							descripcion: estadoActualizado.desc,
							fechaDesde: estadoActualizado.fechaDesde,
							fechaHasta: estadoActualizado.fechaHasta,
							listaMetas: estadoActualizado.listaMetas,
							listaInstituciones: estadoActualizado.listaInstituciones,
							listaEnlaces: estadoActualizado.listaEnlaces,
							listaRelaciones: estadoActualizado.listaRelaciones,
					  }
					: {
							descripcion: estadoActualizado.desc,
							listaMetas: estadoActualizado.listaMetas,
					  };
			setFilteredData(filteredData);
		}
	}, [dataValue, estadoActualizado]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setDataValue(Number(event.target.value));
	};

	return (
		<div className=' h-100 d-flex flex-column p-3  '>
			<FormSelect className=' w-25 mb-3 ' size='sm' onChange={handleChange}>
				<option value='1'>Completo</option>
				<option value='2'>Simplificado</option>
			</FormSelect>
			<DataRender objectData={filteredData} spanishTitles={spanishTitles} />
		</div>
	);
};

export default ActivityDetail;
