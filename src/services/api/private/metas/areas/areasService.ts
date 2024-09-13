import {
	FetchActividades,
	fetchDownloadFile,
	FetchListaActividades,
	fetchUploadFile,
} from '@/types/ActivityProps';
import axios from 'axios';
import { privateAxiosInstance } from '../../../axiosInstance';

const basePath = '/metas/areas';

export const getAreasResumen = async (
	id: string,
	year: string,
	offset: string,
	limit: string,
): Promise<FetchActividades> => {
	const url = `${basePath}/resumen/${id}/${year}/${offset}/${limit}`;

	try {
		const response = await privateAxiosInstance.get<FetchActividades>(url);
		return response.data;
	} catch (error) {
		if (
			axios.isAxiosError(error) &&
			error.response &&
			error.response.data &&
			error.response.data.error
		) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error('An unexpected error occurred');
		}
	}
};

export const getListaActividadesPorArea = async (
	idArea: string,
	anio: string,
): Promise<FetchListaActividades> => {
	const url = `${basePath}/${idArea}/actividades/${anio}`;

	try {
		const response = await privateAxiosInstance.get<FetchListaActividades>(url);
		return response.data;
	} catch (error) {
		if (
			axios.isAxiosError(error) &&
			error.response &&
			error.response.data &&
			error.response.data.error
		) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error('An unexpected error occurred');
		}
	}
};

export const postArchivoPresupuesto = async (
	formData: FormData,
	anio: number,
	idArea: number,
	idPrograma: number,
): Promise<fetchUploadFile> => {
	const url = `${basePath}/subir/presupuesto/${anio}/${idPrograma}/${idArea}`;
	try {
		const response = await privateAxiosInstance.post<fetchUploadFile>(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		if (
			axios.isAxiosError(error) &&
			error.response &&
			error.response.data &&
			error.response.data.error
		) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error('An unexpected error occurred');
		}
	}
};

export const getArchivoPresupuesto = async (
	anio: number,
	idArea: number,
	idPrograma: number,
): Promise<fetchDownloadFile> => {
	const url = `${basePath}/descargar/presupuesto/${anio}/${idPrograma}/${idArea}`;

	try {
		const response = await privateAxiosInstance.get<fetchDownloadFile>(url);
		return response.data;
	} catch (error) {
		if (
			axios.isAxiosError(error) &&
			error.response &&
			error.response.data &&
			error.response.data.error
		) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error('An unexpected error occurred');
		}
	}
};
