import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Row, Col } from 'react-bootstrap';
import { ListaProgramasSIPPE } from '@/types/BasesProps';
import { ErrorOutline } from '@mui/icons-material';
import { setHayCambios } from '@/redux/actions/activityAction';
import { useGuardarActividad } from '@/hooks/useGuardarActividad';

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

	const { activity, hayCambios } = useSelector((state: RootState) => state.actividad);
	const { bases, error } = useSelector((state: RootState) => state.metas);
	const { guardarActividad } = useGuardarActividad();
	const [dataLoaded, setDataLoaded] = useState(false);

	const [relacionSeleccionadas1, setRelacionSeleccionadas1] = useState<Option[]>([]);
	const [relacionSeleccionadas2, setRelacionSeleccionadas2] = useState<Option[]>([]);
	const [relacionSeleccionadas3, setRelacionSeleccionadas3] = useState<Option[]>([]);
	const [sippeSeleccionadas, setSippeSeleccionadas] = useState<Option[]>([]);

	const filtrarAreas = useCallback(
		(nomRelacion: string): Option[] => {
			if (!bases) return [];
			return bases.listaRelaciones
				.filter((relacion: Relacion) => relacion.tipoRelacion.nom === nomRelacion)
				.map((relacion: Relacion) => ({
					value: relacion.idRelacion,
					label: relacion.nom,
				}));
		},
		[bases],
	);

	const filtrarRelacionesSeleccionadas = useCallback(
		(filterFn: Option[]) => {
			if (!activity.listaRelaciones) return [];
			return filterFn.filter((el: Option) =>
				activity.listaRelaciones?.some((ri: number) => ri === el.value),
			);
		},
		[activity],
	);

	const formatearSippes = useCallback((): Option[] => {
		if (!bases) return [];
		return bases.listaProgramasSIPPE.map((sippe: ListaProgramasSIPPE) => ({
			value: sippe.idProgramaSippe,
			label: sippe.nom,
		}));
	}, [bases]);

	const filtrarSippeSeleccionadas = useCallback(() => {
		if (!activity.listaProgramasSIPPE) return [];
		return formatearSippes().filter((el: Option) =>
			activity.listaProgramasSIPPE?.some((ri: number) => ri === el.value),
		);
	}, [activity.listaProgramasSIPPE, formatearSippes]);

	useEffect(() => {
		if (!error && bases) {
			setRelacionSeleccionadas1(filtrarRelacionesSeleccionadas(filtrarAreas('interna_extensión')));
			setRelacionSeleccionadas2(filtrarRelacionesSeleccionadas(filtrarAreas('interna_unl')));
			setRelacionSeleccionadas3(filtrarRelacionesSeleccionadas(filtrarAreas('U.A.')));
			setSippeSeleccionadas(filtrarSippeSeleccionadas());

			setDataLoaded(true);
		} else {
		}
	}, [bases, error, filtrarAreas, filtrarRelacionesSeleccionadas, filtrarSippeSeleccionadas]);

	useEffect(() => {
		if (!dataLoaded) return;
		checkForChanges();
	}, [
		dataLoaded,
		relacionSeleccionadas1,
		relacionSeleccionadas2,
		relacionSeleccionadas3,
		sippeSeleccionadas,
	]);

	const checkForChanges = () => {
		// Comprueba si hay cambios

		const relacionValues = Array.from(
			new Set([
				...relacionSeleccionadas1.map((el) => el.value),
				...relacionSeleccionadas2.map((el) => el.value),
				...relacionSeleccionadas3.map((el) => el.value),
			]),
		).sort((a, b) => a - b);
		const sippeValues = sippeSeleccionadas.map((el) => el.value);

		const cambios =
			JSON.stringify(activity.listaRelaciones) !== JSON.stringify(relacionValues) ||
			JSON.stringify(activity.listaProgramasSIPPE) !== JSON.stringify(sippeValues);
		if (hayCambios === cambios) return;

		if (cambios) {
			dispatch(setHayCambios({ valor: true }));
		} else {
			dispatch(setHayCambios({ valor: false }));
		}
	};

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
				className='mt-auto mb-3 align-self-center'
				onClick={() => {
					guardarActividad({
						...activity,
						listaRelaciones: Array.from(
							new Set([
								...relacionSeleccionadas1.map((el) => el.value),
								...relacionSeleccionadas2.map((el) => el.value),
								...relacionSeleccionadas3.map((el) => el.value),
							]),
						),
						listaProgramasSIPPE: Array.from(new Set([...sippeSeleccionadas.map((el) => el.value)])),
					});
				}}
			>
				Guardar Actividad{' '}
				{hayCambios && <ErrorOutline style={{ marginLeft: '10px', color: 'yellow' }} />}
			</Button>
		</div>
	);
}
