import axios from 'axios';
import { privateAxiosInstance } from '../../../axiosInstance';
import { Actividad, FetchActividad } from '@/types/ActivityProps';

const basePath = '/metas/actividad';

export const getActivitiesList = async (): Promise<FetchActividad> => {
	try {
		const response = await privateAxiosInstance.get<FetchActividad>(basePath);
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

export const getActivity = async (id: number): Promise<FetchActividad> => {
	try {
		const response = await privateAxiosInstance.get<FetchActividad>(`${basePath}/${id}`);
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

export const putActivity = async (data: Actividad) => {
	try {
		const response = await privateAxiosInstance.put(`${basePath}`, data);
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

export const postActivity = async (data: Actividad) : Promise<FetchActividad> => {
	try {
		const response = await privateAxiosInstance.post<FetchActividad>(`${basePath}`, data);
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

export const suspendActivity = async (body: { idActividad: number; motivoCancel: string }) => {
	try {
		const response = await privateAxiosInstance.put(`${basePath}/cancel`, body);
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

export const restoreActivity = async (id: number) => {
	try {
		const response = await privateAxiosInstance.put(`${basePath}/restore`, { idActividad: id });
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

export const deleteActivity = async (id: number) => {
	try {
		const response = await privateAxiosInstance.delete(`${basePath}/`, {
			data: { idActividad: id },
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
