import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { guardarActividad } from '@/redux/actions/putActividad';
import DeleteIcon from '@mui/icons-material/Delete';
import { SET_HAY_CAMBIOS } from '@/redux/reducers/ActivityReducer';
import { ErrorOutline } from '@mui/icons-material';

type Documento = {
	idEnlace: number | null;
	link: string | null;
	desc: string | null;
};

export default function FormOrgInst() {
	const dispatch = useDispatch();
	const { activity, hayCambios } = useSelector((state: RootState) => state.actividadSlice);
	const [arrayDocumentos, setArrayDocumentos] = useState<Documento[]>(activity.listaEnlaces || []);
	const [descripcion, setDescripcion] = useState('');
	const [nombreArchivo, setNombreArchivo] = useState('');

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
		const documentosFiltrados = arrayDocumentos.filter(
			(item, i) => i !== index || item.idEnlace !== id,
		);
		setArrayDocumentos(documentosFiltrados);
	};

	const isUrlValid = (url: string) => {
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};

	const checkForChanges = () => {
		const cambio = JSON.stringify(activity.listaEnlaces) !== JSON.stringify(arrayDocumentos);
		dispatch(SET_HAY_CAMBIOS({ valor: cambio }));
	};

	useEffect(() => {
		checkForChanges();
	}, [arrayDocumentos]);

	return (
		<div className=' d-flex flex-column h-100 '>
			<div className='m-2'>
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
						className='mx-auto mt-2 '
						type='submit'
						disabled={nombreArchivo === '' || !isUrlValid(nombreArchivo)}
					>
						Agregar
					</Button>
				</Form>
				<div
					className=' custom-scrollbar '
					style={{ height: '15rem', maxHeight: '15rem', overflowY: 'auto' }}
				>
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
									<td style={{ width: '25%' }}>{item.desc}</td>
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
				className='mt-auto mb-3 align-self-center '
				onClick={() => {
					guardarActividad(
						{
							...activity,
							listaEnlaces: arrayDocumentos,
						},
						dispatch,
					);
				}}
			>
				Guardar Actividad
				{hayCambios && <ErrorOutline style={{ marginLeft: '10px', color: 'yellow' }} />}
			</Button>
		</div>
	);
}
