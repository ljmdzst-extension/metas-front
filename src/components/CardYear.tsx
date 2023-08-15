import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
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
  const [indexActivity, setIndexActivity] = useState<string[]>([]);
  const handleCardClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="ConteinerCardMenu">
        <Card style={{ width: "18rem" }} onClick={handleCardClick}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card.Title>{title}</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>
              Para obtener un analisis de datos generales, presione en "Ver
              resumen"
            </Card.Text>
            {isMenuOpen && <Button variant="success">Ver Resumen</Button>}
          </Card.Body>
        </Card>
        {isMenuOpen && (
          <div className="menu">
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              <Row>
                <Col sm={4}>
                  <ListGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "400px",
                      gap: "10px",
                    }}
                  >
                    {ArrayProgramas.map((item, index) => (
                      <ListGroup.Item
                        action
                        variant="secondary"
                        onClick={() => {
                          setIndexActivity(item.subProgramas);
                        }}
                        key={index}
                      >
                        {item.nombre}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Tab.Container>
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
              <Row>
                <Col sm={4}>
                  <ListGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "400px",
                      gap: "10px",
                    }}
                  >
                    {indexActivity.map((elemento, index) => (
                      <ListGroup.Item
                        key={index}
                        action
                        variant="light"
                      >
                        <Link
                          rel="stylesheet"
                          to="/activity"
                          style={{
                            textDecoration: "none",
                            color:"black"
                          }}
                        >
                        {elemento}
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        )}
      </div>
    </>
  );
}
