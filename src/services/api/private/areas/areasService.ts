import { FetchActividades } from "@/types/ActivityProps"
import axios from "axios"
import { privateAxiosInstance } from "../../axiosInstance"

const basePath = '/metas/areas';

export const getAreasResumen = async (id : string, year: string, offset: string, limit: string): Promise<FetchActividades> => {
  const url = `${basePath}/resumen/${id}/${year}/${offset}/${limit}`

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
}