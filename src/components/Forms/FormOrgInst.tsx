import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { CARGAR_INSTITUCION } from '../../redux/reducers/ActivityReducer';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";
type Institucion = {
  idInstitucion:number | null,
  nom: string | null;
  ubicacion: string | null;
};
interface FormOrgInst {
  onClose: () => void;
}
export default function FormOrgInst({ onClose }:FormOrgInst) {
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
     setArrayInstitucion(arrayInstitucion.filter((item,i) => i !== index));
    }
  };

  useEffect(() => {
    if(searchInstitucion && arrayInstitucion.every( inst => inst.nom !== searchInstitucion.nom)){
      
      setArrayInstitucion([...arrayInstitucion,searchInstitucion]);
    }
  }, [searchInstitucion])
  

  useEffect(() => {
    if(name) {
      fetch(`http://168.197.50.94:4005/metas/v2/bases/instituciones/${name}/0/10`)
      .then( resp => resp.json())
      .then( data => data.ok && setArraySearchInstitucion(data.data))
      .catch( error => console.log(error))
    }
  
    return () => {
      setArraySearchInstitucion([])
    }
  }, [name])
  
  const handleInstChange = (e :React.ChangeEvent<any>)=>{
    e.preventDefault();
    setSearchInstitucion( arraySearchInstitucion.find( inst => inst.nom === e.currentTarget.value )  )
    
    if(!searchInstitucion) {
      setName(e.currentTarget.value);
    }
    
  }

  return (
    <>
      <div className="FormOrgInst">
        <h2>Instituciones Externas a la UNL</h2>
        <p>
          Ubicación se refiere al punto del mapa en donde se encuentre el lugar
          de la actividad. Utilice la herramienta de Google Maps para insertar
          el enlace de dicha ubicación.
        </p>
        <p>
          Si necesita ayuda para compartir el enlace , consulte{" "}
          <a href="https://www.youtube.com/watch?v=KoN9aRs6a4E" target="_blank">
            en este video.
          </a>
        </p>
        <Form className="formInstituciones" onSubmit={submitForm}>
          <label>
            Nombre:
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleInstChange(e)}
              
              list='listSearchInstituciones'
            />
            <datalist id='listSearchInstituciones' >{
                arraySearchInstitucion &&
                arraySearchInstitucion.map(
                  (inst,i) => <option key={i} value={inst.nom ||'#'} >{inst.nom}</option>
                )
              }</datalist>
          </label>
          <label>
            Ubicacion:
            <Form.Control
              type="text"
              name="ubicacion"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </label>
          <Button variant="success" className="SaveChange" type="submit">
            Agregar Institucion
          </Button>
        </Form>
        <div className="ListaInstituciones">
          <h6>Las intituciones cargadas son:</h6>
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
                <tr
                  key={index}
                >
                  <td style={{width:"30px"}}>{index+1}</td>
                  <td style={{width:"20%"}}>{item.nom}</td>
                  <td>{item.ubicacion}</td>
                  <td style={{width:"15px"}}>
                    <Button variant="danger"
                       onClick={() => eliminarInstitucion(index)}
                    >
                      <img
                        src="../assets/img/eliminar.png"
                        className="imgboton"
                        alt="eliminar"
                       
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Button
        variant="success"
        className="Save"
        onClick={() => {
          guardarActividad({
            ...estadoActualizado,
            listaInstituciones : arrayInstitucion,
          },dispatch);
          onClose();
        }}
      >
        Guardar Actividad
      </Button>
    </>
  );
}
