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
	token: string;
	permisos: string[];
	areas: number[];
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
	data: AuthData;
	error: null;
}

export interface AuthData {
	token: string;
}
