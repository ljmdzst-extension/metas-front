import { Accordion } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

interface Props {
	objectData: any;
}

const DataRender = ({ objectData }: Props) => {
	const camelCaseToHuman = (str: string) => {
		return str
			.replace(/([A-Z])/g, ' $1') // inserta espacio antes de cada mayúscula
			.replace(/^./, (s) => s.toUpperCase()); // capitaliza la primera letra
	};

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
										<h5>Descripción:</h5>
										<p>{meta.descripcion}</p>
										<h5>Resultado:</h5>
										<p>{meta.resultado}</p>
										<h5>Observaciones:</h5>
										<p>{meta.observaciones}</p>
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
