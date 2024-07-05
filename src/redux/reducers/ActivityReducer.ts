import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CargarDatosActividadAction } from '../actions/activityAction';
import { Actividad, FechasPuntuale, Institucione, Meta, Ubicacione } from '@/types/ActivityProps';

interface initialStateProps {
	isLoading: boolean;
	activity: Actividad;
	error: string | null;
	hayCambios: boolean;
}

const initialState: initialStateProps = {
	isLoading: true,
	error: null,
	hayCambios: false,
	activity: {
		idActividad: 0,
		idArea: 0,
		idUsuario: null,
		nro: 0,
		desc: '',
		motivoCancel: '',
		fechaDesde: new Date().toISOString(),
		fechaHasta: new Date().toISOString(),
		listaMetas: [],
		listaProgramasSIPPE: [],
		listaRelaciones: [],
		listaObjetivos: [],
		listaUbicaciones: [],
		listaEnlaces: [],
		listaFechasPuntuales: [],
		listaInstituciones: [],
	},
};

const actividadSlice = createSlice({
	name: 'actividad',
	initialState,
	reducers: {
		SET_HAY_CAMBIOS: (state, action: PayloadAction<{ valor: boolean }>) => {
			state.hayCambios = action.payload.valor;
		},
		CARGAR_MOTIVOCANCEL: (state, action: PayloadAction<{ motivo: string }>) => {
			state.activity.motivoCancel = action.payload.motivo;
			console.log(state.activity.motivoCancel);
			console.log('cargo el motivo');
		},
		CARGAR_DESCRIPCION: (
			state,
			action: PayloadAction<{ descripcion: string; ubicaciones: Ubicacione[] }>,
		) => {
			state.activity.desc = action.payload.descripcion;
			state.activity.listaUbicaciones = action.payload.ubicaciones;
			console.log('cargo la descripcion');
		},
		CARGAR_PERIODO: (
			state,
			action: PayloadAction<{
				fechaDesde: string;
				fechaHasta: string;
				listaFechasPuntuales: FechasPuntuale[];
			}>,
		) => {
			state.activity.fechaDesde = action.payload.fechaDesde;
			state.activity.fechaHasta = action.payload.fechaHasta;
			state.activity.listaFechasPuntuales = action.payload.listaFechasPuntuales;
			console.log('cargo el periodo');
		},
		CARGAR_PIE: (
			state,
			action: PayloadAction<{
				objetivosSeleccionados: number[];
			}>,
		) => {
			state.activity.listaObjetivos = action.payload.objetivosSeleccionados;
		},
		CARGAR_RELACION: (
			state,
			action: PayloadAction<{
				relacionesSeleccionadas: number[];
				sippeSeleccionadas: number[];
			}>,
		) => {
			state.activity.listaRelaciones = action.payload.relacionesSeleccionadas;
			state.activity.listaProgramasSIPPE = action.payload.sippeSeleccionadas;
		},
		CARGAR_META: (
			state,
			action: PayloadAction<{
				metas: Meta[];
			}>,
		) => {
			state.activity.listaMetas = action.payload.metas;
		},
		CARGAR_INSTITUCION: (
			state,
			action: PayloadAction<{
				instituciones: Institucione[];
			}>,
		) => {
			state.activity.listaInstituciones = action.payload.instituciones;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(CargarDatosActividadAction.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(CargarDatosActividadAction.rejected, (state, action) => {
			state.isLoading = false;
			state.error = (action.payload as { error: string }).error;
		});
		builder.addCase(
			CargarDatosActividadAction.fulfilled,
			(state, action: PayloadAction<Actividad>) => {
				return {
					...state,
					activity: {
						...state.activity,
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
					},
					isLoading: false,
				};
			},
		);
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
	SET_HAY_CAMBIOS,
} = actividadSlice.actions;

export default actividadSlice.reducer;
