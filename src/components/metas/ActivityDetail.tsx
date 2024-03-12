/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DataRender from '../DataRender/DataRender';
import spanishTitles from '../../mock/MetasSpanishTitles.json';

const ActivityDetail = () => {
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);
	const [filteredData, setFilteredData] = useState({});
	const [showFullView, setShowFullView] = useState<boolean>(true);

	useEffect(() => {
		if (estadoActualizado) {
			const {
				desc,
				fechaDesde,
				fechaHasta,
				listaMetas,
				listaInstituciones,
				listaRelaciones,
				listaProgramasSIPPE,
				listaEnlaces,
			} = estadoActualizado;

			const filteredData = showFullView
				? {
						descripcion: desc,
						fechaDesde: fechaDesde,
						fechaHasta: fechaHasta,
						listaMetas: listaMetas,
						listaRelaciones: listaRelaciones,
						listaProgramasSIPPE: listaProgramasSIPPE,
						listaInstituciones: listaInstituciones,
						listaEnlaces: listaEnlaces,
				  }
				: {
						descripcion: desc,
						listaMetas: listaMetas,
				  };
			setFilteredData(filteredData);
		}
	}, [showFullView, estadoActualizado]);

	const handleViewChange = (viewType: string) => {
		if (viewType === 'full') {
			setShowFullView(true);
		} else if (viewType === 'simple') {
			setShowFullView(false);
		}
	};

	return (
		<div className='h-100 d-flex flex-column p-3'>
			<p className=' border-bottom'>
				Vista:{' '}
				<button
					onClick={() => handleViewChange('full')}
					style={{
						...styles.button,
						...(showFullView ? styles.boldUnderline : styles.normal),
					}}
				>
					Completa
				</button>{' '}
				<button
					onClick={() => handleViewChange('simple')}
					style={{
						...styles.button,
						...(!showFullView ? styles.boldUnderline : styles.normal),
					}}
				>
					Simple
				</button>
			</p>

			<DataRender objectData={filteredData} spanishTitles={spanishTitles} />
		</div>
	);
};

export default ActivityDetail;

const styles = {
	button: {
		border: 'none',
		backgroundColor: 'transparent',
		cursor: 'pointer',
		color: '#08443c',
	},
	boldUnderline: {
		fontWeight: 'bold',
		textDecoration: 'underline',
	},
	normal: {
		fontWeight: 'normal',
		textDecoration: 'none',
	},
};
