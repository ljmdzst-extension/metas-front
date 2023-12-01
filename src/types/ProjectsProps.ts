// Generated by https://quicktype.io

export interface ResponseProjectsProps {
	ok: boolean;
	data: DataProjectsProps;
	error: null;
}

export interface DataProjectsProps {
	listaProyectosUsuario: ProjectProps[];
}

export interface ProjectProps {
	id: number;
	codigo: string;
	titulo: string;
	fechaCreacion: string;
	responsable: string;
	estado: Estado;
}

export enum Estado {
	Adm = 'ADM',
	NoPert = 'NO_PERT',
	Ok = 'OK',
}

export interface projectHistoryProps {
	id: number;
	desc: string;
	tipoEstado: string;
	fechaCreacion: Date;
}
