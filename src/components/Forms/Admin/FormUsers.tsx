import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import FormInput from '@/components/Common/FormInput';
import {
	UserData,
	UserFormData,
	Area,
	LAreasProgramasAnio,
	ListaPrograma,
	ListaArea,
} from '@/types/UserProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const MySwal = withReactContent(Swal);

interface FormUsersProps {
	userData: UserData;
	onSave: (userData: UserData) => void;
	onClose: () => void;
}

const roles = ['Admin', 'User', 'Manager'];

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

const FormUsers: React.FC<FormUsersProps> = ({ userData, onSave, onClose }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [selectedYear, setSelectedYear] = useState<number | null>(null);
	const [yearOptions, setYearOptions] = useState<{ label: string; value: number }[]>([]);
	const [programOptions, setProgramOptions] = useState<{ label: string; value: number }[]>([]);
	const [areaOptions, setAreaOptions] = useState<{ label: string; value: number }[]>([]);
	const [loadingYears, setLoadingYears] = useState<boolean>(true);
	const [loadingPrograms, setLoadingPrograms] = useState<boolean>(false);
	const [loadingAreas, setLoadingAreas] = useState<boolean>(false);

	const { bases, error, loading } = useSelector((state: RootState) => state.metas);

	const { handleSubmit, control, reset, formState } = useForm<UserFormData>({
		defaultValues: {
			nom: userData.nom,
			ape: userData.ape,
			email: userData.email,
			pass: userData.pass,
			roles: userData.roles,
			anio: userData.areas.length > 0 ? userData.areas[0].anio : null,
			programas: userData.areas.map((area) => area.idPrograma),
			areas: userData.areas.map((area) => area.idArea),
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
			// Cargar programas para el año seleccionado
			const programs =
				bases.lAreasProgramasAnios.find((item) => item.anio === selectedYear)?.listaProgramas || [];
			const options = programs.map((program) => ({
				label: program.nom,
				value: program.idPrograma,
			}));
			setProgramOptions(options);
			setLoadingPrograms(false);
		}
	}, [selectedYear, bases.lAreasProgramasAnios]);

	const handleProgramChange = (selectedPrograms: { label: string; value: number }[]) => {
		if (selectedPrograms.length > 0) {
			setLoadingAreas(true);
			// Cargar áreas para los programas seleccionados
			const areas = selectedPrograms.flatMap(
				(program) =>
					bases.lAreasProgramasAnios
						.find((item) => item.anio === selectedYear)
						?.listaProgramas.find((p) => p.idPrograma === program.value)?.listaAreas || [],
			);
			const options = areas.map((area) => ({ label: area.nom, value: area.idArea }));
			setAreaOptions(options);
			setLoadingAreas(false);
		} else {
			setAreaOptions([]);
		}
	};

	const onSubmit = (data: UserFormData) => {
		const areas: Area[] = data.areas.map((areaId) => {
			const programId = data.programas.find((program) => program === areaId);
			return {
				idArea: areaId,
				idPrograma: programId || 0,
				anio: data.anio || 0,
				idCategoria: 0, // Define según tu lógica
				idUsuario: userData.idUsuario,
			};
		});

		const userDataToSave: UserData = {
			...userData,
			nom: data.nom,
			ape: data.ape,
			email: data.email,
			pass: data.pass,
			roles: data.roles,
			areas,
			updatedAt: new Date(),
		};

		onSave(userDataToSave);
		reset(data);
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
					<Form.Group controlId='formPass' className=' mb-2'>
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
				{!loadingYears && (
					<Controller
						name='anio'
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={yearOptions}
								onChange={(selectedOption) => {
									field.onChange(selectedOption || null);
									setSelectedYear(selectedOption || null);
								}}
							/>
						)}
					/>
				)}
				{loadingYears && <p>Cargando años...</p>}
			</Form.Group>
			<Form.Group controlId='formPrograms' className='mb-2'>
				<Form.Label>Programas</Form.Label>
				{selectedYear !== null && !loadingPrograms && (
					<Controller
						name='programas'
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								isMulti
								options={programOptions}
								onChange={(selectedOptions) => {
									field.onChange(selectedOptions.map((option) => option));
									handleProgramChange(selectedOptions);
								}}
							/>
						)}
					/>
				)}
				{loadingPrograms && <p>Cargando programas...</p>}
			</Form.Group>
			<Form.Group controlId='formAreas' className='mb-2'>
				<Form.Label>Áreas</Form.Label>
				{selectedYear !== null && !loadingAreas && (
					<Controller
						name='areas'
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								isMulti
								options={areaOptions}
								onChange={(selectedOptions) =>
									field.onChange(selectedOptions.map((option) => option))
								}
							/>
						)}
					/>
				)}
				{loadingAreas && <p>Cargando áreas...</p>}
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
