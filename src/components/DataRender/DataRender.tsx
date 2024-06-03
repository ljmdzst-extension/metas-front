import { useEffect, useMemo, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { LArea, ListaProgramasSIPPE } from '../../types/BasesProps';

interface Props {
	objectData: any;
	spanishTitles: any;
}

interface Valoracion {
	idValoracion: number;
	nom: string;
}

interface Area {
	idRelacion: number;
	nom: string;
	idTipoRelacion: number;
}

const DataRender = ({ objectData, spanishTitles }: Props) => {
	const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
	const [areas, setAreas] = useState<LArea[]>([]);
	const [listaSIPPE, setListaSIPPE] = useState<ListaProgramasSIPPE[]>();

	const [areasMap, setAreasMap] = useState<Record<string, Area>>({});

	const { bases, error, loading } = useSelector((state: RootState) => state.metasSlice);

	// Convert camelCase to human-readable format
	const camelCaseToHuman = (str: string) => {
		return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
	};

	// Find the name of the valoracion
	const stringValoracion = (val: number) => {
		const valoracion = valoraciones?.find((valoracion) => valoracion.idValoracion === val);
		return valoracion?.nom;
	};

	// Fetch data from the store
	useEffect(() => {
		if (!error && bases) {
			setValoraciones(bases.listaValoraciones);
			setAreas(bases.lAreas);
			setListaSIPPE(bases.listaProgramasSIPPE);
		} else {
			// TODO: ALERTA
		}
	}, [bases, error]);

	// Create a map of areas
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
			return null;
		}

		const elementosArea = data
			.map((idRelacion) => extraerRelacionCompleta(idRelacion, idTipoRelacion))
			.filter(Boolean);

		if (elementosArea.length === 0) {
			return null;
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

	// General data renderer for different data types
	const renderData = (data: any[], dataType: string) => {
		const renderers: any = {
			listaMetas: () => {
				if (!data || data.length === 0) return null;
				return (
					<div key={dataType}>
						<p>
							<span>Listado de Metas</span>
						</p>
						<Accordion defaultActiveKey='0' alwaysOpen>
							{data.map((meta, index) => (
								<Accordion.Item eventKey={`${meta.idMeta}`} key={`meta-${meta.idMeta}`}>
									<Accordion.Header>Mostrar meta {index + 1}</Accordion.Header>
									<Accordion.Body>
										<p>
											<span>Descripción:</span> {meta.descripcion}
										</p>
										<p>
											<span>Resultado:</span> {meta.resultado}
										</p>
										<p>
											<span>Observaciones:</span> {meta.observaciones}
										</p>
										<p>
											<span>Valoracion:</span> {stringValoracion(meta.valoracion)}
										</p>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>
				);
			},
			listaInstituciones: () => {
				if (!data || data.length === 0) return null;
				return (
					<div key={dataType} className=' mt-2'>
						<p>
							<span>Instituciones</span>
						</p>
						<ul>
							{data.map(({ idInstitucion, nom, ubicacion }: any) => (
								<li key={`institucion-${idInstitucion}`}>
									<a href={ubicacion} target='_blank' rel='noopener noreferrer'>
										{nom}
									</a>
								</li>
							))}
						</ul>
					</div>
				);
			},
			listaEnlaces: () => {
				if (!data || data.length === 0) return null;
				return (
					<div key={dataType} className=' mt-2'>
						<p>
							<span>Enlaces</span>
						</p>
						<ul>
							{data.map(({ idEnlace, link, desc }: any) => (
								<li key={`institucion-${idEnlace}`}>
									<a href={link} target='_blank' rel='noopener noreferrer'>
										{desc}
									</a>
								</li>
							))}
						</ul>
					</div>
				);
			},
			listaRelaciones: () => {
				if (!data || data.length === 0) return null;
				return (
					<div key={dataType}>
						<p>
							<span>Áreas</span>
						</p>
						{data.length > 0 && (
							<ol>
								{renderArea(data, 1, 'Internas Secretaria')}
								{renderArea(data, 2, 'Otras áreas centrales')}
								{renderArea(data, 3, 'Unidades Académicas involucradas')}
								{renderArea(data, 4, 'Programas de Extensión')}
							</ol>
						)}
					</div>
				);
			},
			listaProgramasSIPPE: () => {
				if (!data || data.length === 0) return null;

				const thisSIPPE = listaSIPPE?.filter((programa) => data.includes(programa.idProgramaSippe));

				return (
					<div key={dataType}>
						<p>
							<span>Programas de Extensión</span>
						</p>
						<ul>
							{thisSIPPE?.map((el) => (
								<li key={'Sippe' + el.idProgramaSippe}>{el.nom}</li>
							))}
						</ul>
					</div>
				);
			},

			// Other cases for rendering different types of lists...
		};

		const renderer = renderers[dataType];
		return renderer ? renderer() : null;
	};

	// Render simple values
	const renderValue = (value: any, nameData: string) => {
		const propertyName = spanishTitles[nameData] || camelCaseToHuman(nameData);

		if (value === null) {
			return null;
		}

		return (
			<p key={nameData}>
				<span>{propertyName}:</span> {value}
			</p>
		);
	};

	const memoizedRenderData = useMemo(() => {
		if (loading) {
			return <p>Cargando...</p>;
		}

		return Object.entries(objectData).map(([nameData, value]) => {
			if (Array.isArray(value)) {
				return renderData(value, nameData);
			} else {
				return renderValue(value, nameData);
			}
		});
	}, [objectData, spanishTitles, areasMap, loading]);

	return (
		<div
			className=' overflow-y-scroll custom-scrollbar p-2 rounded-2  '
			style={{ backgroundColor: '#e8edf1' }}
		>
			{memoizedRenderData}
		</div>
	);
};

export default DataRender;
