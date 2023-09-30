import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import axios from "axios";
import { guardarActividad } from "../../redux/actions/putActividad";
interface FormMetas {
  onClose: () => void;
}
interface Valoracion {
  idValoracion : number,
  nom : string
}
export default function FormMetas({ onClose }: FormMetas) {
  interface metas {
    idMeta: number | null;
    descripcion: string | null;
    resultado: string | null;
    observaciones: string | null;
    valoracion : number | null;
  }
  const dispatch = useDispatch();
  const [Valoraciones, setValoraciones] = useState<Valoracion[]>([])
  const [indexMetas, setIndexMetas] = useState<metas[]>([]);
  const defaultNuevaMeta = {
    idMeta : 0,
    descripcion : '',
    resultado: '',
    observaciones : '',
    valoracion : 0
  }
  const [nuevaMeta, setNuevaMeta] = useState<metas>(defaultNuevaMeta)
  const [disable,setDisable] = useState(true)
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://168.197.50.94:4005/metas/v2/bases/"
        );
        if (response.data.ok) {
        
          setValoraciones(response.data.data.listaValoraciones);
        } else {
          console.error("Error en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener la lista de objetivos:", error);
      }
    };
    fetchData();
  }, []);
  const sincronizarMetas = () => {
    if (estadoActualizado.listaMetas) {
      setIndexMetas(estadoActualizado.listaMetas);
    }
  };
  useEffect(() => {
    sincronizarMetas();
  }, [estadoActualizado.listaMetas]);

  const eliminarMeta = (_index: number | null) => {
   if(_index !== null)  setIndexMetas(indexMetas.filter((item,index) => index !== _index));
  };

  const agregarMeta = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(nuevaMeta.descripcion?.length){
      if(nuevaMeta.idMeta && nuevaMeta.idMeta > 0) {
        setIndexMetas(indexMetas.map( meta => meta.idMeta === nuevaMeta.idMeta ? nuevaMeta : meta))
      } else {  
        setIndexMetas([...indexMetas,nuevaMeta])
      }
     setNuevaMeta(defaultNuevaMeta)
    }
  }

  
  return (
    <>
      <div className="FormMetas">
        <h1>Metas y Resultados</h1>
        <h4>Se puede cargar más de una.</h4>
        <div className="ConteinerDescriptionMetas">
              <div className="Descripcion">
                <span className="SubtituloMetas">Meta/resultado esperado :</span>
                <Form.Control
                  type="text"
                  name="descripcion"
                  className="ParrafoDescripcion"
                  placeholder={'Descripción'}
                  value={nuevaMeta.descripcion ||''}
                  onChange={ (e)=>{setNuevaMeta({...nuevaMeta,descripcion : e.target.value})}}

                />
              </div>
              <div className="Resultados">
                <div className="ResultadoEsperado">
                  <span className="SubtituloMetas">Resultado alcanzado :</span>
                  <Form.Control
                    type="text"
                    name="resultado"
                    className="ParrafoResultados"
    
                    placeholder={'Resultado'}
                    value={nuevaMeta.resultado ||''}
                    onChange={ (e)=>{setNuevaMeta({...nuevaMeta,resultado : e.target.value})}}
                  />
                </div>
                <div className="Observaciones">
                  <span className="SubtituloMetas">
                    {
                      `
                      Observaciones (puede incorporarse cualquier detalle o 
                        información adicional que complemente los resultados alcanzados. También pueden ingresarse links a documentos o recursos anexo).
                      `
                    }
                  </span>
                  <Form.Control
                    type="text"
                    name="observaciones"
                    className="ParrafoObservaciones"
                    placeholder={'Observaciones'}
                    value={nuevaMeta.observaciones ||''}
                    onChange={ (e)=>{setNuevaMeta({...nuevaMeta, observaciones : e.target.value})}}
                 
                  />
                </div>
                <div className="Valoraciones">
                  <span className="SubtituloMetas">
                    {`Valoración general de la actividad y los resultados alcanzados :`}
                  </span>
                  <Form.Select
                    name="valoracion"
                    className="ParrafoObservaciones"
                    placeholder={'Valoración'}
                    value={nuevaMeta.valoracion || ''}
                    onChange={ (e)=>{setNuevaMeta({...nuevaMeta, valoracion : Number(e.target.value)})}}
                    
                  >
                    <option key={'nn'} value={''}>Seleccione</option>
                    {
                      Valoraciones &&
                      Valoraciones.map( (valoracion,index) => 
                          
                          <option key={index} value={valoracion.idValoracion} >{valoracion.nom}</option>
                        
                        )
                    }
                  </Form.Select>
                </div>
              </div>
            </div>
        <Button
          variant="outline-success"
          className="SaveChange"
          onClick={agregarMeta}
        >
          Agregar meta
        </Button>
        <div className="ListaInstituciones">
          <h6>Metas cargadas:</h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Resultado</th>
                <th>Observaciones</th>
                <th>Valoración</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {indexMetas.map((item, index) => (
               <tr
               key={index}
             >
               <td style={{width:"30px"}}>{index+1}</td>
               <td style={{width:"20%"}}>{item.descripcion}</td>
               <td>{
                item.resultado
                
                }</td>
               <td>{item.observaciones}</td>
               <td>{item.valoracion}</td>
               <td style={{width:"20px"}}>
               {/* <Button variant="secondary"
                    onClick={() => editarMeta(item)}
                 >
                   <img
                     src="../assets/img/boton-editar.png"
                     className="imgboton"
                     alt="eliminar"
                    
                   />
                 </Button> */}
                 <Button variant="danger"
                    onClick={() => eliminarMeta(index)}
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
            listaMetas : indexMetas,
          },dispatch);
          onClose();
        }}
      >
        Guardar Actividad
      </Button>
    </>
  );
}
