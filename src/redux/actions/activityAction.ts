import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Actividad, FechasPuntuale, Institucione, Meta, Ubicacione } from '@/types/ActivityProps';
import { getActivity } from '@/services';

// Acciones sincrónicas
export const setHayCambios = createAction<{ valor: boolean }>('setHayCambios');
export const cargarDescripcion = createAction<{ descripcion: string; ubicaciones: Ubicacione[] }>(
	'CARGAR_DESCRIPCION',
);
export const cargarMotivoCancel = createAction<{ motivo: string }>('CARGAR_MOTIVOCANCEL');
export const cargarPeriodo = createAction<{
	fechaDesde: string;
	fechaHasta: string;
	listaFechasPuntuales: FechasPuntuale[];
}>('CARGAR_PERIODO');
export const cargarPIE = createAction<{ objetivosSeleccionados: number[] }>('CARGAR_PIE');
export const cargarInstituciones = createAction<{ instituciones: Institucione[] }>(
	'CARGAR_INSTITUCION',
);
export const cargarMeta = createAction<{ metas: Meta[] }>('CARGAR_META');
export const cargarRelacion = createAction<{
	relacionesSeleccionadas: number[];
	sippeSeleccionadas: number[];
}>('CARGAR_RELACION');

// Acción asincrónica
export const cargarDatosActividad = createAsyncThunk<Actividad, number, { rejectValue: string }>(
	'CARGAR_DATOS_ACTIVIDAD',
	async (id, { rejectWithValue } ) => {
		try {
			const data = await getActivity(id);
			return data.data;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unexpected error occurred');
			}
		}
	},
);
