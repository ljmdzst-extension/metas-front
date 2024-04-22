import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
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

export default function FormArSecUU() {
	const dispatch = useDispatch();
	const [relaciones, setRelaciones] = useState<Relacion[]>([]);
	const [sippe, setSippe] = useState<ListaProgramasSIPPE[]>([]);
	const [relacionSeleccionadas1, setRelacionSeleccionadas1] = useState<number[]>([]);
	const [relacionSeleccionadas2, setRelacionSeleccionadas2] = useState<number[]>([]);
	const [relacionSeleccionadas3, setRelacionSeleccionadas3] = useState<number[]>([]);
	const [sippeSeleccionadas, setSippeSeleccionadas] = useState<number[]>([]);

	const { activity } = useSelector((state: RootState) => state.actividadSlice);
	const { bases, error } = useSelector((state: RootState) => state.metasSlice);
	useEffect(() => {
		const sincronizarSelectsRelacion = () => {
			if (activity.listaRelaciones) {
				setRelacionSeleccionadas1(activity.listaRelaciones);
				setRelacionSeleccionadas2(activity.listaRelaciones);
				setRelacionSeleccionadas3(activity.listaRelaciones);
			}
		};
		sincronizarSelectsRelacion();
	}, [activity.listaRelaciones]);
	useEffect(() => {
		const sincronizarSelectsSIPPE = () => {
			if (activity.listaProgramasSIPPE) {
				setSippeSeleccionadas(activity.listaProgramasSIPPE);
			}
		};
		sincronizarSelectsSIPPE();
	}, [activity.listaProgramasSIPPE]);

	useEffect(() => {
		if (!error && bases) {
			setRelaciones(bases.listaRelaciones);
			setSippe(bases.listaProgramasSIPPE);
		} else {
			// TODO: Alerta de error global
		}
	}, [bases, error]);
	interface Option {
		value: number;
		label: string;
	}
	const relacionesInternaUnl: Option[] = relaciones
		.filter((relacion) => relacion.tipoRelacion.nom === 'interna_unl')
		.map((relacion) => ({
			value: relacion.idRelacion,
			label: relacion.nom,
		}));
	const relacionesUA: Option[] = relaciones
		.filter((relacion) => relacion.tipoRelacion.nom === 'U.A.')
		.map((relacion) => ({
			value: relacion.idRelacion,
			label: relacion.nom,
		}));
	const relacionesInternaExtension: Option[] = relaciones
		.filter((relacion) => relacion.tipoRelacion.nom === 'interna_extensión')
		.map((relacion) => ({
			value: relacion.idRelacion,
			label: relacion.nom,
		}));
	const listaProgramasSIPPE: Option[] = sippe.map((sippe) => ({
		value: sippe.idProgramaSippe,
		label: sippe.nom,
	}));
	const handleRelacionChange1 = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
		setRelacionSeleccionadas1(selectedValues);
	};
	const handleRelacionChange2 = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
		setRelacionSeleccionadas2(selectedValues);
	};
	const handleRelacionChange3 = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
		setRelacionSeleccionadas3(selectedValues);
	};
	const handleSippeChange = (selectedOptions: any) => {
		const selectedValues = selectedOptions.map((option: any) => option.value);
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
								options={relacionesInternaExtension}
								placeholder={'seleccionar'}
								value={relacionesInternaExtension.filter((option) =>
									relacionSeleccionadas1.includes(option.value),
								)}
								onChange={handleRelacionChange1}
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
								options={relacionesInternaUnl}
								placeholder={'seleccionar'}
								value={relacionesInternaUnl.filter((option) =>
									relacionSeleccionadas2.includes(option.value),
								)}
								onChange={handleRelacionChange2}
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
								options={relacionesUA}
								placeholder={'seleccionar'}
								value={relacionesUA.filter((option) =>
									relacionSeleccionadas3.includes(option.value),
								)}
								onChange={handleRelacionChange3}
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
							...activity,
							listaRelaciones: Array.from(
								new Set([
									...relacionSeleccionadas1,
									...relacionSeleccionadas2,
									...relacionSeleccionadas3,
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
