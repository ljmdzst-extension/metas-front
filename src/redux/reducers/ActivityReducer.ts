import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CargarDatosActividadAction } from '../actions/activityAction';

interface ActividadState {
  idActividad: number;
  idArea: number;
  nro: number | null;
  desc: string | null;
  fechaDesde: string | null;
  fechaHasta: string | null;
  listaMetas:
    | {
        idMeta: number;
        descripcion: string;
        resultado: string;
        observaciones: string;
      }[]
    | null;
  listaProgramasSIPPE: number[] | null;
  listaRelaciones: number[] | null;
  listaObjetivos: number[] | null;
  listaUbicaciones:
    | {
        idUbicacion: number | null;
        idActividad: number | null;
        nom: string;
        enlace: string | null;
      }[]
    | null;
  listaEnlaces:
    | {
        idEnlace: number | null;
        desc: string | null;
        link: string | null;
      }[]
    | null;
  listaFechasPuntuales:
    | {
        idFecha: number | null;
        fecha: string | null;
      }[]
    | null;
}

const initialState: ActividadState = {
  idActividad: 0,
  idArea: 0,
  nro: null,
  desc: null,
  fechaDesde: null,
  fechaHasta: null,
  listaMetas: [],
  listaProgramasSIPPE: [],
  listaRelaciones: [],
  listaObjetivos: [],
  listaUbicaciones: [],
  listaEnlaces: [],
  listaFechasPuntuales: [],
};

const actividadSlice = createSlice({
  name: "actividad",
  initialState,
  reducers: {
    CARGAR_DESCRIPCION: (state, action: PayloadAction<{ descripcion: string | null; ubicaciones: any[] | null }>) => {
      state.desc = action.payload.descripcion;
      state.listaUbicaciones = action.payload.ubicaciones;
      console.log("cargo la descripcion");
    },
    cargarPeriodo: (
      state,
      action: PayloadAction<{
        fechaDesde: string | null;
        fechaHasta: string | null;
        listaFechasPuntuales: {
          idFecha: number | null;
          fecha: string | null;
        }[];
      }>
    ) => {
      state.fechaDesde = action.payload.fechaDesde;
      state.fechaHasta = action.payload.fechaHasta;
      state.listaFechasPuntuales = action.payload.listaFechasPuntuales;
    },
    CARGAR_PIE: (
      state,
      action: PayloadAction<{
        objetivosSeleccionados: number[];
      }>
    ) => {
      state.listaObjetivos = action.payload.objetivosSeleccionados;
    },
    CARGAR_RELACION: (
      state,
      action: PayloadAction<{
        relacionesSeleccionadas: number[];
      }>
    ) => {
      state.listaRelaciones = action.payload.relacionesSeleccionadas;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      CargarDatosActividadAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        return {
          ...state,
          idActividad: action.payload.idActividad,
          idArea: action.payload.idArea,
          nro: action.payload.nro,
          desc: action.payload.desc,
          fechaDesde: action.payload.fechaDesde,
          fechaHasta: action.payload.fechaHasta,
          listaMetas: action.payload.listaMetas,
          listaProgramasSIPPE: action.payload.listaProgramasSIPPE,
          listaRelaciones: action.payload.listaRelaciones,
          listaObjetivos: action.payload.listaObjetivos,
          listaUbicaciones: action.payload.listaUbicaciones,
          listaEnlaces: action.payload.listaEnlaces,
          listaFechasPuntuales: action.payload.listaFechasPuntuales,
        };
      }
    );
  },
});

export const {
  CARGAR_DESCRIPCION,
  cargarPeriodo,
  CARGAR_PIE,
  CARGAR_RELACION
} = actividadSlice.actions;

export default actividadSlice.reducer;