import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
export default function FormArSecUU() {
  const options = [
    {
      value: "Incorporación Curricular de la Extensión",
      label: "Incorporación Curricular de la Extensión",
    },
    { value: "Integración de funciones", label: "Integración de funciones" },
    { value: "Programas", label: "Programas" },
    {
      value: "Prácticas Académicas Solidarias",
      label: "Prácticas Académicas Solidarias",
    },
    {
      value: "Cultura Expansiva (Innovación y Diversidad Cultural",
      label: "Cultura Expansiva (Innovación y Diversidad Cultural",
    },
    {
      value: "Cultura Expansiva (Formacion cultural)",
      label: "Cultura Expansiva (Formacion cultural)",
    },
    {
      value: "PrograCultura Expansiva (Producciones y Contenidos Culturalesmas",
      label: "Cultura Expansiva (Producciones y Contenidos Culturales",
    },
    {
      value: "Patrimonio Vivo (Museo Histórico )",
      label: "Patrimonio Vivo (Museo Histórico )",
    },
    {
      value: "Patrimonio Vivo (Biblioteca Galvez)",
      label: "Patrimonio Vivo (Biblioteca Galvez)",
    },
    {
      value: "Cursos de Extensión Abiertos a la comunidad (presencial)",
      label: "Cursos de Extensión Abiertos a la comunidad (presencial)",
    },
    {
      value: "Cursos de Formación y Capacitación Laboral",
      label: "Cursos de Formación y Capacitación Laboral",
    },
    { value: "Cátedras Abiertas", label: "Cátedras Abiertas" },
    { value: "Formación para la gestión", label: "Formación para la gestión" },
    { value: "Cursos de extensión/APUL", label: "Cursos de extensión/APUL" },
    { value: "Asignaturas electivas", label: "Asignaturas electivas" },
    {
      value: "Publicaciones Institucionales",
      label: "Publicaciones Institucionales",
    },
    {
      value: "Publicaciones Museo Histórico",
      label: "Publicaciones Museo Histórico",
    },
    { value: "Revista +E", label: "Revista +E" },
    { value: "Publicaciones Culturales", label: "Publicaciones Culturales" },
    { value: "Comunicación Estratégica", label: "Comunicación Estratégica" },
    { value: "Planeamiento y Evaluación", label: "Planeamiento y Evaluación" },
    { value: "Territorio Sociocultural", label: "Territorio Sociocultural" },
    {
      value: "Internacionalización de la extensión",
      label: "Internacionalización de la extensión",
    },
    {
      value: "Alimentos de Interés Social",
      label: "Alimentos de Interés Sociala",
    },
    { value: "Ambiente y Sociedad", label: "Ambiente y Sociedad" },
    { value: "Delito y Sociedad", label: "Delito y Sociedad" },
    { value: "Derechos Humanos", label: "Derechos Humanos" },
    {
      value: "Género, Sociedad y Universidad",
      label: "Género, Sociedad y Universidad",
    },
    {
      value: "Economía Social y Solidaria",
      label: "Economía Social y Solidaria",
    },
    { value: "Equidad en Salud", label: "Equidad en Salud" },
    { value: "Educación y Sociedad.", label: "Educación y Sociedad." },
    { value: "Historia y Memoria", label: "Historia y Memoria" },
    { value: "Proyectos", label: "Proyectos" },
    { value: "Mesa de Entradas", label: "Mesa de Entradas" },
    {
      value: "Unidad Económio Financiera",
      label: "Unidad Económio Financiera",
    },
  ];
  const secretarias =[
    {
      value: "Sec. General",
      label: "Sec. General",
    },
    {
      value: "Sec. de Fortalecimiento Territorial",
      label: "Sec. de Fortalecimiento Territorial",
    },
    {
      value: "Sec. Académica y de Innovación Educativa",
      label: "Sec. Académica y de Innovación Educativa",
    },
    {
      value: "Sec. de Planeamiento Institucional e Internacionalización",
      label: "Sec. de Planeamiento Institucional e Internacionalización",
    },
    {
      value: "Sec. de Vinculación Tecnológica e Innovación",
      label: "Sec. de Vinculación Tecnológica e Innovación",
    },
    {
      value: "Sec. de Bienestar Universitario",
      label: "Sec. de Bienestar Universitario",
    },
    {
      value: "Sec. de Gestión y Administración Presupuestaria",
      label: "Sec. de Gestión y Administración Presupuestaria",
    },
    {
      value: "Secretaría de Ciencia, Arte y Tecnología",
      label: "Secretaría de Ciencia, Arte y Tecnología",
    },
    {
      value: "Sec. Relaciones Institucionales",
      label: "Sec. Relaciones Institucionales",
    },
    {
      value: "Dir. de Obras y Servicios Centralizados",
      label: "Dir. de Obras y Servicios Centralizados",
    },
    {
      value: "Dir. Gral. de Medios Universitarios de Comunicación",
      label: "Dir. Gral. de Medios Universitarios de Comunicación",
    },
    {
      value: "Dir. de Comunicación Institucional",
      label: "Dir. de Comunicación Institucional",
    },
    {
      value: "Dir. Obras y Servicios Centralizados",
      label: "Dir. Obras y Servicios Centralizados",
    },
    {
      value: "Unidad de Certificación de Competencias",
      label: "Unidad de Certificación de Competencias",
    },
    {
      value: "Unidad de Estudios y Proyectos Especiales",
      label: "Unidad de Estudios y Proyectos Especiales",
    },
  ]
  const unidadesAcadmicas =[
    { value: "Centro Universitario Reconquista-Avellaneda", label: "Centro Universitario Reconquista-Avellaneda" },
    { value: "Centro Universitario Gálvez", label: "Centro Universitario Gálvez" },
    { value: "Sede UNL Rafaela-Sunchales", label: "Sede UNL Rafaela-Sunchales" },
    { value: "FICH", label: "FICH" },
    { value: "FBCB", label: "FBCB" },
    { value: "FCM", label: "FCM" },
    { value: "FCE", label: "FCE" },
    { value: "FCJS", label: "FCJS" },
    { value: "FCV", label: "FCV" },
    { value: "FCA", label: "FCA" },
    { value: "FADU", label: "FADU" },
    { value: "FHUC", label: "FHUC" },
    { value: "ESS", label: "ESS" },
    { value: "FIQ", label: "FIQ" },
    { value: "ISM", label: "ISM" },
    { value: "Jardín Maternal La Ronda", label: "Jardín Maternal La Ronda" },
    { value: "Escuela Secundaria UNL", label: "Escuela Secundaria UNL" },
    { value: "EIS", label: "EIS" },
    { value: "EAGG", label: "EAGG" },
    { value: "Escuela de Nivel Inicial y Primario", label: "Escuela de Nivel Inicial y Primario" },

  ]
  return (
    <>
      <div className="FormArSecuu">
        <div className="Areas">
          <h2>Areas Internas de la secretarias</h2>
          <div className="SelectArea">
          <p className="parrafo">Seleccione segun corresponda:</p>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
            />
          </div>
        </div>
        <div className="Secretarias">
          <h2>Secretarias</h2>
          <div className="SelectSec">
          <p className="parrafo">Seleccione segun corresponda:</p>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={secretarias}
            />
          </div>
        </div>
        <div className="UUAA">
          <h2>Unidades Academicas involucradas</h2>
          <div className="SelectUUAA">
          <p className="parrafo">Seleccione segun corresponda:</p>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={unidadesAcadmicas}
            />
          </div>
        </div>
      </div>
      <button className="SaveChange">Guardar Cambios</button>
    </>
  );
}
