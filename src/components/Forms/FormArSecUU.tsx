import Select, { MultiValue } from 'react-select';
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

	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);
	const { bases, error } = useSelector((state: RootState) => state.metasSlice);

	const [relaciones, setRelaciones] = useState<Relacion[]>([]);
	const [sippe, setSippe] = useState<ListaProgramasSIPPE[]>([]);

	const [relacionSeleccionadas1, setRelacionSeleccionadas1] = useState<Option[]>([]);
	const [relacionSeleccionadas2, setRelacionSeleccionadas2] = useState<Option[]>([]);
	const [relacionSeleccionadas3, setRelacionSeleccionadas3] = useState<Option[]>([]);
	const [sippeSeleccionadas, setSippeSeleccionadas] = useState<number[]>([]);

	useEffect(() => {
		if (!error && bases) {
			setRelaciones(bases.listaRelaciones);
			setSippe(bases.listaProgramasSIPPE);
		} else {
			// TODO: Alerta de error global
		}
	}, [bases, error]);

	const filtrarAreas = (nomRelacion: string): Option[] => {
		console.log(
			'FN filtrarAreas ' + ' - ' + nomRelacion,
			relaciones
				.filter((relacion) => relacion.tipoRelacion.nom === nomRelacion)
				.map((relacion) => ({
					value: relacion.idRelacion,
					label: relacion.nom,
				})),
		);
		return relaciones
			.filter((relacion) => relacion.tipoRelacion.nom === nomRelacion)
			.map((relacion) => ({
				value: relacion.idRelacion,
				label: relacion.nom,
			}));
	};

	const listaProgramasSIPPE: Option[] = sippe.map((sippe) => ({
		value: sippe.idProgramaSippe,
		label: sippe.nom,
	}));

	const filtrarRelaciones = useCallback(
		(filterFn: Option[]) => {
			if (estadoActualizado.listaRelaciones) {
				return filterFn.filter((el) =>
					estadoActualizado.listaRelaciones?.some((ri) => ri === el.value),
				);
			} else {
				return [];
			}
		},
		[estadoActualizado],
	);

	useEffect(() => {
		setRelacionSeleccionadas1(filtrarRelaciones(filtrarAreas('interna_extensión')));
		setRelacionSeleccionadas2(filtrarRelaciones(filtrarAreas('interna_unl')));
		setRelacionSeleccionadas3(filtrarRelaciones(filtrarAreas('U.A.')));
		console.log('Otras effect');
	}, [relaciones]);

	useEffect(() => {
		const sincronizarSelectsSIPPE = () => {
			if (estadoActualizado.listaProgramasSIPPE) {
				setSippeSeleccionadas(estadoActualizado.listaProgramasSIPPE);
			}
		};
		sincronizarSelectsSIPPE();
		console.log('Sippe effect');
	}, [estadoActualizado.listaProgramasSIPPE]);

	const handleSelects = (selected: Option[], num: number) => {
		switch (num) {
			case 1:
				setRelacionSeleccionadas1(selected);
				break;
			case 2:
				setRelacionSeleccionadas2(selected);
				break;
			case 3:
				setRelacionSeleccionadas3(selected);
				break;
		}
	};

	const handleSippeChange = (selectedOptions: MultiValue<Option>) => {
		const selectedValues = selectedOptions.map((option) => option.value);
		setSippeSeleccionadas(selectedValues);
	};

	return (
		<div className='FormArSecuu d-flex m-0  p-0 px-5 gap-0'>
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
								onChange={(selected) => handleSelects(selected as Option[], 1)}
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
								onChange={(selected) => handleSelects(selected as Option[], 2)}
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
								onChange={(selected) => handleSelects(selected as Option[], 3)}
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
								options={listaProgramasSIPPE}
								placeholder={'seleccionar'}
								value={listaProgramasSIPPE.filter((option) =>
									sippeSeleccionadas.includes(option.value),
								)}
								onChange={handleSippeChange}
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
				className='Save align-self-center my-2 '
				onClick={() => {
					guardarActividad(
						{
							...estadoActualizado,
							listaRelaciones: Array.from(
								new Set([
									...relacionSeleccionadas1.map((el) => el.value),
									...relacionSeleccionadas2.map((el) => el.value),
									...relacionSeleccionadas3.map((el) => el.value),
								]),
							),
							listaProgramasSIPPE: Array.from(new Set([...sippeSeleccionadas])),
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
