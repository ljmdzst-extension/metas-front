import React from "react";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap"

export default function FormOrgInst() {
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
          Si necesita ayuda para compartir el enlace , consulte en este video.
        </p>
        <Form className="formInstituciones">
          <label>
            Nombre:
            <Form.Control type="text" name="name"/>
          </label>
          <label>
            Ubicacion:
            <Form.Control type="text" name="ubicacion"/>
          </label>
        </Form>
        <Button variant="success" className="SaveChange">Agregar Institucion</Button>
        <div className="ListaInstituciones">
          <h6>Las intituciones cargadas son:</h6>
        </div>
      </div>
      <Button variant="success" className="SaveChange">Guardar Cambios</Button>
    </>
  );
}
