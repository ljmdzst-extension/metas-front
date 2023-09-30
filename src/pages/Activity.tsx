import React, { useState, useEffect } from "react";
import PlanificationPanel from "../components/PlanificationPanel";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { CargarDatosActividadAction } from "../redux/actions/activityAction";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

interface Activity {
  idActividad: number;
  desc: string;
}

interface Area {
  idArea: number;
  nom: string;
  listaActividades: any[]; // Reemplaza esto con el tipo correcto si es necesario
}

export default function Activity() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [term, setTerm] = useState("");
  const [nameActivity, setNameActivity] = useState("");
  const [nameActivityAux, setNameActivityAux] = useState("");
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const [arrayActivity, setArrayActivity] = useState<Activity[]>([]);
  const [isPlanificationOpen, setIsPlanificationOpen] = useState(false);
  const { idArea } = useParams<{ idArea?: string }>();
  const [area, setArea] = useState<Area | null>(null);

  interface Data {
    idActividad: 0;
    idArea: number;
    nro: number;
    desc: string;
    fechaDesde: string | null;
    fechaHasta: string | null;
  }

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    mostrarActividades();
  }, []);

  let postActivity = async function (data: Data) {
    axios
      .post("http://168.197.50.94:4005/metas/v2/actividad", data)
      .then(() => {
        mostrarActividades();
      })
      .catch((Error) => console.log(Error));
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postActivity({
      idActividad: 0,
      idArea: parseInt(idArea ?? "0", 10),
      nro: arrayActivity.length + 1,
      desc: term,
      fechaDesde: null,
      fechaHasta: null,
    });
    handleClose();
    setTerm("");
  };

  let mostrarActividades = async function () {
    axios
      .get(`http://168.197.50.94:4005/metas/v2/areas/${idArea}/actividades`)
      .then((response) => {
        const actividades = response.data;
        setArrayActivity(actividades.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud GET:", error);
      });
  };

  const handleButtonClick = (id:number) => {
    dispatch(CargarDatosActividadAction(id))
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrese la descripcion de la actividad</Form.Label>
              <Form.Control
                type="nombre"
                placeholder="Descripcion"
                autoFocus
                as="textarea"
                rows={2}
                style={{ resize: "none" }}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Crear
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2} name={nameActivityAux}>
        <Modal.Header closeButton>
          <Modal.Title>¿Quieres salir de la Actividad?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Usted tiene una actividad en curso, ¿desea salir de la
                actividad?
              </Form.Label>
              <Form.Label>Los cambios no guardados se perderan.</Form.Label>
            </Form.Group>
            <Form.Group
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="danger" onClick={handleClose2}>
                Cancelar
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  setIsPlanificationOpen(!isPlanificationOpen);
                  handleClose2();
                }}
              >
                Salir de la actividad
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <h1>{area?.nom}</h1>
      {isPlanificationOpen && (
        <div className="MenuOptionsAux">
          <div className="Options">Carga de Presupuesto</div>
          <div className="Options">Ver Resumen y Graficos</div>
        </div>
      )}
      <div className="ConteinerActivity">
        <div className="MenuActivity">
          <Button
            variant="outline-success"
            className="Options"
            onClick={handleShow}
          >
            Agregar Actividad
          </Button>
          {arrayActivity.map((item, index) => (
            <ListGroup.Item
              action
              variant="secondary"
              title={item.desc}
              style={{
                width: "300px",
                height: "50px",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center"
              }}
              key={index}
              onClick={() => {
                if (isPlanificationOpen === true) {
                  handleShow2();
                  setNameActivityAux(
                    `${item.desc}`
                  );
                } else {
                  setIsPlanificationOpen(!isPlanificationOpen);
                  setNameActivity(
                    `${item.desc}`
                  );
                  handleButtonClick(item.idActividad)
                }
              }}
            >
              <span style={{textOverflow : "ellipsis" , overflow : "hidden", fontWeight : "normal", whiteSpace : "nowrap"}} >{item.desc}</span>
            </ListGroup.Item>
          ))}
        </div>
        {!isPlanificationOpen && (
          <div className="MenuOptions">
            <div className="Options">Carga de Presupuesto</div>
            <div className="Options">Ver Resumen y Graficos</div>
          </div>
        )}
        {isPlanificationOpen && <PlanificationPanel name={nameActivity} />}
      </div>
    </>
  );
}


  
