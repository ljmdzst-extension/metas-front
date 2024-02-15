import { Accordion } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
	objectData: any;
}

interface Valoracion {
	idValoracion: number;
	nom: string;
}

const DataRender = ({ objectData }: Props) => {
	const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);

	const camelCaseToHuman = (str: string) => {
		return str
			.replace(/([A-Z])/g, ' $1') // inserta espacio antes de cada mayúscula
			.replace(/^./, (s) => s.toUpperCase()); // capitaliza la primera letra
	};

	const stringValoracion = (val: number) => {
		const valoracion = valoraciones?.find((valoracion) => valoracion.idValoracion === val);
		return valoracion?.nom;
	};

	useEffect(() => {
		const fetchValoraciones = async () => {
			try {
				const response = await axios.get('http://168.197.50.94:4005/api/v2/metas/bases/');
				if (response.data.ok) {
					setValoraciones(response.data.data.listaValoraciones);
					console.log(response.data.data.listaValoraciones);
				} else {
					console.error('Error en la respuesta de la API');
				}
			} catch (error) {
				console.error('Error al obtener la lista de objetivos:', error);
			}
		};

		fetchValoraciones();
	}, []);

	const renderValue = (value: any, nameData: string) => {
		const propertyName = camelCaseToHuman(nameData);

		if (value === null) {
			return null;
		}

		switch (typeof value) {
			case 'string':
				return (
					<p key={nameData}>
						{propertyName}: {value}
					</p>
				);
			case 'number':
				return (
					<p key={nameData}>
						{propertyName}: {value}
					</p>
				);
			case 'object':
				return Array.isArray(value) ? (
					renderArray(value, nameData)
				) : (
					<p key={nameData}>{JSON.stringify(value, null, 2)}</p>
				);
			default:
				return null;
		}
	};

	const renderArray = (array: any[], nameData: string) => {
		switch (nameData) {
			case 'listaMetas':
				return (
					<div key={nameData}>
						<h2>Listado de Metas</h2>
						<Accordion defaultActiveKey='0' alwaysOpen>
							{array.map((meta) => (
								<Accordion.Item eventKey={`${meta.idMeta}`} key={`meta-${meta.idMeta}`}>
									<Accordion.Header>Mostrar meta {meta.idMeta}</Accordion.Header>
									<Accordion.Body>
										<span>Descripción:</span>
										<p>{meta.descripcion}</p>
										<span>Resultado:</span>
										<p>{meta.resultado}</p>
										<span>Observaciones:</span>
										<p>{meta.observaciones}</p>
										<p>
											<span>Valoracion:</span> {stringValoracion(meta.valoracion)}
										</p>
									</Accordion.Body>
								</Accordion.Item>
							))}
						</Accordion>
					</div>
				);
			case 'listaInstituciones':
				return (
					<div key={nameData}>
						<h2>Listado de Instituciones</h2>
						<ul>
							{array.map((institucion) => (
								<li key={`institucion-${institucion.idInstitucion}`}>
									<a href={institucion.ubicacion}>{institucion.nom}</a>
								</li>
							))}
						</ul>
					</div>
				);
			case 'listaEnlaces':
				return (
					<div key={nameData}>
						<h2>Listado de Instituciones</h2>
						<ul>
							{array.map((enlace) => (
								<li key={`enlace-${enlace.idEnlace}`}>
									<a href={enlace.link}>{enlace.desc}</a>
								</li>
							))}
						</ul>
					</div>
				);
			default:
				return (
					<div key={nameData}>
						{array.map((item, index) => (
							<li key={`${nameData}-${index}`}>
								{typeof item === 'object' ? (
									<pre>{item.type + JSON.stringify(item, null, 2)}</pre>
								) : (
									item
								)}
							</li>
						))}
					</div>
				);
		}
	};

	const renderDate = () => {};

	const properties = Object.keys(objectData);

	return <div>{properties.map((nameData) => renderValue(objectData[nameData], nameData))}</div>;
};

export default DataRender;
