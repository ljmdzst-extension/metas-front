import { createAsyncThunk } from "@reduxjs/toolkit";
export const CARGAR_DESCRIPCION = "CARGAR_DESCRIPCION";

export interface CargarDescripcionAction {
  type: typeof CARGAR_DESCRIPCION;
  payload: {
    descripcion: string | null;
    ubicaciones: any[] | null;
  };
}

export const cargarDescripcion = (
  descripcion: string | null,
  ubicaciones: any[] | null
): CargarDescripcionAction => ({
  type: CARGAR_DESCRIPCION,
  payload: { descripcion, ubicaciones },
});

export const CARGAR_PERIODO = "CARGAR_PERIODO";

export interface CargarPeriodoAction {
  type: typeof CARGAR_PERIODO;
  payload: {
    fechaDesde: string | null;
    fechaHasta: string | null;
    listaFechasPuntuales:  { idFecha: number | null; fecha: string | null }[];
  };
}

export const cargarPeriodo = (
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

export interface CargarPieAction {
  type: typeof CARGAR_PIE;
  payload: {
    objetivosSeleccionados: number[]; // Aquí guarda los IDs de los objetivos seleccionados
  };
}

export const cargarPIE = (objetivosSeleccionados: number[]): CargarPieAction => ({
  type: CARGAR_PIE,
  payload: { objetivosSeleccionados },
});

export const CARGAR_ID_AREA_Y_NRO = "CARGAR_ID_AREA_Y_NRO";

export interface CargarIdAreaYNroAction {
  type: typeof CARGAR_ID_AREA_Y_NRO;
  payload: {
    idArea: number;
    nro: number | null;
  };
}

export const cargarIdAreaYNro = (
  idArea: number,
  nro: number | null
): CargarIdAreaYNroAction => ({
  type: CARGAR_ID_AREA_Y_NRO,
  payload: { idArea, nro },
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
    listaMetas: { idMeta: number | null; descripcion: string | null; resultado: string | null; observaciones: string | null; }[] | null;
    listaProgramasSIPPE: number[] | null;
    listaRelaciones: number[] | null;
    listaObjetivos: number[] | null;
    listaUbicaciones: { idUbicacion: number | null; idActividad: number | null; nom: string; enlace: string | null; }[] | null;
    listaEnlaces: { idEnlace: number | null; desc: string | null; link: string | null; }[] | null;
    listaFechasPuntuales: { idFecha: number | null; fecha: string | null; }[] | null;
    idActividad: number;
  };
}

export const CargarDatosActividadAction = createAsyncThunk(
  "CargarDatosActividadAction",
  async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/metas/v2/actividad/1/${id}`);
      if (!response.ok) {
        throw new Error("Error al cargar los datos de actividad");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log("error");
      ;
    }
  }
);


