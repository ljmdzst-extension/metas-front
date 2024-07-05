import axios from "axios"
import { privateAxiosInstance } from "../../axiosInstance"
import { FetchActividad } from "@/types/ActivityProps"


const basePath = '/metas';

export const getActividades = async (): Promise<FetchActividad> => {
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
}