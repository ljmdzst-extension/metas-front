import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type YearProps = {
  title: string;
};

export default function CardYear({title}: YearProps) {
  interface Programa {
    idPrograma: number;
    nom: string;
    anio: number;
    listaAreas: Area[];
  }
  interface Area {
    idArea: number;
    nom: string;
    idPrograma: number;
    listaActividades: any[];
  }
  const listPrograms: Programa[] = useSelector((state: RootState) => state.programReducer.ListProgramas)
  const programasTransformados: Programa[] = listPrograms.map((programa) => {
    return {
      idPrograma: programa.idPrograma,
      nom: programa.nom,
      anio: programa.anio,
      listaAreas: programa.listaAreas, 
    };
  });
  console.log(programasTransformados);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indexActivity, setIndexActivity] = useState<Area[]>([]);
  const handleCardClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="ConteinerCardMenu">
        <Card style={{ width: "18rem" }} onClick={handleCardClick}>
          <div className="imgCard">
            <h1><span className="fontYear">{title}</span></h1>
          </div>
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card.Text style={{ textAlign: "center" }}>
              Para obtener un analisis de datos generales, presione en "Ver
              resumen"
            </Card.Text>
           <Button variant="success">Ver Resumen</Button>
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
                    {programasTransformados.map((item, index) => (
                      <ListGroup.Item
                        action
                        variant="secondary"
                        onClick={() => {
                          setIndexActivity(item.listaAreas);
                        }}
                        key={index}
                      >
                        {item.nom}
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
                        {elemento.nom}
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
