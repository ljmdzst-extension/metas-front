import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";
interface FormDescriptionUbicationProps {
  onClose: () => void;
}
const FormDescriptionUbication: React.FC<FormDescriptionUbicationProps> = () => {

  const dispatch = useDispatch();

  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );
  const [editandoDescripcion, setEditandoDescripcion] = useState(false);
  const [descripcion, setDescripcion] = useState<string>(
    estadoActualizado.desc ?? ""
  );

  const [ubicacion, setUbicacion] = useState<string>("");
  const [ubicaciones, setUbicaciones] = useState<{ 
    idUbicacion: number | null; 
    nom : string | null; 
    idActividad: number | null; 
    enlace: string | null; 
  }[]>([]);

  useEffect(() => {
    if (estadoActualizado.listaUbicaciones) {
      setUbicaciones(estadoActualizado.listaUbicaciones);
    }
  }, []);

  const handleDescripcionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescripcion(event.target.value);
  };

  const handleUbicacionInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUbicacion(event.target.value);
  };

  const agregarUbicacion = () => {
    if (ubicacion.trim() !== "") {
      const nuevaUbicacion = {
        idUbicacion: 0,
        idActividad: null,
        nom : '',
        enlace: ubicacion,
      };
  
      setUbicaciones([...ubicaciones, nuevaUbicacion]);
      setUbicacion("");
    }
  };

  const handleClickEditarDescripcion = ( event : React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
    event.preventDefault();
    setEditandoDescripcion(!editandoDescripcion);
  }

  const eliminarUbicacion = (index: number) => {
    const newUbicaciones = [...ubicaciones];
    newUbicaciones.splice(index, 1);
    setUbicaciones(newUbicaciones);
  };
	return (
		<div className='FormDescription d-flex m-0 p-0 '>
			<div className='ConteinerGrande'>
				<div className='ConteinerDescriptionMetas'>
					<div className='ConteinerDescripcion'>
						<div className='Descripcion'>
							<p> Descripción: </p>

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
									style={{ width: '50px', height: '50px' }}
									onClick={handleClickEditarDescripcion}
								>
									<img
										src={`../assets/img/${!editandoDescripcion ? 'boton-editar' : 'guardar'}.png`}
										className='imgboton'
										alt='editar'
									/>
								</Button>
							</InputGroup>
						</div>
					</div>
					<p>
						Utilice la herramienta de Google Maps para insertar el enlace de la ubicación de la
						actividad. Si necesita ayuda, consulte en este video.
					</p>
					<p>
						Si necesita ayuda para compartir el enlace, consulte el siguiente{' '}
						<a
							href='https://www.youtube.com/watch?v=KoN9aRs6a4E'
							target='_blank'
							rel='noopener noreferrer'
							className=' cursor-pointer text-decoration-underline'
						>
							video
						</a>
						.
					</p>
					<div className='ConteinerUbicacion'>
						<div className='Ubicacion'>
							<span className='SubtituloMetas'>Ubicación:</span>
							<InputGroup className=' gap-1'>
								<Form.Control
									placeholder='Inserte link de ubicación'
									aria-label='Inserte link de ubicación'
									aria-describedby='basic-addon2'
									onChange={handleUbicacionInputChange}
									value={ubicacion}
								/>
								<Button variant='outline-success' id='button-addon2' onClick={agregarUbicacion}>
									Agregar Ubicación
								</Button>
							</InputGroup>
						</div>
					</div>
					{ubicaciones.map((ubicacion, index) => (
						<div className='ConteinerUbicacion' key={index}>
							<div className='Ubicacion'>
								<InputGroup className='mb-3 gap-1'>
									<Form.Control
										placeholder={ubicacion.enlace ?? ''}
										aria-label='Inserte link de ubicación'
										aria-describedby='basic-addon2'
										readOnly
									/>
									<Button
										variant='danger'
										id='button-addon2'
										onClick={() => eliminarUbicacion(index)}
									>
										<img src='../assets/img/eliminar.png' className='imgboton' alt='eliminar' />
									</Button>
								</InputGroup>
							</div>
						</div>
					))}
				</div>
			</div>
			<Button
				variant='success'
				className='Save m-2'
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