// export interface ActivityFetch {
// 	ok: boolean;
// 	data: Actividad;
// 	error: null;
// }

// export interface Actividad {
// 	idActividad: number;
// 	idArea: number;
// 	nro: number | null;
// 	desc: string | null;
// 	listaProgramasSIPPE: number[] | null;
// 	listaObjetivos: number[] | null;
// 	listaRelaciones: number[] | null;
// 	idUsuario: number | null;
// 	fechaDesde: string | null;
// 	fechaHasta: string | null;
// 	motivoCancel: string | null;
// 	listaMetas: ListaMeta[] | null;
// 	listaUbicaciones: ListaUbicacione[] | null;
// 	listaInstituciones: ListaInstitucione[] | null;
// 	listaFechasPuntuales: any[] | null;
// 	listaEnlaces: ListaEnlace[] | null;
// }

// export interface ListaEnlace {
// 	idEnlace: number;
// 	desc: string;
// 	link: string;
// 	idActividad: number;
// 	createdAt: Date;
// 	updatedAt: Date;
// 	deletedAt: null;
// }

// export interface ListaInstitucione {
// 	idInstitucion: number | null;
// 	nom: string | null;
// 	ubicacion: string | null;
// }

// export interface ListaMeta {
// 	idMeta: number | null;
// 	descripcion: string | null;
// 	resultado: string | null;
// 	observaciones: string | null;
// 	valoracion: number | null;
// }

// export interface ListaUbicacione {
// 	idUbicacion: number | null;
// 	enlace: string | null;
// 	desc: string | null;
// }

export interface FetchActividad {
	ok: boolean;
	data: Actividad;
	error: string;
}

export interface Actividad {
	idActividad: number;
	idArea: number;
	nro: number;
	desc: string;
	listaProgramasSIPPE: number[];
	listaObjetivos: number[];
	listaRelaciones: number[];
	idUsuario: null;
	fechaDesde: string;
	fechaHasta: string;
	motivoCancel: string;
	listaMetas: Meta[];
	listaUbicaciones: Ubicacione[];
	listaInstituciones: Institucione[];
	listaFechasPuntuales: FechasPuntuale[];
	listaEnlaces: Enlace[];
}

export interface Enlace {
	idEnlace: number;
	desc: string;
	link: string;
	idActividad: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
}

export interface FechasPuntuale {
	idFecha: number;
	fecha: string;
}

export interface Institucione {
	idInstitucion: number;
	nom: string;
	ubicacion: string;
}

export interface Meta {
	idMeta: number;
	descripcion: string;
	resultado: string;
	observaciones: string;
	valoracion: number | null;
}

export interface Ubicacione {
	idUbicacion: number;
	enlace: string;
	desc: string;
}
