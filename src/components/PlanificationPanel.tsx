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
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("descr");
                  setIsFormOpen(true);
                }}
              >
                Descripcion / Ubicacion
              </button>
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("pie");
                  setIsFormOpen(true);
                }}
              >
                PIE
              </button>
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("area");
                  setIsFormOpen(true);
                }}
              >
                Áreas, secretarías y UUAA UNL relacionadas
              </button>
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("redes");
                  setIsFormOpen(true);
                }}
              >
                Redes Sociales
              </button>
            </div>
            <div className="Column">
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("periodo");
                  setIsFormOpen(true);
                }}
              >
                Periodo
              </button>
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("objetivo");
                  setIsFormOpen(true);
                }}
              >
                Objetivo Estrategico
              </button>
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("organi");
                  setIsFormOpen(true);
                }}
              >
                Organizaciones e instituciones relacionadas
              </button>
              <button
                className="Form"
                onClick={() => {
                  setIndexForm("metas");
                  setIsFormOpen(true);
                }}
              >
                Metas y Resultados
              </button>
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
