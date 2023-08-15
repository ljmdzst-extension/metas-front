import React from "react";
import { useState } from "react";
import PlanificationPanel from "../components/PlanificationPanel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
type IState = {
  myArray: string[];
};

export default function Activity() {
  const [show, setShow] = useState(false);
  const [term, setTerm] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [arrayActivity, setArrayActivity] = useState<IState>({
    myArray: ["actividad1", "actividad2"]
   });
  const [isPlanificationOpen, setIsPlanificationOpen] = useState(false);
  const handleCardClick = () => {
    setIsPlanificationOpen(!isPlanificationOpen);
  };
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setArrayActivity({ myArray: [...arrayActivity.myArray, term] })
    handleClose()
    setTerm("")
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
      {isPlanificationOpen && (
        <div className="MenuOptionsAux">
          <div className="Options" onClick={handleShow}>
            Agregar Actividad
          </div>
          <div className="Options">Carga de Presupuesto</div>
          <div className="Options">Ver Resumen y Graficos</div>
        </div>
      )}
      <div className="ConteinerActivity">
        <div className="MenuActivity">
          {arrayActivity.myArray.map((item, index) => (
            <div className="Activity" key={index} onClick={handleCardClick}>
              {item}
            </div>
          ))}
        </div>
        {!isPlanificationOpen && (
          <div className="MenuOptions">
            <div className="Options">Carga de Presupuesto</div>
            <div className="Options">Ver Resumen y Graficos</div>
            <div className="Options" onClick={handleShow}>
              Agregar Actividad
            </div>
          </div>
        )}
        {isPlanificationOpen && <PlanificationPanel />}
      </div>
    </>
  );
}
