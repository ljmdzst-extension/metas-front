import axios from 'axios';
import { UserData, UserFetch, UserListFetch } from '@/types/UserProps';
import { privateAxiosInstance } from '../../axiosInstance';

const basePath = '/metas/admin/usr';

export const getAllUsers = async (): Promise<UserListFetch> => {
	try {
		const response = await privateAxiosInstance.get<UserListFetch>(basePath);
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

export const getUserByID = async (id: string): Promise<UserFetch> => {
	try {
		const response = await privateAxiosInstance.get<UserFetch>(`${basePath}/${id}`);
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

export const putUsers = async (data: UserData): Promise<UserFetch> => {
	try {
		const response = await privateAxiosInstance.put<UserFetch>(basePath, data);
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
