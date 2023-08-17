import React from "react";
import Button from "react-bootstrap/Button";

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
        <form className="formInstituciones">
          <label>
            Nombre:
            <input type="text" name="name" className="inputInstituciones"/>
          </label>
          <label>
            Ubicacion:
            <input type="text" name="ubicacion" className="inputInstituciones" />
          </label>
        </form>
        <button className="SaveChange">Agregar Institucion</button>
        <div className="ListaInstituciones">
          <h3>Las intituciones cargadas son:</h3>
        </div>
      </div>
      <Button variant="success" className="SaveChange">Guardar Cambios</Button>
    </>
  );
}
