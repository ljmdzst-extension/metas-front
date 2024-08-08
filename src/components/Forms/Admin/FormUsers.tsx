import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Form,
	Button,
	Row,
	Col,
	InputGroup,
	CloseButton,
	Tabs,
	Tab,
	Container,
} from 'react-bootstrap';
import Select, { MultiValue, SingleValue } from 'react-select';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormInput from '@/components/Common/FormInput';
import { Area, UserData } from '@/types/UserProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Add } from '@mui/icons-material';

const MySwal = withReactContent(Swal);

Swal.bindClickHandler();

Swal.mixin({
	toast: true,
}).bindClickHandler('#data-swal-custom-toast');

interface FormUsersProps {
	userData: UserData;
	onSave: (userData: UserData) => void;
	onClose: () => void;
}

const validationRules = {
	nom: { required: 'Nombre es requerido' },
	ape: { required: 'Apellido es requerido' },
	email: {
		required: 'Email es requerido',
		pattern: {
			value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			message: 'Email inválido',
		},
	},
	pass: { required: 'Contraseña es requerida' },
};

interface OptionProps {
	value: number;
	label: string;
}

const FormUsers: React.FC<FormUsersProps> = ({ userData, onClose }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [selectedYear, setSelectedYear] = useState<OptionProps | null>(null);
	const [yearOptions, setYearOptions] = useState<OptionProps[]>([]);
	const [selectedProgram, setSelectedProgram] = useState<OptionProps | null>(null);
	const [loadingYears, setLoadingYears] = useState<boolean>(true);
	const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false);
	const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
	const [currentCompleteAreaList, setCurrentCompleteAreaList] = useState<Area[]>(userData.areas);

	const { bases } = useSelector((state: RootState) => state.metas);

	const { handleSubmit, control, watch } = useForm<UserData>({
		defaultValues: userData,
	});

	useEffect(() => {
		// Cargar años disponibles
		setYearOptions(
			bases.lAreasProgramasAnios.map((item, index) => ({
				label: item.anio.toString(),
				value: index,
			})),
		);
		setLoadingYears(false);
	}, [bases.lAreasProgramasAnios]);

	const getPrograms = useCallback(
		(type = 'all'): OptionProps[] => {
			if (selectedYear === null) {
				return [];
			}
			setLoadingPrograms(true);
			if (type === 'user') {
				const userPrograms = currentCompleteAreaList
					.filter((area) => area.anio === Number(selectedYear.label))
					.flatMap((area) => area.listaProgramas)
					.map((program) => ({ label: program.nom, value: program.idPrograma }));
				setLoadingPrograms(false);
				return userPrograms;
			} else if (type === 'all') {
				const allPrograms = bases.lAreasProgramasAnios
					.filter((item) => item.anio === Number(selectedYear.label))
					.flatMap((item) => item.listaProgramas)
					.map((program) => ({ label: program.nom, value: program.idPrograma }));
				setLoadingPrograms(false);
				return allPrograms;
			}

			return [];
		},
		[selectedYear, currentCompleteAreaList, bases.lAreasProgramasAnios],
	);

	const getAreas = useCallback(
		(type = 'all'): OptionProps[] => {
			if (selectedProgram === null) {
				return [];
			}
			setLoadingAreas(true);
			if (type === 'user') {
				const userAreas = currentCompleteAreaList
					.filter((area) => area.anio === Number(selectedYear?.label))
					.flatMap((area) => area.listaProgramas)
					.filter((program) => program.idPrograma === selectedProgram.value)
					.flatMap((program) => program.listaAreas)
					.map((area) => ({ label: area.nom, value: area.idArea }));
				setLoadingAreas(false);
				return userAreas;
			} else if (type === 'all') {
				const allAreas = bases.lAreasProgramasAnios
					.filter((item) => item.anio === Number(selectedYear?.label))
					.flatMap((item) => item.listaProgramas)
					.filter((program) => program.idPrograma === selectedProgram.value)
					.flatMap((program) => program.listaAreas)
					.map((area) => ({ label: area.nom, value: area.idArea }));
				setLoadingAreas(false);
				return allAreas;
			}

			return [];
		},
		[selectedProgram, currentCompleteAreaList, selectedYear?.label, bases.lAreasProgramasAnios],
	);

	const editAreaData = useCallback(
		(type: string, data: any) => {
			switch (type) {
				case 'add-program':
					setCurrentCompleteAreaList((prevState) => {
						const updatedList = [...prevState];
						const yearIndex = updatedList.findIndex(
							(area) => area.anio === Number(selectedYear?.label),
						);

						if (yearIndex !== -1) {
							const programIndex = updatedList[yearIndex].listaProgramas.findIndex(
								(program) => program.idPrograma === data.value,
							);

							if (programIndex === -1) {
								updatedList[yearIndex].listaProgramas.push({
									idPrograma: data.value,
									nom: data.label,
									listaAreas: [],
								});
							}
						} else {
							updatedList.push({
								anio: Number(selectedYear?.label),
								listaProgramas: [
									{
										idPrograma: data.value,
										nom: data.label,
										listaAreas: [],
									},
								],
							});
						}

						return updatedList;
					});
					break;

				case 'add-area':
					setCurrentCompleteAreaList((prevState) => {
						const updatedList = [...prevState];
						const yearIndex = updatedList.findIndex(
							(area) => area.anio === Number(selectedYear?.label),
						);

						if (yearIndex !== -1) {
							const programIndex = updatedList[yearIndex].listaProgramas.findIndex(
								(program) => program.idPrograma === selectedProgram?.value,
							);

							if (programIndex !== -1) {
								data.forEach((area: OptionProps) => {
									const areaIndex = updatedList[yearIndex].listaProgramas[
										programIndex
									].listaAreas.findIndex((existingArea) => existingArea.idArea === area.value);

									if (areaIndex === -1) {
										updatedList[yearIndex].listaProgramas[programIndex].listaAreas.push({
											idArea: area.value,
											nom: area.label,
										});
									}
								});
							} else {
								updatedList[yearIndex].listaProgramas.push({
									idPrograma: selectedProgram?.value,
									nom: selectedProgram?.label,
									listaAreas: data.map((area: OptionProps) => ({
										idArea: area.value,
										nom: area.label,
									})),
								});
							}
						} else {
							updatedList.push({
								anio: Number(selectedYear?.label),
								listaProgramas: [
									{
										idPrograma: selectedProgram?.value,
										nom: selectedProgram?.label,
										listaAreas: data.map((area: OptionProps) => ({
											idArea: area.value,
											nom: area.label,
										})),
									},
								],
							});
						}

						return updatedList;
					});
					break;

				default:
					break;
			}
		},
		[selectedYear, selectedProgram],
	);

	const onSubmit = (data: UserData) => {
		// NOTE: reemplazar data.areas por currentCompleteAreaList
		data.areas = currentCompleteAreaList;
		console.log(data);
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const generateFieldName = useCallback(
		(type: 'anio' | 'programas' | 'areas'): any => {
			const yearIndex = selectedYear ? Number(selectedYear.value) : 0;
			console.log(selectedYear)

			if (type === 'anio') {
				return `areas.${yearIndex}.anio`;
			}

			if (!selectedProgram) return '';

			const programIndex = currentCompleteAreaList[yearIndex]?.listaProgramas.findIndex(
				(program) => program.idPrograma === selectedProgram.value,
			);

			if (type === 'programas') {
				return `areas.${yearIndex}.listaProgramas`;
			} else if (type === 'areas') {
				return `areas.${yearIndex}.listaProgramas.${programIndex}.listaAreas`;
			}

			return '';
		},
		[currentCompleteAreaList, selectedProgram, selectedYear],
	);

	const handleYearChange = useCallback(
		(selectedOption: SingleValue<OptionProps>) => {
			setSelectedYear(selectedOption);
			console.log(watch(generateFieldName('anio')));
		},
		[generateFieldName, watch],
	);

	const handleProgramChange = useCallback((selectedOption: SingleValue<OptionProps>) => {
		setSelectedProgram(selectedOption);
	}, []);

	const handleAddProgram = () => {
		MySwal.fire({
			title: 'Agregar Programa',
			animation: false,
			html: getPrograms('all')
				.map((program) => {
					const isSelected = getPrograms('user').some(
						(selected) => selected.value === program.value,
					);
					return `<button class="swal2-program-button btn btn-primary btn-sm m-1" data-value="${
						program.value
					}" ${isSelected ? 'disabled' : ''}>${program.label}</button>`;
				})
				.join(''),
			toast: true,
			showCloseButton: true,
			showConfirmButton: false,
			showCancelButton: false,
			didOpen: () => {
				const toastContainer = MySwal.getContainer();
				const addButton = document.getElementById('addProgramButton');
				if (toastContainer && addButton) {
					const rect = addButton.getBoundingClientRect();
					toastContainer.style.position = 'absolute';
					toastContainer.style.left = `${rect.right - 220}px`; // A la derecha del botón
					toastContainer.style.top = `${rect.top}px`; // Alineado verticalmente
				}

				const buttons = document.querySelectorAll('.swal2-program-button');
				buttons.forEach((button) => {
					button.addEventListener('click', () => {
						const selectedValue = parseInt(button.getAttribute('data-value') as string);
						const selectedProgram = getPrograms('all').find(
							(program) => program.value === selectedValue,
						);
						if (selectedProgram) {
							editAreaData('add-program', selectedProgram);
							MySwal.close();
						}
					});
				});
			},
		});
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column h-100'>
			<div className='d-flex justify-content-end'>
				<CloseButton onClick={onClose} />
			</div>
			<Tabs variant='tabs' transition className=' mb-2' fill>
				<Tab eventKey='user' title='Usuario'>
					<Container>
						<Row>
							<Col>
								<FormInput
									control={control}
									name='persona.nom'
									label='Nombre'
									rules={validationRules.nom}
								/>
							</Col>
							<Col>
								<FormInput
									control={control}
									name='persona.ape'
									label='Apellido'
									rules={validationRules.ape}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormInput
									control={control}
									name='usuario.email'
									label='Email'
									type='email'
									rules={validationRules.email}
								/>
							</Col>
							<Col>
								<Form.Group controlId='formPass' className='mb-2'>
									<Form.Label>Contraseña</Form.Label>
									<div className='d-flex align-items-center'>
										<Controller
											name='usuario.pass'
											control={control}
											rules={validationRules.pass}
											render={({ field, fieldState: { error } }) => (
												<div>
													<Form.Control
														size='sm'
														type={showPassword ? 'text' : 'password'}
														isInvalid={!!error}
														{...field}
													/>
													<Form.Control.Feedback type='invalid'>
														{error?.message}
													</Form.Control.Feedback>
												</div>
											)}
										/>
										<IconButton onClick={toggleShowPassword} className='ml-2'>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</div>
								</Form.Group>
							</Col>
						</Row>
					</Container>
				</Tab>
				<Tab eventKey='metas' title='Planificaciones y resultados'>
					<Container>
						<Form.Group controlId='formYear' className='mb-2'>
							<Form.Label>Año</Form.Label>
							{loadingYears ? (
								<p>Cargando años...</p>
							) : (
								<Controller
									name={generateFieldName('anio')}
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											options={yearOptions}
											onChange={(selectedOption) => {
												handleYearChange(selectedOption);
												field.onChange(selectedOption?.value || null);
											}}
											value={selectedYear}
										/>
									)}
								/>
							)}
						</Form.Group>
						<Form.Group controlId='formPrograms' className='mb-2'>
							<Form.Label>Programas</Form.Label>
							{selectedYear && !loadingPrograms ? (
								<InputGroup className='d-flex'>
									<Controller
										name={generateFieldName('programas')}
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												options={getPrograms('user')}
												onChange={(selectedOption) => {
													handleProgramChange(selectedOption);
													field.onChange(selectedOption);
												}}
												placeholder='No hay programas cargados'
												className='flex-grow-1'
											/>
										)}
									/>
									<IconButton className='ml-2' id='addProgramButton' onClick={handleAddProgram}>
										<Add />
									</IconButton>
								</InputGroup>
							) : (
								<p>Seleccione un año primero</p>
							)}
						</Form.Group>
						<Form.Group controlId='formAreas' className='mb-2'>
							<Form.Label>Áreas</Form.Label>
							{selectedProgram && !loadingAreas ? (
								<InputGroup className='d-flex'>
									<Controller
										name={generateFieldName('areas')}
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												options={getAreas()}
												onChange={(selectedOption) => {
													const selectedAreas = selectedOption as MultiValue<OptionProps>;
													field.onChange(selectedAreas);
													editAreaData('add-area', selectedAreas);
												}}
												isClearable
												isMulti
												placeholder='Agregar Área'
												className='flex-grow-1'
												value={getAreas('user')}
											/>
										)}
									/>
								</InputGroup>
							) : (
								<p>Seleccione un programa primero</p>
							)}
						</Form.Group>
					</Container>
				</Tab>
				<Tab eventKey='gestor' title='Gestor'>
					<div className=' d-flex justify-content-center align-items-center'>Gestor</div>
				</Tab>
			</Tabs>
			<Button type='submit' variant='primary' className='mt-auto'>
				Guardar
			</Button>
		</Form>
	);
};

export default FormUsers;
