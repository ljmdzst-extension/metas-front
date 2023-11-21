import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListGroup } from 'react-bootstrap';
interface FormDescriptionUbicationProps {
	onClose: () => void;
}
const FormDescriptionUbication: React.FC<FormDescriptionUbicationProps> = () => {
	const dispatch = useDispatch();

	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);
	const [editandoDescripcion, setEditandoDescripcion] = useState(false);
	const [descripcion, setDescripcion] = useState<string>(estadoActualizado.desc ?? '');

	const [ubicacion, setUbicacion] = useState<string>('');
	const [ubicaciones, setUbicaciones] = useState<
		{
			idUbicacion: number | null;
			nom: string | null;
			idActividad: number | null;
			enlace: string | null;
		}[]
	>([]);

	useEffect(() => {
		if (estadoActualizado.listaUbicaciones) {
			setUbicaciones(estadoActualizado.listaUbicaciones);
		}
	}, []);

	const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescripcion(event.target.value);
	};

	const handleUbicacionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUbicacion(event.target.value);
	};

	const agregarUbicacion = () => {
		if (ubicacion.trim() !== '') {
			const nuevaUbicacion = {
				idUbicacion: 0,
				idActividad: null,
				nom: '',
				enlace: ubicacion,
			};

			setUbicaciones([...ubicaciones, nuevaUbicacion]);
			setUbicacion('');
		}
	};

	const handleClickEditarDescripcion = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		setEditandoDescripcion(!editandoDescripcion);
	};

	const eliminarUbicacion = (index: number) => {
		const newUbicaciones = [...ubicaciones];
		newUbicaciones.splice(index, 1);
		setUbicaciones(newUbicaciones);
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

	const isUrlValid = (url: string) => {
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};

	return (
		<div className=' d-flex flex-column  '>
			<div className=' m-2 mx-4 '>
				<div className=' mt-2'>
					<div className='Descripcion'>
						<h5> Descripción: </h5>

						<InputGroup className='mb-3 gap-1'>
							<Form.Control
								as='textarea'
								rows={3}
								style={{ resize: 'none' }}
								aria-label='Inserte descripción'
								aria-describedby='basic-addon2'
								onChange={handleDescripcionChange}
								disabled={!editandoDescripcion}
								value={descripcion}
							/>
							<Button
								variant='secondary'
								id='button-addon2'
								style={{ width: '50px', height: '100px' }}
								onClick={handleClickEditarDescripcion}
							>
								<EditIcon />
							</Button>
						</InputGroup>
					</div>
				</div>

				<div className=' mt-2'>
					<div className=' d-flex justify-content-between mb-2'>
						<h5>Ubicación:</h5>
						<Button variant='info' size='sm' onClick={AlertBuscarUbicaciones}>
							¿Cómo buscar link de ubicación?
						</Button>
					</div>
					<InputGroup className=' gap-1'>
						<Form.Control
							placeholder='Inserte link de ubicación'
							aria-label='Inserte link de ubicación'
							aria-describedby='basic-addon2'
							onChange={handleUbicacionInputChange}
							value={ubicacion}
							isInvalid={ubicacion !== '' && !isUrlValid(ubicacion)}
						/>
						
						<Button
							variant='success'
							id='button-addon2'
							onClick={agregarUbicacion}
							disabled={ubicacion === '' || !isUrlValid(ubicacion)}
						>
							Agregar Ubicación
						</Button>
					</InputGroup>
				</div>
				<ListGroup style={{ height: '150px', maxHeight: '150px', overflowY: 'auto' }}>
					{ubicaciones.map((ubicacion, index) => (
						<ListGroup.Item
							key={index}
							className=' d-flex justify-content-between w-75 align-self-center'
							variant='secondary'
						>
							{ubicacion.enlace ?? ''}
							<DeleteIcon
								onClick={() => eliminarUbicacion(index)}
								style={{
									borderRadius: '20%',
									backgroundColor: 'red',
									color: 'white',
									cursor: 'pointer',
								}}
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>

			<Button
				variant='success'
				className='m-2 w-auto align-self-center '
				onClick={() => {
					guardarActividad(
						{ ...estadoActualizado, desc: descripcion, listaUbicaciones: ubicaciones },
						dispatch,
					);
				}}
			>
				Guardar Actividad
			</Button>
		</div>
	);
};

export default FormDescriptionUbication;
