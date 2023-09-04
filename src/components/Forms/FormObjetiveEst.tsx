import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
interface FormObjetiveEstProps {
  onClose: () => void;
}
interface Objetivo {
  idObjetivo: number;
  nom: string;
  tipoObjetivo: {
    idTipoObj: number;
    nom: string;
  };
}
export default function FormObjetiveEst({ onClose }: FormObjetiveEstProps) {
  const handleCargarObjetivoEstrategico = () => {
    onClose();
  };
  const [objetivos, setObjetivos] = useState<Objetivo[]>([])
  useEffect(() => {
    // Función para realizar la solicitud GET
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/metas/v2/bases/");
        if (response.data.ok) {
          // Extraer la lista de objetivos de la respuesta
          const listaObjetivos = response.data.data.listaObjetivos;
          setObjetivos(listaObjetivos);
        } else {
          console.error("Error en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener la lista de objetivos:", error);
      }
    };

    // Llamar a la función para obtener los datos cuando el componente se monte
    fetchData();
  }, []); 
  const objetivosDesde0a4 = objetivos?.slice(0, 4);
  return (
    <>
      <div className="FormObjetivo">
        <h2 className="TitleObjetivo">Objetivo Estrategico</h2>
        <Form className="FormObj">
          <p className="SubtitleObj"><span>Seleccione los objetivos:</span></p>
          <div className="Obj">
          {objetivosDesde0a4.map((objetivo) => (
            <Form.Check
             id={objetivo.idObjetivo.toString()} label={objetivo.nom} key={objetivo.idObjetivo}
            />
            ))}
          </div>
        </Form>
      </div>
      <Button
        variant="success"
        className="SaveChange"
        onClick={() => {
          handleCargarObjetivoEstrategico();
        }}
      >
        Guardar Cambios
      </Button>
    </>
  );
}
