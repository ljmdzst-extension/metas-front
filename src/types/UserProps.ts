export interface UserFetch {
	ok: boolean;
	data: UserData[];
	error: string | null;
}

export interface UserFormData {
	nom: string;
	ape: string;
	email: string;
	pass: string;
	roles: string[];
	anio: number | null;
	programas: number[];
	areas: number[];
}

export interface UserData {
	idUsuario: string;
	nroDoc: string;
	email: string;
	pass: string;
	idUnidadAcademica: number;
	pendiente: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	categoria: Categoria;
	areas: Area[];
	roles: string[];
	nom: string;
	ape: string;
}

export interface Area {
	idArea: number;
	idPrograma: number;
	anio: number;
	idCategoria: number;
	idUsuario: string;
}

export enum Categoria {
	Admin = 'ADMIN',
	Eyc = 'EYC',
	EycEcoFinan = 'EYC_ECO_FINAN',
	GestionEyc = 'GESTION_EYC',
	ProgEXT = 'PROG_EXT',
}
