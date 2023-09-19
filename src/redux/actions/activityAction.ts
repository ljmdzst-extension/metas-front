import { createAsyncThunk } from "@reduxjs/toolkit";


export const CARGAR_DESCRIPCION = "CARGAR_DESCRIPCION";
export const CargarDescripcionAction = (
  descripcion: string | null,
  ubicaciones: any[] | null
) => ({
  type: CARGAR_DESCRIPCION,
  payload: { descripcion, ubicaciones },
});

export const CARGAR_PERIODO = "CARGAR_PERIODO";
export interface CargarPeriodoAction {
  type: typeof CARGAR_PERIODO;
  payload: {
    fechaDesde: string | null;
    fechaHasta: string | null;
    listaFechasPuntuales: { idFecha: number | null; fecha: string | null }[];
  };
}
export const cargarPeriodoAction = (
  fechaDesde: string | null,
  fechaHasta: string | null,
  listaFechasPuntuales: { idFecha: number | null; fecha: string | null }[]
): CargarPeriodoAction => ({
  type: CARGAR_PERIODO,
  payload: {
    fechaDesde,
    fechaHasta,
    listaFechasPuntuales,
  },
});

export const CARGAR_PIE = "CARGAR_PIE";
export const cargarPIE = (
  objetivosSeleccionados: number[]
) => ({
  type: CARGAR_PIE,
  payload: { objetivosSeleccionados },
});

export const CARGAR_INSTITUCION = 'CARGAR_INSTITUCIONES';

export const cargarInstitucionesAction = (
  instituciones : { idInstitucion : number |null, nom : string | null , ubicacion : string | null}[]
)=>({
  type : CARGAR_INSTITUCION,
  payload : {
    instituciones
  }
})

export const CARGAR_META = 'CARGAR_META';
export const cargarMetaAction = (
  metas : { idMeta : number |null, descripcion : string | null , observaciones : string | null, resultado : string | null, valoracion : number | null}[]
)=>({
  type : CARGAR_META,
  payload : {
    metas
  }
})

export const CARGAR_RELACION = "CARGAR_RELACION";
export const cargarRelacion = (
  relacionesSeleccionadas: number[]
) => ({
  type: CARGAR_RELACION,
  payload: {relacionesSeleccionadas},
});

export const CARGAR_DATOS_ACTIVIDAD = "CARGAR_DATOS_ACTIVIDAD";
export interface CargarDatosActividadAction {
  type: typeof CARGAR_DATOS_ACTIVIDAD;
  payload: {
    idArea: number;
    nro: number | null;
    desc: string | null;
    fechaDesde: string | null;
    fechaHasta: string | null;
    listaMetas:
      | {
          idMeta: number | null;
          descripcion: string | null;
          resultado: string | null;
          observaciones: string | null;
        }[]
      | null;
    listaProgramasSIPPE: number[] | null;
    listaRelaciones: number[] | null;
    listaObjetivos: number[] | null;
    listaUbicaciones:
      | {
          idUbicacion: number | null;
          idActividad: number | null;
          enlace: string | null;
        }[]
      | null;
    listaEnlaces:
      | { idEnlace: number | null; desc: string | null; link: string | null }[]
      | null;
    listaFechasPuntuales:
      | { idFecha: number | null; fecha: string | null }[]
      | null;
    idActividad: number;
  };
}


export const CargarDatosActividadAction = createAsyncThunk(
  "CargarDatosActividadAction",
  async (id: number) => {
    try {
      const response = await fetch(
        `http://168.197.50.94:4005/metas/v2/actividad/${id}`
      );
      if (!response.ok) {
        throw new Error("Error al cargar los datos de actividad");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log("error");
    }
  }
);
