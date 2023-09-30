import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";

type Documento = {
  idEnlace: number | null;
  link: string | null;
  desc: string | null;
};

interface FormOrgInstProps {
  onClose: () => void;
}

export default function FormOrgInst({ onClose }: FormOrgInstProps) {
  const handleCargarOrgInst = () => {
    onClose();
  };
  const dispatch = useDispatch();
  const [arrayDocumentos, setArrayDocumentos] = useState<Documento[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );

  useEffect(() => {
    if (estadoActualizado.listaEnlaces) {
      const enlacesMapeados = estadoActualizado.listaEnlaces.map((enlace, index) => ({
        idEnlace: index + 1,
        link: enlace.link || null,
        desc: enlace.desc || null,
      }));
      setArrayDocumentos(enlacesMapeados);
    }
  }, [estadoActualizado.listaEnlaces]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (descripcion && nombreArchivo) {
      setArrayDocumentos([
        ...arrayDocumentos,
        {
          idEnlace: arrayDocumentos.length + 1,
          link: nombreArchivo,
          desc: descripcion,
        },
      ]);

      setDescripcion("");
      setNombreArchivo("");
    }
  };

  const eliminarDocumento = (id: number) => {
    setArrayDocumentos(arrayDocumentos.filter((item) => item.idEnlace !== id));
  };

  return (
    <>
      <div className="FormOrgInst">
        <h2>Carga de Documentación</h2>
        <p>Cargue sus enlaces:</p>
        <Form className="formInstituciones" onSubmit={submitForm} style={{ width: "500px" }}>
          <label>
            Descripción:
            <Form.Control
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>
          <label style={{ width: "500px" }}>
            Enlace:
            <Form.Control
              type="text"
              name="ubicacion"
              value={nombreArchivo}
              onChange={(e) => setNombreArchivo(e.target.value)}
            />
          </label>
          <Button variant="success" className="SaveChange" type="submit" style={{ width: "200px" }}>
            Agregar Enlace
          </Button>
        </Form>
        <div className="ListaInstituciones">
          <h6>Los enlaces cargados son:</h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Enlace</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrayDocumentos.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "30px" }}>{item.idEnlace}</td>
                  <td style={{ width: "20%" }}>{item.desc}</td>
                  <td>
                    <a
                      href={item.link || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td style={{ width: "15px" }}>
                    <Button
                      variant="danger"
                      onClick={() => eliminarDocumento(item.idEnlace || 0)}
                    >
                      Eliminar
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
            listaEnlaces : arrayDocumentos,
          },dispatch);
          onClose();
        }}
      >
        Guardar Actividad
      </Button>
    </>
  );
}
