import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";

type Documento = {
  id: number;
  descripcion: string;
  nombreArchivo: string;
  tipo: "enlace" | "documento";
};

interface FormOrgInstProps {
  onClose: () => void;
}

export default function FormOrgInst({ onClose }: FormOrgInstProps) {
  const handleCargarOrgInst = () => {
    onClose();
  };

  const [arrayDocumentos, setArrayDocumentos] = useState<Documento[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [tipo, setTipo] = useState<"enlace" | "documento">("enlace");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificamos el tipo para establecer el nombre adecuado
    const nombre =
      tipo === "documento"
        ? nombreArchivo
        : nombreArchivo;

    setArrayDocumentos([
      ...arrayDocumentos,
      { id: arrayDocumentos.length + 1, descripcion, nombreArchivo: nombre, tipo },
    ]);

    setDescripcion("");
    setNombreArchivo("");
    setTipo("enlace");
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setNombreArchivo(files[0].name);
    }
  };

  const eliminarDocumento = (id: number) => {
    setArrayDocumentos(arrayDocumentos.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="FormOrgInst">
        <h2>Carga de Documentación</h2>
        <p>Cargue sus documentos y enlaces:</p>
        <label>
           Seleccione el tipo:
            <Form.Control
              as="select"
              name="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "enlace" | "documento")}
            >
              <option value="enlace">Enlace</option>
              <option value="documento" hidden>Documento</option>
            </Form.Control>
          </label>
        <Form className="formInstituciones" onSubmit={submitForm} style={{width:"500px"}}>
          <label>
            Descripción:
            <Form.Control
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>
          {tipo === "documento" ? (
            <label style={{width:"500px"}}>
              Seleccione su documento:
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <label style={{width:"500px"}}>
              Enlace:
              <Form.Control
                type="text"
                name="ubicacion"
                value={nombreArchivo}
                onChange={(e) => setNombreArchivo(e.target.value)}
              />
            </label>
          )}
          <Button variant="success" className="SaveChange" type="submit" style={{width:"200px"}}>
            Agregar {tipo === "documento" ? "Documento" : "Enlace"}
          </Button>
        </Form>
        <div className="ListaInstituciones">
          <h6>Los documentos/enlaces cargados son:</h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Documento/Enlace</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {arrayDocumentos.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "30px" }}>{item.id}</td>
                  <td style={{ width: "20%" }}>{item.descripcion}</td>
                  <td>
                    {item.tipo === "documento" ? (
                      <a
                        href={item.nombreArchivo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.nombreArchivo}
                      </a>
                    ) : (
                      <a href={item.nombreArchivo}>{item.nombreArchivo}</a>
                    )}
                  </td>
                  <td style={{ width: "15px" }}>
                    <Button
                      variant="danger"
                      onClick={() => eliminarDocumento(item.id)}
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
