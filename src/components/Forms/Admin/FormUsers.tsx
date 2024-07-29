import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
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
			programas: undefined,
			areas: undefined,
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
				.map((area) => area.idPrograma);

			const allPrograms = bases.lAreasProgramasAnios
				.filter((item) => item.anio === selectedYear.value)
				.flatMap((item) => item.listaProgramas)
				.map((program) => ({ label: program.nom, value: program.idPrograma }));
			setAllProgramsOptions(allPrograms);

			const uniqueUserPrograms = [...new Set(userPrograms)].map((id) =>
				allPrograms.find((program) => program.value === id),
			);
			setUserProgramsOptions(uniqueUserPrograms as OptionProps[]);
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
				.filter(
					(area) => area.idPrograma === selectedProgram.value && area.anio === selectedYear?.value,
				)
				.map((area) => ({ label: area.idArea.toString(), value: area.idArea }));

			setAllAreasOptions(areas);
			setUserAreasOptions(userAreas);
			setLoadingAreas(false);
		}
	}, [selectedProgram, selectedYear, bases.lAreasProgramasAnios, userData.areas]);

	const handleProgramChange = (selectedOption: SingleValue<OptionProps>) => {
		setSelectedProgram(selectedOption);
	};

	const onSubmit = (data: UserFormData) => {
		console.log(data);

	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClose = () => {
		if (formState.isDirty) {
			MySwal.fire({
				title: '¿Estás seguro?',
				text: 'Tienes cambios no guardados. ¿Seguro que deseas cerrar?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Sí, cerrar',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.isConfirmed) {
					onClose();
				}
			});
		} else {
			onClose();
		}
	};
	
	return (
		<Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column h-100'>
			<Row>
				<Col>
					<FormInput control={control} name='nom' label='Nombre' rules={validationRules.nom} />
				</Col>
				<Col>
					<FormInput control={control} name='ape' label='Apellido' rules={validationRules.ape} />
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
										<Form.Control.Feedback type='invalid'>{error?.message}</Form.Control.Feedback>
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
									{...field}
									className='flex-grow-1'
									options={userProgramsOptions}
									onChange={(selectedOption: SingleValue<OptionProps>) => {
										field.onChange(selectedOption ? [selectedOption.value] : []);
										handleProgramChange(selectedOption);
									}}
									value={
										allProgramsOptions.find((option) => option.value === field.value?.[0]) || null
									}
								/>
							)}
						/>
						<Button
							variant='outline-secondary'
							onClick={() => {
								// Abrir modal con select multi de programas
								// Hacer componente ModalSelect General para reutilizarlo
								// No implementado en este ejemplo
							}}
						>
							<Add />
						</Button>
					</InputGroup>
				) : (
					<p>Cargando programas...</p>
				)}
			</Form.Group>
			<Form.Group controlId='formAreas' className='mb-2'>
				<Form.Label>Áreas</Form.Label>
				{selectedProgram && !loadingAreas ? (
					<Controller
						name='areas'
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								isMulti
								options={allAreasOptions}
								onChange={(selectedOptions: MultiValue<OptionProps>) => {
									field.onChange(
										selectedOptions ? selectedOptions.map((option) => option.value) : [],
									);
								}}
								value={
									allAreasOptions.filter((option) =>
										userAreasOptions.find((area) => area.value === option.value),
									) || null
								}
							/>
						)}
					/>
				) : (
					<p>Cargando áreas...</p>
				)}
			</Form.Group>
			<div className='d-flex justify-content-end mt-2 gap-2 mt-auto'>
				<Button variant='secondary' size='sm' className='mr-2' onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant='primary' size='sm' type='submit'>
					Guardar
				</Button>
			</div>
		</Form>
	);
};

export default FormUsers;
