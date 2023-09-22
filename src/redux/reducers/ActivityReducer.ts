import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CargarDatosActividadAction } from '../actions/activityAction';

interface ActividadState {
  idActividad: number;
  idArea: number;
  nro: number | null;
  desc: string | null;
  mot_cancel : string | null;
  fechaDesde: string | null;
  fechaHasta: string | null;
  listaMetas:
    | {
        idMeta: number |null;
        descripcion: string |null;
        resultado: string |null;
        observaciones: string |null;
        valoracion : number |null;
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
  listaInstituciones : 
   | {
      idInstitucion : number | null,
      nom : string | null,
      ubicacion : string | null
   }[]
   | null;
}

const initialState: ActividadState = {
  idActividad: 0,
  idArea: 0,
  nro: null,
  desc: null,
  mot_cancel : null,
  fechaDesde: null,
  fechaHasta: null,
  listaMetas: [],
  listaProgramasSIPPE: [],
  listaRelaciones: [],
  listaObjetivos: [],
  listaUbicaciones: [],
  listaEnlaces: [],
  listaFechasPuntuales: [],
  listaInstituciones : []
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
    CARGAR_PERIODO: (
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
      console.log('cargo el periodo')
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
        sippeSeleccionadas : number[];
      }>
    ) => {
      state.listaRelaciones = action.payload.relacionesSeleccionadas;
      state.listaProgramasSIPPE = action.payload.sippeSeleccionadas;
    },
    CARGAR_META: (
      state,
      action : PayloadAction<{
        metas : { idMeta : number |null, descripcion : string | null , observaciones : string | null, resultado : string | null, valoracion : number | null}[]
      }>
    )=>{
      state.listaMetas = action.payload.metas
    },
    CARGAR_INSTITUCION: (
      state,
      action : PayloadAction<{
        instituciones : { idInstitucion : number |null, nom : string | null , ubicacion : string | null}[]
      }>
    )=>{
      state.listaInstituciones = action.payload.instituciones
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
  CARGAR_PERIODO,
  CARGAR_PIE,
  CARGAR_RELACION,
  CARGAR_INSTITUCION,
  CARGAR_META
} = actividadSlice.actions;

export default actividadSlice.reducer;