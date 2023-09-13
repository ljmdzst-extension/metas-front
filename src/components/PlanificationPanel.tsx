import { useState } from "react";
import FormDescriptionUbication from "./Forms/FormDescriptionUbication";
import FormPIE from "./Forms/FormPIE";
import FormArSecUU from "./Forms/FormArSecUU";
import FormPeriodo from "./Forms/FormPeriodo";
import FormObjetiveEst from "./Forms/FormObjetiveEst";
import FormOrgInst from "./Forms/FormOrgInst";
import FormMetas from "./Forms/FormMetas";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

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
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  ); 

  const guardarActividad = ()=>{
     fetch('http://localhost:4000/metas/v2/actividad',{
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(estadoActualizado)
     })
     .then( resp => resp.json() )
     .then( data => data.ok ? alert('actividad guardada !') : alert(data.error))
     .catch( error => alert(JSON.stringify(error)))
  };
  const eliminarActividad = (name: string) => {};
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  return (
    <div className="MenuPlanification">
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header>
          <Modal.Title>¿Quieres salir del formulario?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Usted tiene un formulario en curso, ¿desea salir del formulario?
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
                Salir del Formulario
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
            style={{width:'60px',height:'60px'}}
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
            <Button variant="success" className="Save"
              onClick={()=>{
                guardarActividad();
              }}
            >
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
                    <FormDescriptionUbication onClose={handleCloseForm}/>
                  </>
                );
              case "pie":
                return (
                  <>
                    <FormPIE onClose={handleCloseForm}/>
                  </>
                );
              case "area":
                return (
                  <>
                    <FormArSecUU  onClose={handleCloseForm}/>
                  </>
                );
              case "periodo":
                return (
                  <>
                    <FormPeriodo onClose={handleCloseForm} />
                  </>
                );
              case "objetivo":
                return (
                  <>
                    <FormObjetiveEst onClose={handleCloseForm} />
                  </>
                );
              case "organi":
                return (
                  <>
                    <FormOrgInst onClose={handleCloseForm}/>
                  </>
                );
              case "metas":
                return (
                  <>
                    <FormMetas onClose={handleCloseForm}/>
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
