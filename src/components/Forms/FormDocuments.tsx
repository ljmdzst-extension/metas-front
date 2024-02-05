import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import DeleteIcon from '@mui/icons-material/Delete';

type Documento = {
	idEnlace: number | null;
	link: string | null;
	desc: string | null;
};

interface FormOrgInstProps {
	onClose: () => void;
}

export default function FormOrgInst({}: FormOrgInstProps) {
	const dispatch = useDispatch();
	const [arrayDocumentos, setArrayDocumentos] = useState<Documento[]>([]);
	const [descripcion, setDescripcion] = useState('');
	const [nombreArchivo, setNombreArchivo] = useState('');
	const estadoActualizado = useSelector((state: RootState) => state.actividadSlice);

	useEffect(() => {
		if (estadoActualizado.listaEnlaces) {
			const enlacesMapeados = estadoActualizado.listaEnlaces.map((enlace) => ({
				idEnlace: enlace.idEnlace,
				link: enlace.link || null,
				desc: enlace.desc || null,
			}));
			setArrayDocumentos(enlacesMapeados);
		}
	}, [estadoActualizado.listaEnlaces]);

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (descripcion && nombreArchivo) {
			setArrayDocumentos([
				...arrayDocumentos,
				{
					idEnlace: 0,
					link: nombreArchivo,
					desc: descripcion,
				},
			]);

			setDescripcion('');
			setNombreArchivo('');
		}
	};

	const eliminarDocumento = (id: number, index: number) => {
		console.log(id, index);
		console.log(arrayDocumentos);
		const documentosFiltrados = arrayDocumentos.filter(
			(item, i) => i !== index || item.idEnlace !== id,
		);
		console.log(documentosFiltrados);
		setArrayDocumentos(documentosFiltrados);
	};

	const isUrlValid = (url: string) => {
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};

	return (
		<div className=' d-flex flex-column'>
			<div className=' d-flex flex-column  m-2'>
				<p>Cargue sus enlaces:</p>
				<Form className=' d-flex flex-column justify-content-center' onSubmit={submitForm}>
					<div className=' d-flex gap-2 justify-content-center'>
						<Form.Control
							type='text'
							name='descripcion'
							value={descripcion}
							placeholder='Ingrese una descripción'
							onChange={(e) => setDescripcion(e.target.value)}
						/>

						<Form.Control
							type='text'
							name='ubicacion'
							placeholder='Enlace'
							value={nombreArchivo}
							onChange={(e) => setNombreArchivo(e.target.value)}
							isInvalid={nombreArchivo !== '' && !isUrlValid(nombreArchivo)}
						/>
					</div>
					<Button
						variant='success'
						className='SaveChange mx-auto mt-2 '
						type='submit'
						disabled={nombreArchivo === '' || !isUrlValid(nombreArchivo)}
					>
						Agregar
					</Button>
				</Form>
				<div className=' custom-scrollbar ' style={{ maxHeight: '250px', overflowY: 'auto' }}>
					<Table>
						<thead style={{ position: 'sticky', top: '0' }}>
							<tr>
								<th>Descripción</th>
								<th>Enlace</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{arrayDocumentos.map((item, index) => (
								<tr key={index}>
									<td style={{ width: '15%' }}>{item.desc}</td>
									<td
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											maxWidth: '200px',
										}}
									>
										<a href={item.link ?? ''} target='_blank' rel='noopener noreferrer'>
											{item.link}
										</a>
									</td>
									<td style={{ width: '5%' }}>
										<DeleteIcon
											color='error'
											onClick={() => eliminarDocumento(item.idEnlace ?? 0, index)}
										/>
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
							...estadoActualizado,
							listaEnlaces: arrayDocumentos,
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
