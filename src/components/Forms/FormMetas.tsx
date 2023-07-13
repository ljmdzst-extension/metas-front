import { useState } from "react";

export default function FormMetas() {
  interface metas {
    id : number;
    descripcion: string;
    resultadoEsperado: string;
    resultadoLogrado: string;
    observaciones: string;
  }
  const [indexMetas, setIndexMetas] = useState<metas[]>([]);
  const arrayDeMetas: metas[] = [
    {
      id:0,
      descripcion: " Gestión de Becas docentes ",
      resultadoEsperado: "Fortalecimiento de equipos docentes de programas",
      resultadoLogrado: "16 becas docentes (renovaciones/asignaciones)",
      observaciones: "",
    },
  ];

  const agregarMeta = () => {
    setIndexMetas([
      ...indexMetas,
      {
        id:indexMetas.length +1,
        descripcion: " Gestión de Becas docentes ",
        resultadoEsperado: "Fortalecimiento de equipos docentes de programas",
        resultadoLogrado: "16 becas docentes (renovaciones/asignaciones)",
        observaciones: "",
      },
    ]);
  };

  const eliminarMeta = (id :number) => {
    setIndexMetas(indexMetas.filter(item => item.id !== id));
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
                <textarea className="ParrafoDescripcion">
                  {item.descripcion}
                </textarea>
              </div>
              <div className="Resultados">
                <div className="ResultadoEsperado">
                  <span className="SubtituloMetas">Resultado Esperado:</span>
                  <textarea className="ParrafoResultados">
                    {item.resultadoEsperado}
                  </textarea>
                </div>
                <div className="ResultadoLogrado">
                  <span className="SubtituloMetas">Resultado Logrado:</span>
                  <textarea className="ParrafoResultados">
                    {item.resultadoLogrado}
                  </textarea>
                </div>
                <div className="Observaciones">
                  <span className="SubtituloMetas">Observaciones:{item.id}</span>
                  <textarea className="ParrafoObservaciones">
                    {item.observaciones}
                  </textarea>
                </div>
              </div>
            </div>
            <div className="ConteinerButton">
              <button className="ButtonEdit">
                <img
                  src="./assets/img/boton-editar.png"
                  className="imgboton"
                  alt="editar"
                />
              </button>
              <button className="ButtonEdit">
                <img
                  src="./assets/img/eliminar.png"
                  className="imgboton"
                  alt="eliminar"
                  onClick={() => eliminarMeta(item.id)}
                />
              </button>
            </div>
          </div>
        ))}
        <button className="SaveChange" onClick={agregarMeta}>
          Agregar meta
        </button>
      </div>
      <button className="SaveChange">Guardar Cambios</button>
    </>
  );
}
