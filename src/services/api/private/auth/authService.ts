import axios from 'axios';
import { privateAxiosInstance } from '../../axiosInstance';
import { AuthResponse } from '@/types/AuthProps';

const basePath = '/usr';

export const authUser = async () => {
	try {
		const response = await privateAxiosInstance.post<AuthResponse>(`${basePath}/auth`);
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
