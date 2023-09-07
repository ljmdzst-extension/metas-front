import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { cargarPIE } from "../../redux/actions/activityAction";
import { RootState } from "../../redux/store";

interface FormPIEProps {
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

export default function FormPIE({ onClose }: FormPIEProps) {
  const dispatch = useDispatch();
  const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
  const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/metas/v2/bases/");
        if (response.data.ok) {
          const listaObjetivos = response.data.data.listaObjetivos;
          setObjetivos(listaObjetivos);
        } else {
          console.error("Error en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener la lista de objetivos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSeleccionarObjetivo = (idObjetivo: number) => {
    const objetivoIndex = objetivosSeleccionados.indexOf(idObjetivo);
    if (objetivoIndex === -1) {
      setObjetivosSeleccionados([...objetivosSeleccionados, idObjetivo]);
    } else {
      const newSeleccionados = objetivosSeleccionados.filter((id) => id !== idObjetivo);
      setObjetivosSeleccionados(newSeleccionados);
    }
  };

  const objetivosDesde17a19 = objetivos?.slice(17, 20);
  const objetivosDesde4a7 = objetivos?.slice(4, 7);
  const objetivosDesde8a11 = objetivos?.slice(8, 11);
  const objetivosDesde12a16 = objetivos?.slice(12, 16);

  const estadoObjetivosSeleccionados = useSelector(
    (state: RootState) => state.actividadSlice.listaObjetivos
  );

  // Función para sincronizar objetivosSeleccionados con Redux
  const sincronizarCheckboxes = () => {
    if (estadoObjetivosSeleccionados) {
      setObjetivosSeleccionados(estadoObjetivosSeleccionados);
    }
  };

  useEffect(() => {
    sincronizarCheckboxes();
  }, [estadoObjetivosSeleccionados]);

  const handleCargarPIE = () => {
    dispatch(cargarPIE(objetivosSeleccionados));
    onClose();
  };

  return (
    <>
      <div className="FormPie">
        <div className="ConteinerEje">
          <h2 className="TitlePie">Ejes Transversales</h2>
          <Form className="FormEje">
            <p className="SubtitlePie">
              <span>Seleccione los ejes:</span>
            </p>
            <div className="Eje">
              {objetivosDesde17a19.map((objetivo) => (
                <Form.Check
                  id={objetivo.idObjetivo.toString()}
                  label={objetivo.nom}
                  key={objetivo.idObjetivo}
                  onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
                  checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
                />
              ))}
            </div>
          </Form>
        </div>
        <div className="ConteinerPlan">
          <h2 className="TitlePie">Plan Institucional</h2>
          <Form className="FormPlan">
            <p className="SubtitlePie">
              <span>Seleccione los planes:</span>
            </p>
            <div className="ConteinerChecksPlan">
              <div className="Lie">
                {objetivosDesde4a7.map((objetivo) => (
                  <Form.Check
                    id={objetivo.idObjetivo.toString()}
                    label={objetivo.nom}
                    key={objetivo.idObjetivo}
                    onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
                    checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
                  />
                ))}
              </div>
              <div className="Lie">
                {objetivosDesde8a11.map((objetivo) => (
                  <Form.Check
                    id={objetivo.idObjetivo.toString()}
                    label={objetivo.nom}
                    key={objetivo.idObjetivo}
                    onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
                    checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
                  />
                ))}
              </div>
              <div className="Lie">
                {objetivosDesde12a16.map((objetivo) => (
                  <Form.Check
                    id={objetivo.idObjetivo.toString()}
                    label={objetivo.nom}
                    key={objetivo.idObjetivo}
                    onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
                    checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
                  />
                ))}
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Button
        variant="success"
        className="SaveChange"
        onClick={() => {
          handleCargarPIE();
        }}
      >
        Guardar Cambios
      </Button>
    </>
  );
}

