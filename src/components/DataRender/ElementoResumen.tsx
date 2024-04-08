import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { LArea, ListaProgramasSIPPE } from '../../types/BasesProps';
import { Actividad } from '../../types/ActivityProps';
import { getBases } from '../../redux/actions/metasActions';
import Swal from 'sweetalert2';

interface Props {
	element: Actividad;
}

interface Area {
	idRelacion: number;
	nom: string;
	idTipoRelacion: number;
}

const ElementoResumen = ({ element }: Props) => {
	const { idActividad, desc, listaRelaciones, listaMetas, listaObjetivos } = element;

	const [areas, setAreas] = useState<LArea[]>([]);
	const [listaSIPPE, setListaSIPPE] = useState<ListaProgramasSIPPE[]>();

	const [areasMap, setAreasMap] = useState<Record<string, Area>>({});

	const dispatch = useDispatch();
	const { bases, error, loading } = useSelector((state: RootState) => state.metasSlice);

	useEffect(() => {
		if (!error && bases) {
			setAreas(bases.lAreas);
			setListaSIPPE(bases.listaProgramasSIPPE);
		}

		if (!bases) {
			const dispachBases = async () => {
				const action = await dispatch(getBases(token));
				if (getBases.rejected.match(action)) {
					const { error } = action.payload as { error: string };
					Swal.fire({
						title: 'Error!',
						text: `${error}`,
						icon: 'error',
						confirmButtonText: 'Ok',
					});
				}
			};
			dispachBases();
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

	const renderObjetivos = () => {
		if (!listaObjetivos || listaObjetivos.length === 0) {
			return <div>No hay objetivos cargados</div>;
		}

		// Filtrar los objetivos de bases.listaObjetivos que coincidan con los IDs de listaObjetivos
		const objetivosFiltrados = bases?.listaObjetivos.filter((objetivo) =>
			listaObjetivos.includes(objetivo.idObjetivo),
		);

		// Verificar si objetivosFiltrados es undefined
		if (!objetivosFiltrados) {
			return <div>No hay objetivos filtrados</div>;
		}

		return (
			<div className=' m-1'>
				<div>
					<h2>Objetivos estratégicos</h2>
					<ul>
						{objetivosFiltrados.map(
							(objetivo, index) =>
								objetivo.idObjetivo <= 4 && (
									<li key={index}>
										<p>{objetivo.nom}</p>
									</li>
								),
						)}
					</ul>
				</div>
				<div>
					<h2>Plan institucional</h2>
					<ul>
						{objetivosFiltrados.map(
							(objetivo, index) =>
								objetivo.idObjetivo >= 5 && (
									<li key={index}>
										<p> {objetivo.nom}</p>
									</li>
								),
						)}
					</ul>
				</div>
				<p className=' px-2 text-end w-100 fst-italic'>
					Referencia:{' '}
					<a
						href='https://www.unl.edu.ar/pie/wp-content/uploads/sites/55/2021/02/Plan-Institucional-Estrat%C3%A9gico.pdf'
						target='_blank'
						rel='noopener noreferrer'
						className=' text-decoration-underline'
					>
						Plan Institucional Estratégico
					</a>
				</p>
			</div>
		);
	};

	return (
		<div className=' pt-2 border-top border-dark-subtle border-2'>
			<div className=' d-flex flex-column gap-2 border border-2 border-dark-subtle '>
				<div>
					<div style={{ ...styles.titleContainer, backgroundColor: ' green' }}>
						<h5>Actividad: {idActividad}</h5>
					</div>
					<div className=' m-1'>
						<p>{desc}</p>
					</div>
				</div>

				<div>
					<div style={styles.titleContainer}>Lista Objetivos</div>
					<div>{renderObjetivos()}</div>
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
								<div style={styles.gridItem}>
									{meta.valoraciones || 'No hay valoración cargada'}
								</div>
							</div>
						))
					) : (
						<div className=' m-1'>No hay metas cargadas</div>
					)}
				</div>

				<div>
					<div style={{ ...styles.titleContainer }}>Áreas</div>
					<div className=' m-1'>
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
			</div>
		</div>
	);
};

const styles = {
	titleContainer: {
		backgroundColor: '#198754',
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
