import React from "react";
import { useState } from "react";

export default function FormDescriptionUbication() {
  interface ubicaciones {
    id: number;
    ubicacion: string;
  }
  const [indexUbiacion, setIndexUbicacion] = useState<ubicaciones[]>([]);
  const agregarUbicacion = () => {
    setIndexUbicacion([
      ...indexUbiacion,
      {
        id: indexUbiacion.length +1,
        ubicacion: " Gestión de Becas docentes ",
      },
    ]);
  };
  const eliminarMeta = (id: number) => {
    setIndexUbicacion(indexUbiacion.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="FormDescription">
        <h1>Descripcion y ubicaciones</h1>
        <div className="ConteinerGrande">
          <div className="ConteinerDescriptionMetas">
            <div className="ConteinerDescripcion">
              <div className="Descripcion">
                <span className="SubtituloMetas">Descripcion:</span>
                <textarea className="ParrafoDescripcion"></textarea>
              </div>
              <div className="ConteinerButton">
                <button className="ButtonDeleteUbi">
                  <img
                    src="./assets/img/boton-editar.png"
                    className="imgboton"
                    alt="editar"
                  />
                </button>
              </div>
            </div>
            {indexUbiacion.map((item, index) => (
              <div className="ConteinerUbicacion">
                <div className="Ubicacion">
                  <span className="SubtituloMetas">Ubicacion:</span>
                  <textarea className="ParrafoResultados"></textarea>
                </div>
                <button
                  className="ButtonDeleteUbi"
                  onClick={() => eliminarMeta(item.id)}
                >
                  <img
                    src="./assets/img/eliminar.png"
                    className="imgboton"
                    alt="eliminar"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="SaveChange" onClick={agregarUbicacion}>
          Agregar Ubicacion
        </button>
      </div>
      <button className="SaveChange">Guardar Cambios</button>
    </>
  );
}
