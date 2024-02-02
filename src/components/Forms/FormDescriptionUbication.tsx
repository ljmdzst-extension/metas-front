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
import { ContentCopy } from '@mui/icons-material';

import { limitTextString, textLimitError } from '../../utils/validacionesForms';
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

	const handleClickEditarDescripcion = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		description: string,
	) => {
		event.preventDefault();
		if (editandoDescripcion === true && !textLimitError(description, 5000))
			setEditandoDescripcion(!editandoDescripcion);
		if (editandoDescripcion === false) setEditandoDescripcion(!editandoDescripcion);
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

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<div className=' d-flex flex-column  '>
			<div className='  mx-4 my-2 '>
				<div className=''>
					<div className='Descripcion'>
						<h5> Descripción: </h5>

						<InputGroup className='mb-4 gap-1'>
							<Form.Control
								as='textarea'
								rows={3}
								style={{ resize: 'none' }}
								className=' custom-scrollbar'
								aria-label='Inserte descripción'
								aria-describedby='basic-addon2'
								onChange={handleDescripcionChange}
								disabled={!editandoDescripcion}
								value={descripcion}
								isInvalid={textLimitError(descripcion ?? '', 5000)}
							/>

							<Button
								variant='secondary'
								id='button-addon2'
								style={{ width: '50px', height: '100px' }}
								onClick={(event) => handleClickEditarDescripcion(event, descripcion)}
							>
								<EditIcon />
							</Button>
						</InputGroup>
					</div>
				</div>

				<div className=''>
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
				<ListGroup
					style={{ height: '150px', maxHeight: '150px', overflowY: 'auto' }}
					className=' custom-scrollbar'
				>
					{ubicaciones.map((ubicacion, index) => (
						<ListGroup.Item key={index} className=' w-75 align-self-center' variant='secondary'>
							<div className=' d-flex justify-content-between '>
								<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
									{ubicacion.enlace ?? ''}
								</div>
								<div className=' d-flex'>
									<ContentCopy
										className=' cursor-pointer mx-1'
										onClick={(event) => {
											event.stopPropagation();
											copyToClipboard(ubicacion.enlace ?? '');
										}}
									/>
									<DeleteIcon
										onClick={() => eliminarUbicacion(index)}
										style={{
											borderRadius: '20%',
											backgroundColor: 'red',
											color: 'white',
											cursor: 'pointer',
										}}
									/>
								</div>
							</div>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>

			<Button
				variant='success'
				className=' w-auto align-self-center '
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
