import axios from 'axios';
import { FetchBasesProps } from '@/types/BasesProps';
import { privateAxiosInstance } from '../../axiosInstance';

const basePath = '/metas/bases';

export const getBases = async (): Promise<FetchBasesProps> => {
	try {
		const response = await privateAxiosInstance.get<FetchBasesProps>(basePath);
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
