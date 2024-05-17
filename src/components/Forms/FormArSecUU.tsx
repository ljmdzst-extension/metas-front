import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import { Row, Col } from 'react-bootstrap';
import { ListaProgramasSIPPE } from '../../types/BasesProps';
const animatedComponents = makeAnimated();

interface Relacion {
	idRelacion: number;
	nom: string;
	tipoRelacion: {
		idTipoRelacion: number;
		nom: string;
	};
}

interface Option {
	value: number;
	label: string;
}

export default function FormArSecUU() {
	const dispatch = useDispatch();

	const { activity } = useSelector((state: RootState) => state.actividadSlice);
	const { bases, error } = useSelector((state: RootState) => state.metasSlice);

	const [relaciones, setRelaciones] = useState<Relacion[]>([]);
	const [sippe, setSippe] = useState<ListaProgramasSIPPE[]>([]);

	const [relacionSeleccionadas1, setRelacionSeleccionadas1] = useState<Option[]>([]);
	const [relacionSeleccionadas2, setRelacionSeleccionadas2] = useState<Option[]>([]);
	const [relacionSeleccionadas3, setRelacionSeleccionadas3] = useState<Option[]>([]);
	const [sippeSeleccionadas, setSippeSeleccionadas] = useState<Option[]>([]);

	useEffect(() => {
		if (!error && bases) {
			setRelaciones(bases.listaRelaciones);
			setSippe(bases.listaProgramasSIPPE);
		} else {
			// TODO: Alerta de error global
		}
	}, [bases, error]);

	const filtrarAreas = useCallback(
		(nomRelacion: string): Option[] => {
			return relaciones
				.filter((relacion) => relacion.tipoRelacion.nom === nomRelacion)
				.map((relacion) => ({
					value: relacion.idRelacion,
					label: relacion.nom,
				}));
		},
		[relaciones],
	);

	const filtrarRelacionesSeleccionadas = useCallback(
		(filterFn: Option[]) => {
			if (activity.listaRelaciones) {
				return filterFn.filter((el) => activity.listaRelaciones?.some((ri) => ri === el.value));
			} else {
				return [];
			}
		},
		[activity],
	);

	useEffect(() => {
		setRelacionSeleccionadas1(filtrarRelacionesSeleccionadas(filtrarAreas('interna_extensión')));
		setRelacionSeleccionadas2(filtrarRelacionesSeleccionadas(filtrarAreas('interna_unl')));
		setRelacionSeleccionadas3(filtrarRelacionesSeleccionadas(filtrarAreas('U.A.')));
	}, [filtrarAreas, filtrarRelacionesSeleccionadas, relaciones]);

	const formatearSippes = useCallback((): Option[] => {
		return sippe.map((sippe) => ({
			value: sippe.idProgramaSippe,
			label: sippe.nom,
		}));
	}, [sippe]);

	const filtrarSippeSeleccionadas = useCallback(() => {
		return formatearSippes().filter((el) =>
			activity.listaProgramasSIPPE?.some((ri) => ri === el.value),
		);
	}, [activity.listaProgramasSIPPE, formatearSippes]);

	useEffect(() => {
		setSippeSeleccionadas(filtrarSippeSeleccionadas());
	}, [filtrarSippeSeleccionadas, sippe]);

	return (
		<div className=' d-flex flex-column h-100 px-4 gap-2'>
			<Row>
				<Col>
					<div className='Areas'>
						<h5>Áreas internas de la secretaría</h5>
						<div className='SelectContainers'>
							<p className='parrafo'>Seleccione según corresponda:</p>
							<Select
								styles={{
									valueContainer: (base) => ({ ...base, maxHeight: 100, overflow: 'auto' }),
								}}
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								options={filtrarAreas('interna_extensión')}
								placeholder={'seleccionar'}
								value={relacionSeleccionadas1}
								onChange={(selected) => setRelacionSeleccionadas1(selected as Option[])}
							/>
						</div>
					</div>
				</Col>
				<Col>
					<div className='Secretarias'>
						<h5>Secretarías</h5>
						<div className='SelectContainers'>
							<p className='parrafo'>Seleccione según corresponda:</p>
							<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								options={filtrarAreas('interna_unl')}
								placeholder={'seleccionar'}
								value={relacionSeleccionadas2}
								onChange={(selected) => setRelacionSeleccionadas2(selected as Option[])}
								styles={{
									valueContainer: (base) => ({ ...base, maxHeight: 100, overflow: 'auto' }),
								}}
							/>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className='UUAA'>
						<h5>Unidades Académicas involucradas</h5>
						<div className='SelectContainers'>
							<p className='parrafo'>Seleccione según corresponda:</p>
							<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								options={filtrarAreas('U.A.')}
								placeholder={'seleccionar'}
								value={relacionSeleccionadas3}
								onChange={(selected) => setRelacionSeleccionadas3(selected as Option[])}
								styles={{
									valueContainer: (base) => ({ ...base, maxHeight: 100, overflow: 'auto' }),
								}}
							/>
						</div>
					</div>
				</Col>
				<Col>
					<div className='UUAA'>
						<h5>Programas de Extensión</h5>
						<div className='SelectContainers'>
							<p className='parrafo'>Seleccione según corresponda:</p>
							<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								isMulti
								options={formatearSippes()}
								placeholder={'seleccionar'}
								value={sippeSeleccionadas}
								onChange={(selected) => setSippeSeleccionadas(selected as Option[])}
								styles={{
									valueContainer: (base) => ({ ...base, maxHeight: 100, overflow: 'auto' }),
								}}
							/>
						</div>
					</div>
				</Col>
			</Row>
			<Button
				variant='success'
				className='mt-auto mb-3 align-self-center  '
				onClick={() => {
					guardarActividad(
						{
							...activity,
							listaRelaciones: Array.from(
								new Set([
									...relacionSeleccionadas1.map((el) => el.value),
									...relacionSeleccionadas2.map((el) => el.value),
									...relacionSeleccionadas3.map((el) => el.value),
								]),
							),
							listaProgramasSIPPE: Array.from(
								new Set([...sippeSeleccionadas.map((el) => el.value)]),
							),
						},
						dispatch,
					);
				}}
			>
				Guardar Actividad
			</Button>
		</div>
	);
}
