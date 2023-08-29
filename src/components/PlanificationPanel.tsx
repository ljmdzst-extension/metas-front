import { type } from "os";
import React from "react";
import { useState } from "react";
import FormDescriptionUbication from "./Forms/FormDescriptionUbication";
import FormPIE from "./Forms/FormPIE";
import FormArSecUU from "./Forms/FormArSecUU";
import FormSocialNetwork from "./Forms/FormSocialNetwork";
import FormPeriodo from "./Forms/FormPeriodo";
import FormObjetiveEst from "./Forms/FormObjetiveEst";
import FormOrgInst from "./Forms/FormOrgInst";
import FormMetas from "./Forms/FormMetas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

type Props = {
  name: string;
};
export default function PlanificationPanel({ name }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [indexForm, setIndexForm] = useState(String);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
  };
  const handleShow2 = () => {
    setShow2(true);
  };
  return (
    <div className="MenuPlanification">
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header>
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
                  handleClose2();
                  setIsFormOpen(false);
                }}
              >
                Salir de la actividad
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="ConteinerTitle">
        <h1>{name}</h1>
        {isFormOpen && (
          <Button
            variant="success"
            className="buttonCloseForm"
            onClick={() => {
              handleShow2();
            }}
          >
            X
          </Button>
        )}
      </div>
      {!isFormOpen ? (
        <>
          <div className="ConteinerColumn">
            <div className="Column">
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("descr");
                    setIsFormOpen(true);
                  }}
                >
                  Descripcion / Ubicacion
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Descripcion guardada</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("pie");
                    setIsFormOpen(true);
                  }}
                >
                  PIE
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">PIE guardadas</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("area");
                    setIsFormOpen(true);
                  }}
                >
                  Áreas, secretarías y UUAA UNL relacionadas
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Areas guardadas</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("redes");
                    setIsFormOpen(true);
                  }}
                >
                  Redes Sociales
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Descripcion guardada</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
            </div>
            <div className="Column">
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("periodo");
                    setIsFormOpen(true);
                  }}
                >
                  Periodo
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Periodo guardado</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("objetivo");
                    setIsFormOpen(true);
                  }}
                >
                  Objetivo Estrategico
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Obejtivo guardado</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("organi");
                    setIsFormOpen(true);
                  }}
                >
                  Organizaciones e instituciones relacionadas
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Organizacion guardada</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
              <div className="rowForm">
                <Button
                  variant="outline-success"
                  className="Form"
                  onClick={() => {
                    setIndexForm("metas");
                    setIsFormOpen(true);
                  }}
                >
                  Metas y Resultados
                </Button>
                <div className="containerCheck">
                  <p className="textCheck">Metas guardadas</p>
                  <img
                    src="./assets/img/check.png"
                    alt="check"
                    className="check"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ButtonPlanification">
            <Button variant="warning" className="Suspend">
              Suspender Actividad
            </Button>
            <Button variant="success" className="Save">
              Guardar Actividad
            </Button>
            <Button variant="danger" className="Delete">
              Eliminar Actividad
            </Button>
          </div>
        </>
      ) : (
        <>
          {(() => {
            switch (indexForm) {
              case "descr":
                return <FormDescriptionUbication />;
              case "pie":
                return <FormPIE />;
              case "area":
                return <FormArSecUU />;
              case "redes":
                return <FormSocialNetwork />;
              case "periodo":
                return <FormPeriodo />;
              case "objetivo":
                return <FormObjetiveEst />;
              case "organi":
                return <FormOrgInst />;
              case "metas":
                return <FormMetas />;
              default:
                return null;
            }
          })()}
        </>
      )}
    </div>
  );
}
