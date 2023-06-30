import React from "react";
import { Form } from "react-bootstrap";

export default function FormObjetiveEst() {
  return (
    <>
      <div className="FormObjetivo">
        <h2 className="TitleObjetivo">Objetivo Estrategico</h2>
        <Form className="FormObj">
          <p className="SubtitleObj">Seleccione los ejes:</p>
          <div className="Obj">
            <Form.Check
              id={`1`}
              label={`Profundizar la integración de funciones, con especial énfasis en el fortalecimiento de las condiciones que permitan incrementar los espacios y carreras con Prácticas de Extensión de Educación Experiencial.`}
            />
            <Form.Check
              id={`2`}
              label={`Promover la intervención territorial, las actividades culturales, la preservación y circulación del patrimonio tangible e intangible de la UNL y la región, profundizando la transversalidad entre las Áreas Centrales y las Unidades Académicas.`}
            />
            <Form.Check
              id={`3`}
              label={`Generar y propiciar actividades de formación y capacitación desde una mirada inclusiva con carácter interdisciplinario favoreciendo la inserción en el mundo del trabajo.`}
            />
            <Form.Check
              id={`4`}
              label={`Consolidar la jerarquización e internacionalización de la extensión, las actividades culturales y artísticas, mediante estrategias de formación, capacitación y comunicación.`}
            />
          </div>
        </Form>
      </div>
      <button className="SaveChange">Guardar Cambios</button>
    </>
  );
}
