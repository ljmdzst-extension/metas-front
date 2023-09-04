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

