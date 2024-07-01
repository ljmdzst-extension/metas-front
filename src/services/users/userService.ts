import { UserFetch } from '@/types/UserProps';
import axiosInstance from '../api/axiosInstance';
import axios from 'axios';

const basePath = '/metas/admin/usr';

export const getAllUsers = async (): Promise<UserFetch> => {
	try {
		const response = await axiosInstance.get<UserFetch>(basePath);
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
