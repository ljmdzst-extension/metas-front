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

export default function PlanificationPanel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [indexForm, setIndexForm] = useState(String);
  return (
    <div className="MenuPlanification">
      <div className="ConteinerTitle">
        <h1>Planificacion Actividad 1</h1>
        {isFormOpen && (
          <button
            className="buttonCloseForm"
            onClick={() => {
              setIsFormOpen(false);
            }}
          >
            X
          </button>
        )}
      </div>
      {!isFormOpen ? (
        <>
          <div className="ConteinerColumn">
            <div className="Column">
              <div className="rowForm">
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("descr");
                    setIsFormOpen(true);
                  }}
                >
                  Descripcion / Ubicacion
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("pie");
                    setIsFormOpen(true);
                  }}
                >
                  PIE
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("area");
                    setIsFormOpen(true);
                  }}
                >
                  Áreas, secretarías y UUAA UNL relacionadas
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("redes");
                    setIsFormOpen(true);
                  }}
                >
                  Redes Sociales
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("periodo");
                    setIsFormOpen(true);
                  }}
                >
                  Periodo
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("objetivo");
                    setIsFormOpen(true);
                  }}
                >
                  Objetivo Estrategico
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("organi");
                    setIsFormOpen(true);
                  }}
                >
                  Organizaciones e instituciones relacionadas
                </button>
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
                <button
                  className="Form"
                  onClick={() => {
                    setIndexForm("metas");
                    setIsFormOpen(true);
                  }}
                >
                  Metas y Resultados
                </button>
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
            <button className="Suspend">Suspender Actividad</button>
            <button className="Save">Guardar Actividad</button>
            <button className="Delete">Eliminar Actividad</button>
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
