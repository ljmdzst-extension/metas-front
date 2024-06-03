export interface LoginResponse {
	ok: boolean;
	data: Data;
	error: null | string;
}

export interface Data {
	idUsuario: string;
	email: string;
	ape: string;
	nom: string;
	token: string;
	permisos: string[];
}

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
	data: Data;
	error: null;
}

export interface Data {
	token: string;
}
