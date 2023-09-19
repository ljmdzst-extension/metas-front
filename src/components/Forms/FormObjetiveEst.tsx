import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CARGAR_PIE } from "../../redux/reducers/ActivityReducer";
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
  const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://168.197.50.94:4005/metas/v2/bases/"
        );
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
  const [objetivosSeleccionados, setObjetivosSeleccionados] = useState<
    number[]
  >([]);
  const objetivosDesde0a4 = objetivos?.slice(0, 4);
  const estadoObjetivosSeleccionados = useSelector(
    (state: RootState) => state.actividadSlice.listaObjetivos
  );
  const sincronizarCheckboxes = () => {
    if (estadoObjetivosSeleccionados) {
      setObjetivosSeleccionados(estadoObjetivosSeleccionados);
    }
  };
  useEffect(() => {
    sincronizarCheckboxes();
  }, [estadoObjetivosSeleccionados]);
  const handleSeleccionarObjetivo = (idObjetivo: number) => {
    const objetivoIndex = objetivosSeleccionados.indexOf(idObjetivo);
    if (objetivoIndex === -1) {
      setObjetivosSeleccionados([...objetivosSeleccionados, idObjetivo]);
    } else {
      const newSeleccionados = objetivosSeleccionados.filter((id) => id !== idObjetivo);
      setObjetivosSeleccionados(newSeleccionados);
    }
  };
  const handleCargarObjetivoEstrategico = () => {
    dispatch(CARGAR_PIE({objetivosSeleccionados}));
    onClose();
  };
  return (
    <>
      <div className="FormObjetivo">
        <h2 className="TitleObjetivo">Objetivo Estrategico</h2>
        <Form className="FormObj">
          <p className="SubtitleObj">
            <span>Seleccione los objetivos:</span>
          </p>
          <div className="Obj">
            {objetivosDesde0a4.map((objetivo) => (
              <Form.Check
                id={objetivo.idObjetivo.toString()}
                label={objetivo.nom}
                key={objetivo.idObjetivo}
                checked={objetivosSeleccionados.includes(objetivo.idObjetivo)}
                onChange={() => handleSeleccionarObjetivo(objetivo.idObjetivo)}
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
