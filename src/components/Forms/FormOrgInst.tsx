import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
type Institucion = {
  id:number,
  nameInst: string;
  ubicationInst: string;
};
interface FormOrgInst {
  onClose: () => void;
}
export default function FormOrgInst({ onClose }:FormOrgInst) {
  const handleCargarOrgInst = () => {
    onClose();
  };
  const [arrayUbication, setArrayUbication] = useState<Institucion[]>([]);
  const [name, setName] = useState("");
  const [idInstitucion, setIdInstitucion] = useState<number>(0);
  const [ubicacion, setUbicacion] = useState("");
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArrayUbication([
      ...arrayUbication,
      {id:idInstitucion, nameInst: name, ubicationInst: ubicacion},
    ]);
    setIdInstitucion(idInstitucion+1)
    setName("");
    setUbicacion("");
  };
  const eliminarInstitucion = (id:number) => {
    console.log(id);
    
    setArrayUbication(arrayUbication.filter((item) => item.id !== id));
  };
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
              onChange={(e) => setName(e.target.value)}
            />
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
              {arrayUbication.map((item, index) => (
                <tr
                  key={index}
                >
                  <td style={{width:"30px"}}>{item.id}</td>
                  <td style={{width:"20%"}}>{item.nameInst}</td>
                  <td>{item.ubicationInst}</td>
                  <td style={{width:"15px"}}>
                    <Button variant="danger">
                      <img
                        src="./assets/img/eliminar.png"
                        className="imgboton"
                        alt="eliminar"
                        onClick={() => eliminarInstitucion(item.id)}
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
        className="SaveChange"
        onClick={() => {
          handleCargarOrgInst();
        }}
      >
        Guardar Cambios
      </Button>
    </>
  );
}
