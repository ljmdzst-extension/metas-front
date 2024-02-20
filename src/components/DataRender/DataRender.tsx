import { Accordion } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

interface Props {
	objectData: any;
	spanishTitles: any;
}

interface Valoracion {
	idValoracion: number;
	nom: string;
}

interface Relacion {
	idRelacion: number;
	nom: string;
	tipoRelacion: {
		idTipoRelacion: number;
		nom: string;
	};
}

const DataRender = ({ objectData, spanishTitles }: Props) => {
	const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
	const [relaciones, setRelaciones] = useState<Relacion[]>([]);

	const camelCaseToHuman = (str: string) => {
		return str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
	};

	const stringValoracion = (val: number) => {
		const valoracion = valoraciones?.find((valoracion) => valoracion.idValoracion === val);
		return valoracion?.nom;
	};

	const fetchBases = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL_METAS}/bases/`);
			if (response.data.ok) {
				setValoraciones(response.data.data.listaValoraciones);
				setRelaciones(response.data.data.listaRelaciones);
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
				<div key={dataType}>
					<p>
						<span>Listado de Instituciones</span>
					</p>
					<ul>
						{data.map(({ idInstitucion, nom, ubicacion }: any) => (
							<li key={`institucion-${idInstitucion}`}>
								<a href={ubicacion}>{nom}</a>
							</li>
						))}
					</ul>
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
