import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";
import DeleteIcon from '@mui/icons-material/Delete';

type Documento = {
  idEnlace: number | null;
  link: string | null;
  desc: string | null;
};

interface FormOrgInstProps {
  onClose: () => void;
}

export default function FormOrgInst({ onClose }: FormOrgInstProps) {
  const handleCargarOrgInst = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const [arrayDocumentos, setArrayDocumentos] = useState<Documento[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );

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

      setDescripcion("");
      setNombreArchivo("");
    }
  };

  const eliminarDocumento = (id: number) => {
    setArrayDocumentos(arrayDocumentos.filter((item) => item.idEnlace !== id));
  };

  return (
		<>
			<div className=' d-flex flex-column m-4'>
				<h4 className=' text-center'>Carga de Documentación</h4>
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
						/>
					</div>
					<Button variant='success' className='SaveChange mx-auto mt-2 ' type='submit'>
						Agregar
					</Button>
				</Form>
				<div className='ListaInstituciones'>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Descripción</th>
								<th>Enlace</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{arrayDocumentos.map((item, index) => (
								<tr key={index}>
									<td style={{ width: '30px' }}>{index + 1}</td>
									<td style={{ width: '20%' }}>{item.desc}</td>
									<td>
										<a href={item.link ?? ''} target='_blank' rel='noopener noreferrer'>
											{item.link}
										</a>
									</td>
									<td style={{ width: '15px' }}>
                    <DeleteIcon color="error"  onClick={() => eliminarDocumento(item.idEnlace ?? 0)} />
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
					onClose();
				}}
			>
				Guardar Actividad
			</Button>
		</>
	);
}
