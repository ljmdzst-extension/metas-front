import React from "react";
import FormDescriptionUbication from "./FormDescriptionUbication";

export default function PlanificationPanel() {
  return (
    <div className="MenuPlanification">
      <h1>Planificacion Actividad 1</h1>
      <div className="ConteinerColumn">
        <div className="Column">
          <FormDescriptionUbication />
          <FormDescriptionUbication />
          <FormDescriptionUbication />
          <FormDescriptionUbication />
        </div>
        <div className="Column">
          <FormDescriptionUbication />
          <FormDescriptionUbication />
          <FormDescriptionUbication />
          <FormDescriptionUbication />
        </div>
      </div>
      <div className="ButtonPlanification">
        <button className="Suspend">Suspender Actividad</button>
        <button className="Save">Guardar Actividad</button>
        <button className="Delete">Eliminar Actividad</button>
      </div>
    </div>
  );
}
