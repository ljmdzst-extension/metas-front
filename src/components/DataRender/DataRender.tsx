import { useEffect, useMemo, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import axios from 'axios';

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
	const [areas, setAreas] = useState<Area[]>([]);

	const camelCaseToHuman = (str: string) => {
		return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
	};

	const stringValoracion = (val: number) => {
		const valoracion = valoraciones?.find((valoracion) => valoracion.idValoracion === val);
		return valoracion?.nom;
	};

	const areasMap = useMemo(() => {
		const map = {};
		areas.forEach((area) => {
			const key = `${area.idRelacion}-${area.idTipoRelacion}`;
			map[key] = area;
		});
		return map;
	}, [areas]);

	const extraerRelacionCompleta = (idRelacion: number, idTipoRelacion: number) => {
		const key = `${idRelacion}-${idTipoRelacion}`;
		return areasMap[key];
	};

	const fetchBases = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL_METAS}/bases/`);
			if (response.data.ok) {
				setValoraciones(response.data.data.listaValoraciones);
				setAreas(response.data.data.lAreas);
			} else {
				console.error('Error en la respuesta de la API');
			}
		} catch (error) {
			console.error('Error al obtener la lista de objetivos:', error);
		}
	};

	useEffect(() => {
		fetchBases();
	}, []);

	const renderAreas = (data: any[], idTipoRelacion: number) => (
		<ul>
			{data.map((idRelacion) => {
				const thisArea = extraerRelacionCompleta(idRelacion, idTipoRelacion);
				return <li key={idRelacion}>{JSON.stringify(thisArea)}</li>;
			})}
		</ul>
	);

	const renderData = (data: any[], dataType: string) => {
		const renderers: any = {
			listaMetas: () => (
				<div key={dataType}>
					<p>
						<span>Listado de Metas</span>
					</p>
					<Accordion defaultActiveKey='0' alwaysOpen>
						{data.map((meta) => (
							<Accordion.Item eventKey={`${meta.idMeta}`} key={`meta-${meta.idMeta}`}>
								<Accordion.Header>Mostrar meta {meta.idMeta}</Accordion.Header>
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
			),
			listaInstituciones: () => (
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
			),
			listaEnlaces: () => (
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
			),
			listaRelaciones: () => (
				<div>
					<p>
						<span>Areas</span>
						<ol>
							<li>Areas internas secretaria</li>
							{renderAreas(data, 1)}
							<li>Areas internas UNL</li>
							{renderAreas(data, 2)}
							<li>Unidades Academicas </li>
							{renderAreas(data, 3)}
						</ol>
					</p>
				</div>
			),
			// Otros casos para renderizar diferentes tipos de listas...
		};

		const renderer = renderers[dataType];
		return renderer ? renderer() : null;
	};

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
		return Object.entries(objectData).map(([nameData, value]) => {
			if (Array.isArray(value)) {
				return renderData(value, nameData);
			} else {
				return renderValue(value, nameData);
			}
		});
	}, [objectData, spanishTitles]);

	return <div>{memoizedRenderData}</div>;
};

export default DataRender;
