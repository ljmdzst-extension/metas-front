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
	categorias: Categoria[];
}

export interface Categoria {
	categoria: string;
	permiso: string;
}
