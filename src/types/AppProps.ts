export interface navLinkProps {
	title: string;
	index: string;
	SubNav?: navLinkProps[] | null;
}

// Metas Bases
export interface FechBasesProps {
	ok: boolean;
	data: BasesDataProps;
}

export interface BasesDataProps {
	lAreas: LArea[];
	listaObjetivos: ListaObjetivo[];
	listaProgramasSIPPE: ListaProgramasSIPPE[];
	listaRelaciones: ListaRelacione[];
	listaValoraciones: ListaValoracione[];
	unidadesAcademicas: ListaRelacione[];
}

export interface LArea {
	idRelacion: number;
	nom: string;
	idTipoRelacion: number;
}

export interface ListaObjetivo {
	idObjetivo: number;
	nom: string;
	detalle: null | string;
	tipoObjetivo: TipoObjetivo;
}

export interface TipoObjetivo {
	idTipoObj: number;
	nom: TipoObjetivoNom;
}

export enum TipoObjetivoNom {
	EjeTransversal = 'Eje Transversal',
	LíneaInstitucionalEstratégica = 'Línea Institucional Estratégica',
	ObjetivoEstratégico = 'Objetivo Estratégico',
}

export interface ListaProgramasSIPPE {
	idProgramaSippe: number;
	nom: string;
}

export interface ListaRelacione {
	idRelacion: number;
	nom: string;
	tipoRelacion: TipoRelacion;
}

export interface TipoRelacion {
	idTipoRelacion: number;
	nom: TipoRelacionNom;
}

export enum TipoRelacionNom {
	InternaExtensión = 'interna_extensión',
	InternaUnl = 'interna_unl',
	UA = 'U.A.',
}

export interface ListaValoracione {
	idValoracion: number;
	nom: string;
}
