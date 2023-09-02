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
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

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

  const eliminarActividad = (name: string) => {};
  const guardarActividad = (indexForm: string) => {
    setIsFormOpen(false);
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
                  SIPPE
                </Button>
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
            <Button
              variant="danger"
              className="Delete"
              onClick={() => {
                eliminarActividad(name);
              }}
            >
              Eliminar Actividad
            </Button>
          </div>
        </>
      ) : (
        <>
          {(() => {
            switch (indexForm) {
              case "descr":
                return (
                  <>
                    <FormDescriptionUbication />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  </>
                );
              case "pie":
                return (
                  <>
                    <FormPIE />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              case "area":
                return (
                  <>
                    <FormArSecUU />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              case "redes":
                return (
                  <>
                    <FormSocialNetwork />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              case "periodo":
                return (
                  <>
                    <FormPeriodo />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              case "objetivo":
                return (
                  <>
                    <FormObjetiveEst />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              case "organi":
                return (
                  <>
                    <FormOrgInst />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              case "metas":
                return (
                  <>
                    <FormMetas />
                    <Button
                      variant="success"
                      className="SaveChange"
                      onClick={() => {
                        guardarActividad(indexForm);
                      }}
                    >
                      Guardar Cambioss
                    </Button>
                  </>
                );
              default:
                return null;
            }
          })()}
        </>
      )}
    </div>
  );
}
