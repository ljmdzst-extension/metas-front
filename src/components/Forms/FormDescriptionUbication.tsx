import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";
interface FormDescriptionUbicationProps {
  onClose: () => void;
}
const FormDescriptionUbication: React.FC<FormDescriptionUbicationProps> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );
  const [descripcion, setDescripcion] = useState<string>(
    estadoActualizado.desc ?? ""
  );
  const [ubicacion, setUbicacion] = useState<string>("");
  const [ubicaciones, setUbicaciones] = useState<{ idUbicacion: number | null; nom : string |null; idActividad: number | null; enlace: string | null; }[]>([]);

  useEffect(() => {
    if (estadoActualizado.listaUbicaciones) {
      setUbicaciones(estadoActualizado.listaUbicaciones);
    }
  }, []);
  const handleDescripcionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescripcion(event.target.value);
  };
  const handleUbicacionInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUbicacion(event.target.value);
  };

  const agregarUbicacion = () => {
    if (ubicacion.trim() !== "") {
      const nuevaUbicacion = {
        idUbicacion: 0,
        idActividad: null,
        nom : '',
        enlace: ubicacion,
      };
  
      setUbicaciones([...ubicaciones, nuevaUbicacion]);
      setUbicacion("");
    }
  };
  const eliminarUbicacion = (index: number) => {
    const newUbicaciones = [...ubicaciones];
    newUbicaciones.splice(index, 1);
    setUbicaciones(newUbicaciones);
  };
  return (
    <div className="FormDescription">
      <h2>Descripción y ubicaciones</h2>
      <div className="ConteinerGrande">
        <div className="ConteinerDescriptionMetas">
          <div className="ConteinerDescripcion">
            <div className="Descripcion">
              <p>
                Para modificar la descripción de la actividad, haga clic en
                Editar Descripción.
              </p>
              <span className="SubtituloMetas">Descripcion:</span>
              <InputGroup className="mb-3 gap-1">
                <Form.Control
                  as="textarea"
                  rows={4}
                  style={{ resize: "none" }}
                  placeholder={descripcion}
                  aria-label="Inserte descripción"
                  aria-describedby="basic-addon2"
                  onChange={handleDescripcionChange}
                />
                <Button
                  variant="secondary"
                  id="button-addon2"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="../assets/img/boton-editar.png"
                    className="imgboton"
                    alt="editar"
                  />
                </Button>
              </InputGroup>
            </div>
          </div>
          <p>
            Ubicación se refiere al punto del mapa en donde se encuentre el
            lugar de la actividad. Utilice la herramienta de Google Maps para
            insertar el enlace de dicha ubicación.
          </p>
          <p>
            Si necesita ayuda para compartir el enlace, consulte{" "}
            <a
              href="https://www.youtube.com/watch?v=KoN9aRs6a4E"
              target="_blank"
              rel="noopener noreferrer"
            >
              en este video.
            </a>
          </p>
          <div className="ConteinerUbicacion">
            <div className="Ubicacion">
              <span className="SubtituloMetas">Ubicación:</span>
              <InputGroup className="mb-3 gap-1">
                <Form.Control
                  placeholder="Inserte link de ubicación"
                  aria-label="Inserte link de ubicación"
                  aria-describedby="basic-addon2"
                  onChange={handleUbicacionInputChange}
                  value={ubicacion}
                />
                <Button
                  variant="outline-success"
                  id="button-addon2"
                  onClick={agregarUbicacion}
                >
                  Agregar Ubicación
                </Button>
              </InputGroup>
            </div>
          </div>
          {ubicaciones.map((ubicacion, index) => (
            <div className="ConteinerUbicacion" key={index}>
              <div className="Ubicacion">
                <InputGroup className="mb-3 gap-1">
                  <Form.Control
                    placeholder={ubicacion.enlace ||''}
                    aria-label="Inserte link de ubicación"
                    aria-describedby="basic-addon2"
                    readOnly
                  />
                  <Button
                    variant="danger"
                    id="button-addon2"
                    onClick={() => eliminarUbicacion(index)}
                  >
                    <img
                      src="../assets/img/eliminar.png"
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
      <Button
              variant="success"
              className="Save"
              onClick={() => {
                guardarActividad({...estadoActualizado,desc:descripcion, listaUbicaciones: ubicaciones });
                onClose();
              }}
            >
              Guardar Actividad
            </Button>
    </div>
  );
};

export default FormDescriptionUbication;