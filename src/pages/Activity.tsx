import React from "react";
import { useState } from "react";
import PlanificationPanel from "../components/PlanificationPanel";
export default function Activity() {
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
          <div className="Options">Carga de Presupuesto</div>
          <div className="Options">Ver Resumen y Graficos</div>
          <div className="Options">Agregar Actividad</div>
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
        {isPlanificationOpen && (
          <PlanificationPanel/>
        )}
      </div>
    </>
  );
}
