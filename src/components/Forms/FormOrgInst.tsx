import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import DeleteIcon from '@mui/icons-material/Delete';
type Institucion = {
	idInstitucion: number | null;
	nom: string | null;
	ubicacion: string | null;
};

export default function FormOrgInst() {
	const dispatch = useDispatch();
	const { activity } = useSelector((state: RootState) => state.actividadSlice);
	const [arrayInstitucion, setArrayInstitucion] = useState<Institucion[]>(
		activity.listaInstituciones || [],
	);
	const [arraySearchInstitucion, setArraySearchInstitucion] = useState<Institucion[]>([]);
	const [searchInstitucion, setSearchInstitucion] = useState<Institucion | undefined>(undefined);

	const [name, setName] = useState('');
	const [ubicacion, setUbicacion] = useState('');

	const { token } = useSelector((state: RootState) => state.authSlice);
	const tokenHeader = { Authorization: `Bearer ${token}` };

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArrayInstitucion([...arrayInstitucion, { idInstitucion: 0, nom: name, ubicacion }]);
		setName('');
		setUbicacion('');
	};
	const eliminarInstitucion = (index: number | null) => {
		// console.log(index);
		if (index !== null) {
			setArrayInstitucion(arrayInstitucion.filter((item, i) => item && i !== index));
		}
	};

	useEffect(() => {
		if (searchInstitucion && arrayInstitucion.every((inst) => inst.nom !== searchInstitucion.nom)) {
			setArrayInstitucion([...arrayInstitucion, searchInstitucion]);
		}
	}, [searchInstitucion]);

	const filterInstitucion = (data: Institucion[]) => {
		// Borrar los que no tienen ubicacion
		const newData = data.filter((inst) => inst.ubicacion !== 'NULL');
		// console.log(newData);
		return newData;
	};

	useEffect(() => {
		let debounce: any;
		if (name.length === 0) {
			debounce = setTimeout(() => {
				fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/bases/instituciones`, {
					headers: tokenHeader,
				})
					.then((resp) => resp.json())
					.then((data) => data.ok && setArraySearchInstitucion(filterInstitucion(data.data)))
					.catch((error) => console.log(error));
			}, 1000);
		} else {
			debounce = setTimeout(() => {
				fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/bases/instituciones/${name}/0/10`, {
					headers: tokenHeader,
				})
					.then((resp) => resp.json())
					.then((data) => data.ok && setArraySearchInstitucion(filterInstitucion(data.data)))
					.catch((error) => console.log(error));
			}, 3000);
		}
		return () => clearTimeout(debounce);
	}, [name]);

	const handleInstChange = (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		setSearchInstitucion(arraySearchInstitucion.find((inst) => inst.nom === e.currentTarget.value));

		if (!searchInstitucion) {
			setName(e.currentTarget.value);
		}
	};

	const isUrlValid = (url: string) => {
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};

	return (
		<div className=' d-flex flex-column m-2'>
			<p>
				Ubicación se refiere al punto del mapa en donde se encuentre el lugar de la actividad.
				Utilice la herramienta de Google Maps para insertar el enlace de dicha ubicación.
			</p>
			<p>
				Si necesita ayuda para compartir el enlace , consulte el siguiente{' '}
				<a
					href='https://www.youtube.com/watch?v=KoN9aRs6a4E'
					target='_blank'
					className=' text-decoration-underline'
				>
					video
				</a>
				.
			</p>
			<Form className=' d-flex flex-column justify-content-center w-100  ' onSubmit={submitForm}>
				<div className='d-flex flex-row justify-content-center gap-4'>
					<Form.Control
						type='text'
						name='name'
						value={name}
						placeholder='Nombre de la institucion'
						onChange={(e) => handleInstChange(e)}
						list='listSearchInstituciones'
						onBlur={(e) => {
							if (arraySearchInstitucion?.some((inst) => inst.nom === e.target.value)) {
								e.target.value = '';
								setName('');
							}
						}}
					/>
					<datalist id='listSearchInstituciones'>
						{arraySearchInstitucion?.map((inst, i) => (
							<option key={i} value={inst.nom ?? '#'}>
								{inst.nom}
							</option>
						))}
					</datalist>

					<Form.Control
						type='text'
						name='ubicacion'
						placeholder='Ubicacion'
						value={ubicacion}
						onChange={(e) => setUbicacion(e.target.value)}
						isInvalid={ubicacion.length > 0 && !isUrlValid(ubicacion)}
					/>
				</div>
				<Button
					variant='success'
					className='SaveChange mx-auto mt-2 '
					type='submit'
					disabled={name.length === 0 || ubicacion.length === 0 || !isUrlValid(ubicacion)}
				>
					Agregar
				</Button>
			</Form>
			<div className='ListaInstituciones'>
				<h6>Las intituciones cargadas son:</h6>
				<div style={{ maxHeight: '200px', overflowY: 'auto' }}>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Nombre</th>
								<th>Ubicacion</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{arrayInstitucion.map((item, index) => (
								<tr key={index}>
									<td style={{ width: '30px' }}>{index + 1}</td>
									<td style={{ width: '20%' }}>{item.nom}</td>
									<td>{item.ubicacion}</td>
									<td style={{ width: '15px' }}>
										<DeleteIcon color='error' onClick={() => eliminarInstitucion(index)} />
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
			<Button
				variant='success'
				className='Save mt-auto align-self-center'
				onClick={() => {
					guardarActividad(
						{
							...activity,
							listaInstituciones: arrayInstitucion,
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
