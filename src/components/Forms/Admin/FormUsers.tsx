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
import { UserData, UserFormData } from '@/types/UserProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Add } from '@mui/icons-material';

const MySwal = withReactContent(Swal);

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

	const { handleSubmit, control, formState } = useForm<UserFormData>({
		defaultValues: {
			nom: userData.persona.nom,
			ape: userData.persona.ape,
			email: userData.usuario.email,
			pass: userData.usuario.pass,
			anio: undefined,
			programas: [],
			areas: [],
		},
	});

	useEffect(() => {
		// Cargar años disponibles
		setYearOptions(
			bases.lAreasProgramasAnios.map((item) => ({ label: item.anio.toString(), value: item.anio })),
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
				.filter((area) => area.anio === selectedYear.value)
				.flatMap((area) => area.listaProgramas)
				.map((program) => ({ label: program.nom, value: program.idPrograma }));

			const allPrograms = bases.lAreasProgramasAnios
				.filter((item) => item.anio === selectedYear.value)
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
				.filter((item) => item.anio === selectedYear?.value)
				.flatMap((item) => item.listaProgramas)
				.filter((program) => program.idPrograma === selectedProgram.value)
				.flatMap((program) => program.listaAreas)
				.map((area) => ({ label: area.nom, value: area.idArea }));

			const userAreas = userData.areas
				.filter((area) => area.anio === selectedYear?.value)
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

	const onSubmit = (data: UserFormData) => {
		console.log(data);
		// Implement your onSave logic here
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
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
									name='nom'
									label='Nombre'
									rules={validationRules.nom}
								/>
							</Col>
							<Col>
								<FormInput
									control={control}
									name='ape'
									label='Apellido'
									rules={validationRules.ape}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormInput
									control={control}
									name='email'
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
											name='pass'
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
									name='anio'
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											options={yearOptions}
											onChange={(selectedOption: SingleValue<OptionProps>) => {
												field.onChange(selectedOption?.value || null);
												setSelectedYear(selectedOption);
											}}
											value={yearOptions.find((option) => option.value === field.value) || null}
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
										name='programas'
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
												placeholder='Agregar Programa'
												className='flex-grow-1'
											/>
										)}
									/>
									<IconButton
										className='ml-2'
										onClick={() => console.log('Agregar nuevo programa')}
									>
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
										name='areas'
										control={control}
										render={({ field }) => (
											<Select
												options={allAreasOptions}
												onChange={(selectedOption: MultiValue<OptionProps>) => {
													const value = selectedOption.map((opt) => opt.value);
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
					Programas
				</Tab>
			</Tabs>

			<Button type='submit' variant='primary' className='mt-auto'>
				Guardar
			</Button>
		</Form>
	);
};

export default FormUsers;
