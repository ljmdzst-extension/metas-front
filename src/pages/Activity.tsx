import React from "react";
import { useState } from "react";
import PlanificationPanel from "../components/PlanificationPanel";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
  },
};
export default function Activity() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const arrayActivity = [
    "actividad 1",
    "actividad 2",
    "actividad 3",
    "actividad 4",
    "actividad 5",
    "actividad 6",
    "actividad 7",
    "actividad 8",
    "actividad 9",
    "actividad 10",
  ];
  const [isPlanificationOpen, setIsPlanificationOpen] = useState(false);
  const handleCardClick = () => {
    setIsPlanificationOpen(!isPlanificationOpen);
  };
  return (
    <>
      {isPlanificationOpen && (
        <div className="MenuOptionsAux">
          <div className="Options" onClick={handleShow}>Agregar Actividad</div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de la Actividad:</Form.Label>
              <Form.Control
                type="nombre"
                placeholder="nombre"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
          <div className="Options">
            Carga de Presupuesto
          </div>
          <div className="Options">Ver Resumen y Graficos</div>
        </div>
      )}
      <div className="ConteinerActivity">
        <div className="MenuActivity">
          {arrayActivity.map((item, index) => (
            <div className="Activity" key={index} onClick={handleCardClick}>
              {item}
            </div>
          ))}
        </div>
        {!isPlanificationOpen && (
          <div className="MenuOptions">
            <div className="Options">Carga de Presupuesto</div>
            <div className="Options">Ver Resumen y Graficos</div>
            <div className="Options">Agregar Actividad</div>
          </div>
        )}
        {isPlanificationOpen && <PlanificationPanel />}
      </div>
    </>
  );
}
