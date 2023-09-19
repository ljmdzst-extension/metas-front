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
interface Option {
  value: number;
  label: string;
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
  Option[]
>([]);
const [relacionSeleccionadas2, setRelacionSeleccionadas2] = useState<
Option[]
>([]);
const [relacionSeleccionadas3, setRelacionSeleccionadas3] = useState<
Option[]
>([]);
const [sippeSeleccionadas, setSippeSeleccionadas] = useState<
number[]
>([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/metas/v2/bases/"
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
  const estadoRelacionesSeleccionadas = useSelector(
    (state: RootState) => state.actividadSlice.listaRelaciones
  );
  const estadoSIPPESeleccionadas = useSelector(
    (state: RootState) => state.actividadSlice.listaProgramasSIPPE
  );
  const relacionesInternaExtension: Option[] = relaciones
  .filter((relacion) => relacion.tipoRelacion.nom === "interna_extensión")
  .map((relacion) => ({
    value: relacion.idRelacion,
    label: relacion.nom,
  }));
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
  const sincronizarSelectsRelacion = () => {
    if (estadoRelacionesSeleccionadas) {
      setRelacionSeleccionadas1(relacionesInternaExtension.filter((relacion)=>estadoRelacionesSeleccionadas.some(valor=>valor===relacion.value)))
      console.log(relacionSeleccionadas1);
      setRelacionSeleccionadas2(relacionesInternaUnl.filter((relacion)=>estadoRelacionesSeleccionadas.some(valor=>valor===relacion.value)))
      setRelacionSeleccionadas3(relacionesUA.filter((relacion)=>estadoRelacionesSeleccionadas.some(valor=>valor===relacion.value)))
  }}

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
    dispatch(CARGAR_RELACION({relacionesSeleccionadas : Array.from(new Set([
      ...relacionSeleccionadas1,
      ...relacionSeleccionadas2,
      ...relacionSeleccionadas3,
      ...sippeSeleccionadas
    ]))}));
    onClose();
  };
  const handleRelacionChange1 = (selectedOptions: any) => {
    setRelacionSeleccionadas1(selectedOptions);
  };
    const handleRelacionChange2 = (selectedOptions: any) => {
      setRelacionSeleccionadas2(selectedOptions);
    };
    const handleRelacionChange3 = (selectedOptions: any) => {
      setRelacionSeleccionadas3(selectedOptions);
   };
  const handleSippeChange = (selectedOptions: any) => {
     const selectedValues = selectedOptions.map((option: any) => option.value);
     setSippeSeleccionadas(selectedValues);
   };
  return (
    <>
     {relaciones && (
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
              value={relacionSeleccionadas1}
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
              value={relacionSeleccionadas2}
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
              value={relacionSeleccionadas3}
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
      </div> )}
      
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
