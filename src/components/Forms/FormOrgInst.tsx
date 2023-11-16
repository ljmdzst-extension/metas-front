import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";
import DeleteIcon from '@mui/icons-material/Delete';
type Institucion = {
  idInstitucion:number | null,
  nom: string | null;
  ubicacion: string | null;
};
interface FormOrgInst {
  onClose: () => void;
}
export default function FormOrgInst({  }:FormOrgInst) {
  const dispatch = useDispatch();
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );
  const [arrayInstitucion, setArrayInstitucion] = useState<Institucion[]>( estadoActualizado.listaInstituciones || [] );
  const [arraySearchInstitucion, setArraySearchInstitucion] = useState<Institucion[]>( [] );
  const [searchInstitucion, setSearchInstitucion] = useState<Institucion |undefined>( undefined );
  
  const [name, setName] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArrayInstitucion([
      ...arrayInstitucion,
      {idInstitucion : 0, nom: name, ubicacion},
    ]);
    setName("");
    setUbicacion("");
  };
  const eliminarInstitucion = (index:number | null) => {
    console.log(index);
    if(index !== null) {
     setArrayInstitucion(arrayInstitucion.filter((item,i) => item && i !== index));
    }
  };

  useEffect(() => {
    if(searchInstitucion && arrayInstitucion.every( inst => inst.nom !== searchInstitucion.nom)){
      
      setArrayInstitucion([...arrayInstitucion,searchInstitucion]);
    }
  }, [searchInstitucion])
  

  useEffect(() => {
		const debounce = setTimeout(() => {
			if (name.length) {
				fetch(`http://168.197.50.94:4005/api/v2/metas/bases/instituciones/${name}/0/10`)
					.then((resp) => resp.json())
					.then((data) => data.ok && setArraySearchInstitucion(data.data))
					.catch((error) => console.log(error));
			} else if (arraySearchInstitucion.length === 0 && name.length === 0) {
				fetch(`http://168.197.50.94:4005/api/v2/metas/bases/instituciones`)
					.then((resp) => resp.json())
					.then((data) => data.ok && setArraySearchInstitucion(data.data))
					.catch((error) => console.log(error));
			}
		}, 500);
		return () => clearTimeout(debounce);
	}, [name , arraySearchInstitucion]);

  const handleInstChange = (e :React.ChangeEvent<any>)=>{
    e.preventDefault();
    setSearchInstitucion( arraySearchInstitucion.find( inst => inst.nom === e.currentTarget.value )  )
    
    if(!searchInstitucion) {
      setName(e.currentTarget.value);
    }
    
  }

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
					/>
				</div>
				<Button variant='success' className='SaveChange mx-auto mt-2 ' type='submit'>
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
							...estadoActualizado,
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
