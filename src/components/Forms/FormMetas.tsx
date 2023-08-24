import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

export default function FormMetas() {
  interface metas {
    id: number;
    descripcion: string;
    resultadoEsperado: string;
    resultadoLogrado: string;
    observaciones: string;
  }
  const [indexMetas, setIndexMetas] = useState<metas[]>([]);
  const [disable,setDisable] = useState(true)
  const agregarMeta = () => {
    setIndexMetas([
      ...indexMetas,
      {
        id: indexMetas.length + 1,
        descripcion: " Gestión de Becas docentes ",
        resultadoEsperado: "Fortalecimiento de equipos docentes de programas",
        resultadoLogrado: "16 becas docentes (renovaciones/asignaciones)",
        observaciones: "",
      },
    ]);
  };

  const eliminarMeta = (id: number) => {
    setIndexMetas(indexMetas.filter((item) => item.id !== id));
  };

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
                  <span className="SubtituloMetas">Resultado Esperado:</span>
                  <Form.Control
                    type="text"
                    name="name"
                    className="ParrafoResultados"
                    placeholder={item.resultadoEsperado}
                    disabled={disable}
                  />
                </div>
                <div className="ResultadoLogrado">
                  <span className="SubtituloMetas">Resultado Logrado:</span>
                  <Form.Control
                    type="text"
                    name="name"
                    className="ParrafoResultados"
                    placeholder={item.resultadoLogrado}
                    disabled={disable}
                  />
                </div>
                <div className="Observaciones">
                  <span className="SubtituloMetas">
                    Observaciones:{item.id}
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
                  src="./assets/img/boton-editar.png"
                  className="imgboton"
                  alt="editar"
                />
              </Button>
              <Button variant="danger" className="ButtonEdit">
                <img
                  src="./assets/img/eliminar.png"
                  className="imgboton"
                  alt="eliminar"
                  onClick={() => eliminarMeta(item.id)}
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
      <Button variant="success" className="SaveChange">
        Guardar Cambios
      </Button>
    </>
  );
}
