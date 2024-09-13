export interface RegisterProps {
	dni: string;
	ape: string;
	nom: string;
	idUnidadAcademica: number;
	email: string;
	pass: string;
	confirmPass: string;
}

export interface AuthResponse {
	ok: boolean;
	data: AuthData;
	error: null;
}

export interface AuthData {
	token: string;
}

export interface LoginResponse {
	ok: boolean;
	data: UserData;
	error: null | string;
}

export interface UserData {
	idUsuario: string;
	email: string;
	ape: string;
	nom: string;
	permisos: string[];
	categorias: string[];
	areas: Area[];
	token: string;
}

export interface Area {
	anio: number;
	listaProgramas: Programa[];
}

export interface Programa {
	idPrograma: number;
	nom: string;
	listaAreas: Area[];
}

export interface Area {
	idArea: number;
	nom: string;
}
