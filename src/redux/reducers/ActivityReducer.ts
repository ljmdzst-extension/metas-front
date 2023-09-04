import { CARGAR_PERIODO, CARGAR_DESCRIPCION, CARGAR_PIE ,CargarPieAction,CargarDescripcionAction, CargarPeriodoAction } from '../actions/activityAction';

interface ActividadState {
  idActividad: number | null;
  idArea: number | null;
  nro: number | null;
  desc: string | null;
  fechaDesde: string | null;
  fechaHasta: string | null;
  listaMetas: {
    idMeta: number | null;
    descripcion: string | null;
    resultado: string | null;
    observaciones: string | null;
  }[] | null;
  listaProgramasSIPPE: number[] | null;
  listaRelaciones: number[] | null;
  listaObjetivos: number[] | null;
  listaUbicaciones: {
    idUbicacion: number | null;
    idActividad: number | null;
    nom: string;
    enlace: string | null;
  }[] | null;
  listaEnlaces: {
    idEnlace: number | null;
    desc: string | null;
    link: string | null;
  }[] | null;
  listaFechasPuntuales: {
    idFecha: number | null;
    fecha: string | null;
  }[] | null;
}

const initialState: ActividadState = {
  idActividad: null,
  idArea: null,
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

type Action = CargarDescripcionAction | CargarPeriodoAction | CargarPieAction ;

const actividadReducer = (state: ActividadState = initialState, action: Action): ActividadState => {
  switch (action.type) {
    case CARGAR_DESCRIPCION:
      return {
        ...state,
        desc: action.payload.descripcion,
        listaUbicaciones: action.payload.ubicaciones,
      };
      case CARGAR_PERIODO:
        return {
          ...state,
          fechaDesde: action.payload.fechaDesde,
          fechaHasta: action.payload.fechaHasta,
          listaFechasPuntuales: action.payload.listaFechasPuntuales,
        };
        case CARGAR_PIE:
          return {
            ...state,
            listaObjetivos: action.payload.objetivosSeleccionados,
          };
    default:
      return state;
  }
};

export default actividadReducer;
