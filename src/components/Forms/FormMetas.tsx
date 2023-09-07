import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface FormMetas {
  onClose: () => void;
}
export default function FormMetas({ onClose }: FormMetas) {
  interface metas {
    idMeta: number;
    descripcion: string;
    resultado: string;
    observaciones: string;
  }
  const handleCargarMetas = () => {
    onClose();
  };
  const [indexMetas, setIndexMetas] = useState<metas[]>([]);
  const [disable,setDisable] = useState(true)
  const agregarMeta = () => {}
  const estadoMetas = useSelector(
    (state: RootState) => state.actividadSlice.listaMetas
  );
  const sincronizarMetas = () => {
    if (estadoMetas) {
      setIndexMetas(estadoMetas);
    }
  };
  useEffect(() => {
    sincronizarMetas();
  }, [estadoMetas]);
  // const eliminarMeta = (id: number) => {
  //   setIndexMetas(indexMetas.filter((item) => item. !== id));
  // };
  console.log(estadoMetas);
  
  return (
    <>
      <div className="FormMetas">
        <h1>Metas y Resultados</h1>
        {indexMetas.map((item, index) => (
          <div className="ConteinerGrande" key={index}>
            <div className="ConteinerDescriptionMetas">
              <div className="Descripcion">
                <span className="SubtituloMetas">Descripcion:</span>
                <Form.Control
                  type="text"
                  name="name"
                  className="ParrafoDescripcion"
                  placeholder={item.descripcion}
                  disabled={disable}
                />
              </div>
              <div className="Resultados">
                <div className="ResultadoEsperado">
                  <span className="SubtituloMetas">Resultado:</span>
                  <Form.Control
                    type="text"
                    name="name"
                    className="ParrafoResultados"
                    disabled={disable}
                    placeholder={item.resultado}
                  />
                </div>
                <div className="Observaciones">
                  <span className="SubtituloMetas">
                    Observaciones:
                  </span>
                  <Form.Control
                    type="text"
                    name="name"
                    className="ParrafoObservaciones"
                    placeholder={item.observaciones}
                    disabled={disable} 
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
              <Button variant="danger" className="ButtonEdit">
                <img
                  src="../assets/img/eliminar.png"
                  className="imgboton"
                  alt="eliminar"
                />
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline-success"
          className="SaveChange"
          onClick={agregarMeta}
        >
          Agregar meta
        </Button>
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
