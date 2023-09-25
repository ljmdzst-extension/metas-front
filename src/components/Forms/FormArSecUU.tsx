import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CARGAR_RELACION } from "../../redux/reducers/ActivityReducer";
const animatedComponents = makeAnimated();
interface FormArSecUUrops {
  onClose: () => void;
}
interface Relacion {
  idRelacion: number;
  nom: string;
  tipoRelacion: {
    idTipoRelacion: number;
    nom: string;
  };
}
interface listaProgramasSIPPE {
  idProgramaSIPPE: number;
  nom: string;
  subProgramaDe: string | null;
}
export default function FormArSecUU({ onClose }: FormArSecUUrops) {
  const dispatch = useDispatch();
  const [relaciones, setRelaciones] = useState<Relacion[]>([]);
  const [sippe, setSippe] = useState<listaProgramasSIPPE[]>([]);
  const [relacionSeleccionadas1, setRelacionSeleccionadas1] = useState<
  number[]
>([]);
const [relacionSeleccionadas2, setRelacionSeleccionadas2] = useState<
number[]
>([]);
const [relacionSeleccionadas3, setRelacionSeleccionadas3] = useState<
number[]
>([]);
const [relacionesSeleccionadas, setRelacionesSeleccionadas] = useState<
number[]
>([]);
const [sippeSeleccionadas, setSippeSeleccionadas] = useState<
number[]
>([]);
  const estadoRelacionesSeleccionadas = useSelector(
    (state: RootState) => state.actividadSlice.listaRelaciones
  );
  const estadoSIPPESeleccionadas = useSelector(
    (state: RootState) => state.actividadSlice.listaProgramasSIPPE
  );
  const sincronizarSelectsRelacion = () => {
    if (estadoRelacionesSeleccionadas) {
      setRelacionSeleccionadas1(estadoRelacionesSeleccionadas);
      setRelacionSeleccionadas2(estadoRelacionesSeleccionadas);
      setRelacionSeleccionadas3(estadoRelacionesSeleccionadas);
    }
  };
  const sincronizarSelectsSIPPE = () => {
    if (estadoSIPPESeleccionadas) {
      setSippeSeleccionadas(estadoSIPPESeleccionadas);
    }
  };
  useEffect(() => {
    sincronizarSelectsRelacion();
  }, [estadoRelacionesSeleccionadas]);
  useEffect(() => {
    sincronizarSelectsSIPPE();
  }, [estadoSIPPESeleccionadas]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://168.197.50.94:4005/metas/v2/bases/"
        );
        if (response.data.ok) {
          const listaRelaciones = response.data.data.listaRelaciones;
          setRelaciones(listaRelaciones);
          const listaSIPPE = response.data.data.listaProgramasSIPPE;
          setSippe(listaSIPPE);
        } else {
          console.error("Error en la respuesta de la API");
        }
      } catch (error) {
        console.error("Error al obtener la lista de relaciones:", error);
      }
    };
    fetchData();
  }, []);
  interface Option {
    value: number;
    label: string;
  }
  const relacionesInternaUnl: Option[] = relaciones
  .filter((relacion) => relacion.tipoRelacion.nom === "interna_unl")
  .map((relacion) => ({
    value: relacion.idRelacion,
    label: relacion.nom,
  }));
  const relacionesUA: Option[] = relaciones
  .filter((relacion) => relacion.tipoRelacion.nom === "U.A.")
  .map((relacion) => ({
    value: relacion.idRelacion,
    label: relacion.nom,
  }));
  const relacionesInternaExtension: Option[] = relaciones
  .filter((relacion) => relacion.tipoRelacion.nom === "interna_extensión")
  .map((relacion) => ({
    value: relacion.idRelacion,
    label: relacion.nom,
  }));
  const listaProgramasSIPPE: Option[] = sippe
  .map((sippe) => ({
    value: sippe.idProgramaSIPPE,
    label: sippe.nom,
  }));
  const handleCargarArSecUU = () => {
    console.log(relacionSeleccionadas3);
    dispatch(CARGAR_RELACION({
      relacionesSeleccionadas : Array.from(new Set([
      ...relacionSeleccionadas1,
      ...relacionSeleccionadas2,
      ...relacionSeleccionadas3
      ])),
      sippeSeleccionadas : Array.from(new Set([...sippeSeleccionadas]))
      
    }));
    onClose();
  };
  const handleRelacionChange1 = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setRelacionSeleccionadas1(selectedValues);
  };
   const handleRelacionChange2 = (selectedOptions: any) => {
     const selectedValues = selectedOptions.map((option: any) => option.value);
     setRelacionSeleccionadas2(selectedValues);
   };
   const handleRelacionChange3 = (selectedOptions: any) => {
     const selectedValues = selectedOptions.map((option: any) => option.value);
     setRelacionSeleccionadas3(selectedValues);
   };
  const handleSippeChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setSippeSeleccionadas(selectedValues);
  };
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
              options={relacionesInternaExtension}
              placeholder={"seleccionar"}
              value={relacionesInternaExtension.filter(option => relacionSeleccionadas1.includes(option.value))}
              onChange={handleRelacionChange1}
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
              options={relacionesInternaUnl}
              placeholder={"seleccionar"}
              value={relacionesInternaUnl.filter(option => relacionSeleccionadas2.includes(option.value))}
              onChange={handleRelacionChange2}
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
              options={relacionesUA}
              placeholder={"seleccionar"}
              value={relacionesUA.filter(option => relacionSeleccionadas3.includes(option.value))}
              onChange={handleRelacionChange3}
            />
          </div>
        </div>
        <div className="UUAA">
          <h2>Programas de extensión</h2>
          <div className="SelectUUAA">
            <p className="parrafo">Seleccione segun corresponda:</p>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={listaProgramasSIPPE}
              placeholder={"seleccionar"}
              value={listaProgramasSIPPE.filter(option => sippeSeleccionadas.includes(option.value))}
              onChange={handleSippeChange}
            />
          </div>
        </div>
      </div>
      <Button
        variant="success"
        className="SaveChange"
        onClick={() => {
          handleCargarArSecUU();
        }}
      >
        Guardar Cambios
      </Button>
    </>
  );
}