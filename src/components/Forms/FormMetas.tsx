import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import axios from "axios";
import { CARGAR_META } from "../../redux/reducers/ActivityReducer";
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
  const [nuevaMeta, setNuevaMeta] = useState<metas>({
    idMeta : 0,
    descripcion : '',
    resultado: '',
    observaciones : '',
    valoracion : 0
  })
  const [disable,setDisable] = useState(true)
  const estadoMetas = useSelector(
    (state: RootState) => state.actividadSlice.listaMetas
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
    if (estadoMetas) {
      setIndexMetas(estadoMetas);
    }
  };
  useEffect(() => {
    sincronizarMetas();
  }, [estadoMetas]);

  const eliminarMeta = (id: number | null) => {
   if(id !== null)  setIndexMetas(indexMetas.filter((item) => item.idMeta !== id));
  };

  const agregarMeta = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(nuevaMeta.descripcion?.length){
      
     setIndexMetas([...indexMetas,nuevaMeta])
    }
  }

  const handleCargarMetas = () => {
    dispatch(CARGAR_META({metas : indexMetas}));
    onClose();
  };
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

        {indexMetas.map((item, index) => (
          <div className="ConteinerGrande" key={index}>
            <div className="ConteinerDescriptionMetas">
              <div className="Descripcion">
                <span className="SubtituloMetas">Descripción:</span>
                <Form.Control
                  type="text"
                  name="descripcion"
                  className="ParrafoDescripcion"
                  placeholder={item.descripcion ||''}
                  disabled={disable}
                />
              </div>
              <div className="Resultados">
                <div className="ResultadoEsperado">
                  <span className="SubtituloMetas">Resultado:</span>
                  <Form.Control
                    type="text"
                    name="resultado"
                    className="ParrafoResultados"
                    disabled={disable}
                    placeholder={item.resultado ||''}
                  />
                </div>
                <div className="Observaciones">
                  <span className="SubtituloMetas">
                    Observaciones:
                  </span>
                  <Form.Control
                    type="text"
                    name="observaciones"
                    className="ParrafoObservaciones"
                    placeholder={item.observaciones ||''}
                    disabled={disable} 
                  />
                </div>
                <div className="Valoraciones">
                  <span className="SubtituloMetas">
                    Valoración:
                  </span>
                  <Form.Select
                    name="valoracion"
                    className="ParrafoValoraciones"
                    disabled={disable} 
                    placeholder={ `${item.valoracion}` }
                  />
                </div>
              </div>
            </div>
            <div className="ConteinerButton">
              <Button variant="secondary" className="ButtonEdit" onClick={()=>{setDisable(!disable)}}>
                <img
                  src="../assets/img/boton-editar.png"
                  className="imgboton"
                  alt="editar"
                />
              </Button>
              <Button variant="danger" className="ButtonEdit" onClick={()=>{eliminarMeta(item.idMeta)}}>
                <img
                  src="../assets/img/eliminar.png"
                  className="imgboton"
                  alt="eliminar"
                />
              </Button>
            </div>
          </div>
        ))}
        
      </div>
      <Button
        variant="success"
        className="SaveChange"
        onClick={() => {
          handleCargarMetas();
        }}
      >
        Guardar Cambios
      </Button>
    </>
  );
}
