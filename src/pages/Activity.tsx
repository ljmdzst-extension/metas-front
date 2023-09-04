import React from "react";
import { useState,useEffect } from "react";
import PlanificationPanel from "../components/PlanificationPanel";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
type IState = {
  myArray: string[];
};
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
  const handleShow2 = () => {
    setShow2(true);
  };
  const [arrayActivity, setArrayActivity] = useState<IState>({
    myArray: [],
  });
  const [isPlanificationOpen, setIsPlanificationOpen] = useState(false);
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArrayActivity({ myArray: [...arrayActivity.myArray, term] });
    handleClose();
    setTerm("");
  };
  //---------------------------------
  const { idPrograma, idArea } = useParams<{ idPrograma?: string; idArea?: string }>();
  const [area, setArea] = useState<Area | null>(null);
  useEffect(() => {
    // Verifica si idPrograma y idArea son definidos antes de usar parseInt
    if (idPrograma && idArea) {
      axios.get(`http://localhost:4000/metas/v2/areas/${idPrograma}`)
        .then((response) => {
          const data: Area[] = response.data.data;
          const selectedArea = data.find((item) => item.idArea === parseInt(idArea, 10));
          setArea(selectedArea || null);
        })
        .catch((error) => {
          console.error('Error al obtener datos:', error);
        });
    }
  }, [idPrograma, idArea]);
  console.log(area);
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de la Actividad:</Form.Label>
              <Form.Control
                type="nombre"
                placeholder="nombre"
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Guardar
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
          <Button variant="outline-success" className="Options" onClick={handleShow}>
            Agregar Actividad
          </Button>
          {arrayActivity.myArray.map((item, index) => (
            <ListGroup.Item
              action
              variant="secondary"
              style={{
                width: "300px",
                height: "50px",
                padding: "10px",
                borderRadius: "10px",
                display:"flex",
                justifyContent:"center",
              }}
              key={index}
              onClick={() => {
                if (isPlanificationOpen === true) {
                  handleShow2();
                  setNameActivityAux(item);
                } else {
                  setIsPlanificationOpen(!isPlanificationOpen);
                  setNameActivity(item);
                }
              }}
            >
              {item}
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
