import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CargarDatosActividadAction,
  CargarDescripcionAction,
  CargarPeriodoAction,
  CargarPieAction,
  CargarIdAreaYNroAction,
} from "../actions/activityAction";

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
    cargarDescripcion: (
      state,
      action: PayloadAction<{
        descripcion: string | null;
        ubicaciones: any[] | null;
      }>
    ) => {
      state.desc = action.payload.descripcion;
      state.listaUbicaciones = action.payload.ubicaciones;
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
    cargarPie: (
      state,
      action: PayloadAction<{
        objetivosSeleccionados: number[];
      }>
    ) => {
      state.listaObjetivos = action.payload.objetivosSeleccionados;
    },
    cargarIdAreaYNro: (
      state,
      action: PayloadAction<{
        idArea: number;
        nro: number | null;
      }>
    ) => {
      state.idArea = action.payload.idArea;
      state.nro = action.payload.nro;
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
  cargarDescripcion,
  cargarPeriodo,
  cargarPie,
  cargarIdAreaYNro,
} = actividadSlice.actions;

export default actividadSlice.reducer;