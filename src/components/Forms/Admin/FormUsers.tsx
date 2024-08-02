import React, { useState, useEffect } from 'react';
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
import { Area, UserData, UserFormData } from '@/types/UserProps';
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
	const [userProgramsOptions, setUserProgramsOptions] = useState<OptionProps[]>([]);
	const [allProgramsOptions, setAllProgramsOptions] = useState<OptionProps[]>([]);
	const [userAreasOptions, setUserAreasOptions] = useState<OptionProps[]>([]);
	const [allAreasOptions, setAllAreasOptions] = useState<OptionProps[]>([]);
	const [loadingYears, setLoadingYears] = useState<boolean>(true);
	const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false);
	const [loadingAreas, setLoadingAreas] = useState<boolean>(false);

	const { bases } = useSelector((state: RootState) => state.metas);

	const { handleSubmit, control, formState, setValue } = useForm<UserData>({
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

	useEffect(() => {
		if (selectedYear !== null) {
			setLoadingPrograms(true);
			setUserProgramsOptions([]);
			setAllProgramsOptions([]);

			// Cargar programas para el año seleccionado
			const userPrograms = userData.areas
				.filter((area) => area.anio === Number(selectedYear.label))
				.flatMap((area) => area.listaProgramas)
				.map((program) => ({ label: program.nom, value: program.idPrograma }));

			const allPrograms = bases.lAreasProgramasAnios
				.filter((item) => item.anio === Number(selectedYear.label))
				.flatMap((item) => item.listaProgramas)
				.map((program) => ({ label: program.nom, value: program.idPrograma }));

			setAllProgramsOptions(allPrograms);
			setUserProgramsOptions(userPrograms);
			setLoadingPrograms(false);
		}
	}, [selectedYear, bases.lAreasProgramasAnios, userData.areas]);

	useEffect(() => {
		setUserAreasOptions([]);
		setAllAreasOptions([]);
		if (selectedProgram !== null) {
			setLoadingAreas(true);
			const areas = bases.lAreasProgramasAnios
				.filter((item) => item.anio === Number(selectedYear?.label))
				.flatMap((item) => item.listaProgramas)
				.filter((program) => program.idPrograma === selectedProgram.value)
				.flatMap((program) => program.listaAreas)
				.map((area) => ({ label: area.nom, value: area.idArea }));

			const userAreas = userData.areas
				.filter((area) => area.anio === Number(selectedYear?.label))
				.flatMap((area) => area.listaProgramas)
				.filter((program) => program.idPrograma === selectedProgram.value)
				.flatMap((program) => program.listaAreas)
				.map((area) => ({ label: area.nom, value: area.idArea }));

			setAllAreasOptions(areas);
			console.log(userAreas);
			setUserAreasOptions(userAreas);
			setLoadingAreas(false);
		}
	}, [selectedProgram, selectedYear, bases.lAreasProgramasAnios, userData.areas]);

	const handleProgramChange = (selectedOption: SingleValue<OptionProps>) => {
		setSelectedProgram(selectedOption);
	};

	const onSubmit = (data: UserData) => {
		console.log(data);
		// Implement your onSave logic here
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleAddProgram = () => {
		MySwal.fire({
			title: 'Agregar Programa',
			animation: false,
			html: allProgramsOptions
				.map(
					(program) =>
						`<button class="swal2-program-button btn btn-primary btn-sm m-1" data-value="${program.value}">${program.label}</button>`,
				)
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
						const selectedProgram = allProgramsOptions.find(
							(program) => program.value === selectedValue,
						);
						if (selectedProgram) {
							setUserProgramsOptions([...userProgramsOptions, selectedProgram]);

							// console.log(
							// 	'map',

							// 	userData.areas.findIndex((area) => area.anio === selectedYear?.value),
							// );

							// console.log(userData.areas);
							// guardar programa seleccionado en react-hook-form state
							setValue(`areas.${Number(selectedYear?.value)}.listaProgramas`, [
								...userData.areas.flatMap((area) => area.listaProgramas).map((p) => p.idPrograma),
								selectedValue,
							]);

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
									name={`areas.${Number(selectedYear?.value)}.anio`}
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											options={yearOptions}
											onChange={(selectedOption: SingleValue<OptionProps>) => {
												field.onChange(selectedOption?.value || null);
												setSelectedYear(selectedOption);
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
										name={`areas.${Number(selectedYear?.value)}.listaProgramas`}
										control={control}
										render={({ field }) => (
											<Select
												options={userProgramsOptions}
												onChange={(selectedOption: SingleValue<OptionProps>) => {
													const value = selectedOption?.value || 0;
													field.onChange([value]);
													handleProgramChange(selectedOption);
												}}
												isClearable
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
										name={`areas.${Number(selectedYear?.value)}.listaProgramas.${Number(
											selectedProgram?.value,
										)}.listaAreas`}
										control={control}
										render={({ field }) => (
											<Select
												options={allAreasOptions}
												onChange={(selectedOption: MultiValue<OptionProps>) => {
													const value = selectedOption.map((opt) => opt.value);
													setUserAreasOptions(selectedOption as OptionProps[]);
													field.onChange(value);
												}}
												isClearable
												isMulti
												placeholder='Agregar Área'
												className='flex-grow-1'
												value={userAreasOptions}
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
