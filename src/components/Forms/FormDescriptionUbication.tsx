import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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
        id: indexUbiacion.length + 1,
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
        <h2>Descripcion y ubicaciones</h2>
        <div className="ConteinerGrande">
          <div className="ConteinerDescriptionMetas">
            <div className="ConteinerDescripcion">
              <div className="Descripcion">
                <span className="SubtituloMetas">Descripcion:</span>
                <InputGroup className="mb-3 gap-1">
                  <Form.Control
                    placeholder="Inserte descripcion"
                    aria-label="Inserte descripcion"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="secondary" id="button-addon2">
                    <img
                      src="./assets/img/boton-editar.png"
                      className="imgboton"
                      alt="editar"
                    />
                  </Button>
                </InputGroup>
              </div>
            </div>
            {indexUbiacion.map((item, index) => (
              <div className="ConteinerUbicacion">
                <div className="Ubicacion">
                  <span className="SubtituloMetas">Ubicacion:</span>
                  <InputGroup className="mb-3 gap-1">
                    <Form.Control
                      placeholder="Inserte link de ubicacion"
                      aria-label="Inserte link de ubicacion"
                      aria-describedby="basic-addon2"
                    />
                    <Button
                      variant="secondary"
                      id="button-addon2"
                      onClick={() => eliminarMeta(item.id)}
                    >
                      <img
                        src="./assets/img/eliminar.png"
                        className="imgboton"
                        alt="eliminar"
                      />
                    </Button>
                  </InputGroup>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button variant="outline-success" className="SaveChange" onClick={agregarUbicacion}>
          Agregar Ubicacion
        </Button>
      </div>
      <Button variant="success" className="SaveChange">
        Guardar Cambios
      </Button>
    </>
  );
}
