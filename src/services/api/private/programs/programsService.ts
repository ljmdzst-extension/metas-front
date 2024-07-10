import { FetchProgramasProps } from "@/types/AppProps"
import { privateAxiosInstance } from "../../axiosInstance"
import axios from "axios"


const basePath = '/metas/programas';

export const getProgramas = async (year: number): Promise<FetchProgramasProps> => {
  try {
    const response = await privateAxiosInstance.get<FetchProgramasProps>(`${basePath}/${year}`);
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