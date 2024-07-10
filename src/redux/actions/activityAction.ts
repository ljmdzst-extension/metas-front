import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Actividad, FechasPuntuale, Institucione, Meta, Ubicacione } from '@/types/ActivityProps';

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
export const cargarDatosActividad = createAsyncThunk(
	'CARGAR_DATOS_ACTIVIDAD',
	async (id: number, { rejectWithValue }) => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_METAS}/actividad/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				return rejectWithValue('Error al cargar los datos de actividad');
			}
			const data = await response.json();
			return data.data as Actividad;
		} catch (error) {
			console.error('Error:', error);
			return rejectWithValue('Error de red o del servidor');
		}
	},
);
