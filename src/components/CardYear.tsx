import { useState } from "react";
import { Link } from "react-router-dom";

type YearProps = {
  title: string;
  id: number;
};

export default function CardYear({ title, id }: YearProps) {
  interface programas {
    nombre: string;
    subProgramas: string[];
  }
  const ArrayProgramas: programas[] = [
    {
      nombre: "Programa Intervención Sociocultural",
      subProgramas: [
        "Programas",
        "Practicas Academicas Solidarias",
        "Cultura Expansiva (Innovacion y diversidad Cultural)",
        "Cultura Expansiva (Formacion cultural)",
        "Cultura Expansiva (Producciones y Contenido Culturales)",
        "Patrimonio Vivo (Museo Historico)",
        "Patrimonio Vivo (Biblioteca Galvez)",
        "Pryectos",
      ],
    },
    {
      nombre: "Programa de Integración de Funciones",
      subProgramas: [
        "Incorporacion Curricular de la Extension",
        "Integracion de funciones",
        "Catedra Abiertas",
        "Asignatura electivas",
      ],
    },
    {
      nombre: "Programa de Formación y Capacitación",
      subProgramas: [
        "Cursos de Extension presencial",
        "Programa de Formacion y Capacitacion Laboral",
        "Cursos de extension a distancia",
      ],
    },
    {
      nombre: "Programa de publicaciones",
      subProgramas: [
        "Publicaciones Institucionales",
        "Publicaciones Museo Historico",
        "Reviste +E",
        "Publicaciones Culturales",
      ],
    },
    {
      nombre: "Áreas Estratégicas",
      subProgramas: [
        "Comunicacion Estrategica",
        "Planeamiento y Evaluacion",
        "Territorio Sociocultural",
        "Internacionalizacion de la extension",
      ],
    },
    {
      nombre: "Programas de extensión (SIPPE)",
      subProgramas: [
        "Programa Alimentos de Interes Social",
        "Programa Ambiente y Sociedad",
        "Programa Delito y Sociedad",
        "Programa Derechos Humanos",
        "Programa Genero,Sociedad y Universidad",
        "Programa Economia Social y Solidaria",
        "Programa Equidad en Salud",
        "Programa Educacion y Sociedad",
        "Programa Historia y Memoria",
      ],
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenSubprogram, setIsMenuOpenSubprogram] = useState(false);
  const [indexActivity, setIndexActivity] = useState<string[]>([]);
  const handleCardClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuOpenSubprogram(false);
  };

  return (
    <>
      <div className="ConteinerCardMenu">
        <div className="card" onClick={handleCardClick}>
          <img className="imgCard" src="" alt="imagen carta" />
          {title}
          {isMenuOpen && <button> Ver Resumen</button>}
        </div>
        {isMenuOpen && (
          <div className="menu">
            {ArrayProgramas.map((item, index) => (
              <div
                className="programa"
                key={index}
                onClick={() => {
                  //buscar la forma para abreviar la funcion if
                  if (isMenuOpenSubprogram === false){
                    setIsMenuOpenSubprogram(!isMenuOpenSubprogram)
                  }
                  setIndexActivity(item.subProgramas);
                }}
              >
                {item.nombre}
              </div>
            ))}
          </div>
        )}
        {isMenuOpenSubprogram && (
          <div className="ConteinerMenuSubprogram">
            <ul>
              {indexActivity.map((elemento, index) => (
                <li key={index}><Link to='/activity'>{elemento}</Link></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
