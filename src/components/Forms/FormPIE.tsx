import React from "react";
import {Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
export default function FormPIE() {
  return (
    <>
      <div className="FormPie">
        <div className="ConteinerEje">
          <h2 className="TitlePie">Ejes Transversales</h2>
          <Form className="FormEje">
            <p className="SubtitlePie"><span>Seleccione los ejes:</span></p>
            <div className="Eje">
            <Form.Check id={`1`} label={`Sostenibilidad Ambiental`} />
            <Form.Check id={`2`} label={`Inclusión y Equidad`} />
            <Form.Check id={`3`} label={`Compromiso Social`} />
            </div>
          </Form>
        </div>
        <div className="ConteinerPlan">
          <h2 className="TitlePie">Plan Institucional</h2>
          <Form className="FormPlan">
            <p className="SubtitlePie"><span>Seleccione los planes:</span></p>
            <div className="ConteinerChecksPlan">
              <div className="Lie">
                <Form.Check id={`4`} label={`L.I.E N°1 - Objetivo 1`} />
                <Form.Check id={`5`} label={`L.I.E N°1 - Objetivo 2`} />
                <Form.Check id={`6`} label={`L.I.E N°1 - Objetivo 3`} />
                <Form.Check id={`7`} label={`L.I.E N°1 - Objetivo 4`} />
              </div>
              <div className="Lie">
                <Form.Check id={`8`} label={`L.I.E N°2 - Objetivo 1`} />
                <Form.Check id={`9`} label={`L.I.E N°2 - Objetivo 2`} />
                <Form.Check id={`10`} label={`L.I.E N°2 - Objetivo 3`} />
                <Form.Check id={`11`} label={`L.I.E N°2 - Objetivo 4`} />
              </div>
              <div className="Lie">
                <Form.Check id={`12`} label={`L.I.E N°3 - Objetivo 1`} />
                <Form.Check id={`13`} label={`L.I.E N°3 - Objetivo 2`} />
                <Form.Check id={`14`} label={`L.I.E N°3 - Objetivo 3`} />
                <Form.Check id={`15`} label={`L.I.E N°3 - Objetivo 4`} />
                <Form.Check id={`16`} label={`L.I.E N°3 - Objetivo 5`} />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
