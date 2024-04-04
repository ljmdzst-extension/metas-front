import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { LArea, ListaProgramasSIPPE } from '../../types/BasesProps';
import { Actividad } from '../../types/ActivityProps';
import React from 'react';

interface Props {
	element: Actividad;
}

interface Area {
	idRelacion: number;
	nom: string;
	idTipoRelacion: number;
}

const ElementoResumen = ({ element }: Props) => {
	const { desc, listaRelaciones, listaMetas } = element;

	const [areas, setAreas] = useState<LArea[]>([]);
	const [listaSIPPE, setListaSIPPE] = useState<ListaProgramasSIPPE[]>();

	const [areasMap, setAreasMap] = useState<Record<string, Area>>({});

	const { bases, error, loading } = useSelector((state: RootState) => state.metasSlice);

	useEffect(() => {
		if (!error && bases) {
			setAreas(bases.lAreas);
			setListaSIPPE(bases.listaProgramasSIPPE);
		}
	}, [bases, error]);

	useEffect(() => {
		const map: Record<string, LArea> = {};
		areas.forEach((area) => {
			const key = `${area.idRelacion}-${area.idTipoRelacion}`;
			map[key] = area;
		});
		setAreasMap(map);
	}, [areas]);

	const extraerRelacionCompleta = (idRelacion: number, idTipoRelacion: number) => {
		const key = `${idRelacion}-${idTipoRelacion}`;
		return areasMap[key];
	};

	const renderArea = (data: any[], idTipoRelacion: number, nombreArea: string) => {
		if (!data || data.length === 0) {
			return null; // O cualquier otro componente o mensaje de aviso
		}

		const elementosArea = data
			.map((idRelacion) => extraerRelacionCompleta(idRelacion, idTipoRelacion))
			.filter(Boolean); //elimina los valores null, undefined, etc

		if (elementosArea.length === 0) {
			return null; // No hay elementos para renderizar
		}

		return (
			<li>
				{nombreArea}
				<ul>
					{elementosArea.map((thisArea, index) => (
						<li key={`${index}-${idTipoRelacion}`}>{thisArea.nom}</li>
					))}
				</ul>
			</li>
		);
	};

	return (
		<div className=' d-flex flex-column gap-2 border border-2 border-dark-subtle '>
			<div>
				<div style={{ ...styles.titleContainer }}>
					<h5>Descripcion</h5>
				</div>
				<div>
					<p>{desc}</p>
				</div>
			</div>

			<div>
				<div style={styles.titleContainer}>Metas</div>
				<div style={styles.gridContainer}>
					<div style={styles.gridTitle}>Meta/Resultado esperado</div>
					<div style={styles.gridTitle}>Resultado alcanzado</div>
					<div style={styles.gridTitle}>Observaciones</div>
					<div style={styles.gridTitle}>Valoracion</div>
				</div>
				{listaMetas.length ? (
					listaMetas.map((meta, index) => (
						<div style={styles.gridContainer} key={index}>
							<div style={styles.gridItem}>{meta.descripcion}</div>
							<div style={styles.gridItem}>{meta.resultado}</div>
							<div style={styles.gridItem}>{meta.observaciones}</div>
							<div style={styles.gridItem}>{meta.idMeta}</div>
						</div>
					))
				) : (
					<div>No hay metas cargadas</div>
				)}
			</div>

			<div>
				<div style={{ ...styles.titleContainer }}>Areas</div>
				{listaRelaciones.length > 0 && (
					<ol>
						{renderArea(listaRelaciones, 1, 'Internas Secretaria')}
						{renderArea(listaRelaciones, 2, 'Otras áreas centrales')}
						{renderArea(listaRelaciones, 3, 'Unidades Académicas involucradas')}
						{renderArea(listaRelaciones, 4, 'Programas de Extensión')}
					</ol>
				)}
				{listaRelaciones.length === 0 && <p>No hay Areas Cargadas</p>}
			</div>
		</div>
	);
};

const styles = {
	titleContainer: {
		backgroundColor: 'green',
		border: 'none',
		color: 'white',
		textAlign: 'center' as const,
		paddingTop: '1px',
		paddingBottom: '1px',
	} as React.CSSProperties,
	gridContainer: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',
		gap: '8px',
	} as React.CSSProperties,
	gridTitle: {
		border: '1px solid #ccc',
		padding: '8px',
		backgroundColor: 'lightgray',
		fontWeight: 'bold',
	} as React.CSSProperties,
	gridItem: {
		border: '1px solid #ccc',
		padding: '8px',
	} as React.CSSProperties,
};

export default ElementoResumen;
