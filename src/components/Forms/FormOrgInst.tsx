import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, NavLink } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
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

	const AlertBuscarUbicaciones = () => {
		// Alerta con iframe y video de youtube
		Swal.fire({
			title: 'Ubicaciones',
			html: ` 
				<p>
					Utilice la herramienta de Google Maps para insertar el enlace de la ubicación de la
					actividad. Si necesita ayuda, consulte en este video.
				</p>
				<p>Si necesita ayuda para compartir el enlace, consulte el siguiente video.</p>
			<iframe width="600" height="355" 
				src="https://www.youtube.com/embed/KoN9aRs6a4E" 
				title="YouTube video player" 
				allow="fullscreen;" 
				frameborder="0" 
				allow="accelerometer; 
				autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`,
			confirmButtonText: 'Cerrar',
			width: '80%',
		});
	};

	return (
		<div className=' d-flex flex-column h-100'>
			<div className='m-2'>
				<p>
					Ubicación se refiere al punto del mapa en donde se encuentre el lugar de la actividad.
					Utilice la herramienta de Google Maps para insertar el enlace de dicha ubicación.
				</p>

				<div className='d-flex justify-content-end my-2'>
					<Button variant='info' size='sm' onClick={AlertBuscarUbicaciones}>
						¿Cómo buscar link de ubicación?
					</Button>
				</div>

				<Form
					className=' d-flex align-items-center gap-2 justify-content-center w-100 pb-2  '
					onSubmit={submitForm}
				>
					<Form.Control
						type='text'
						name='name'
						value={name}
						placeholder='Nombre de la institucion'
						onChange={(e) => handleInstChange(e)}
						list='listSearchInstituciones'
						onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
							const inputValue = e.target.value;
							const isValueInDatalist = arraySearchInstitucion?.some((inst) =>
								inst.nom?.includes(inputValue),
							);
							if (isValueInDatalist) {
								setName('');
								setUbicacion('');
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
					<Button
						variant='success'
						type='submit'
						disabled={name.length === 0 || ubicacion.length === 0 || !isUrlValid(ubicacion)}
					>
						Agregar
					</Button>
				</Form>
				<div className='ListaInstituciones'>
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
			</div>
			<Button
				variant='success'
				className='mt-auto mb-3 align-self-center '
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
