import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CargarDatosActividadAction } from '../actions/activityAction';
import { Actividad } from '../../types/ActivityProps';

const initialState: Actividad = {
	idActividad: 0,
	idArea: 0,
	idUsuario: null,
	nro: null,
	desc: null,
	motivoCancel: null,
	fechaDesde: null,
	fechaHasta: null,
	listaMetas: [],
	listaProgramasSIPPE: [],
	listaRelaciones: [],
	listaObjetivos: [],
	listaUbicaciones: [],
	listaEnlaces: [],
	listaFechasPuntuales: [],
	listaInstituciones: [],
};

const actividadSlice = createSlice({
	name: 'actividad',
	initialState,
	reducers: {
		CARGAR_MOTIVOCANCEL: (state, action: PayloadAction<{ motivo: string | null }>) => {
			state.motivoCancel = action.payload.motivo;
			console.log(state.motivoCancel);
			console.log('cargo el motivo');
		},
		CARGAR_DESCRIPCION: (
			state,
			action: PayloadAction<{ descripcion: string | null; ubicaciones: any[] | null }>,
		) => {
			state.desc = action.payload.descripcion;
			state.listaUbicaciones = action.payload.ubicaciones;
			console.log('cargo la descripcion');
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
			}>,
		) => {
			state.fechaDesde = action.payload.fechaDesde;
			state.fechaHasta = action.payload.fechaHasta;
			state.listaFechasPuntuales = action.payload.listaFechasPuntuales;
			console.log('cargo el periodo');
		},
		CARGAR_PIE: (
			state,
			action: PayloadAction<{
				objetivosSeleccionados: number[];
			}>,
		) => {
			state.listaObjetivos = action.payload.objetivosSeleccionados;
		},
		CARGAR_RELACION: (
			state,
			action: PayloadAction<{
				relacionesSeleccionadas: number[];
				sippeSeleccionadas: number[];
			}>,
		) => {
			state.listaRelaciones = action.payload.relacionesSeleccionadas;
			state.listaProgramasSIPPE = action.payload.sippeSeleccionadas;
		},
		CARGAR_META: (
			state,
			action: PayloadAction<{
				metas: {
					idMeta: number | null;
					descripcion: string | null;
					observaciones: string | null;
					resultado: string | null;
					valoracion: number | null;
				}[];
			}>,
		) => {
			state.listaMetas = action.payload.metas;
		},
		CARGAR_INSTITUCION: (
			state,
			action: PayloadAction<{
				instituciones: {
					idInstitucion: number | null;
					nom: string | null;
					ubicacion: string | null;
				}[];
			}>,
		) => {
			state.listaInstituciones = action.payload.instituciones;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(CargarDatosActividadAction.fulfilled, (state, action: PayloadAction<any>) => {
			return {
				...state,
				idActividad: action.payload.idActividad,
				idArea: action.payload.idArea,
				nro: action.payload.nro,
				desc: action.payload.desc,
				motivoCancel: action.payload.motivoCancel,
				fechaDesde: action.payload.fechaDesde,
				fechaHasta: action.payload.fechaHasta,
				listaMetas: action.payload.listaMetas,
				listaProgramasSIPPE: action.payload.listaProgramasSIPPE,
				listaRelaciones: action.payload.listaRelaciones,
				listaObjetivos: action.payload.listaObjetivos,
				listaUbicaciones: action.payload.listaUbicaciones,
				listaEnlaces: action.payload.listaEnlaces,
				listaFechasPuntuales: action.payload.listaFechasPuntuales,
				listaInstituciones: action.payload.listaInstituciones,
			};
		});
	},
});

export const {
	CARGAR_DESCRIPCION,
	CARGAR_PERIODO,
	CARGAR_PIE,
	CARGAR_RELACION,
	CARGAR_INSTITUCION,
	CARGAR_META,
	CARGAR_MOTIVOCANCEL,
} = actividadSlice.actions;

export default actividadSlice.reducer;
