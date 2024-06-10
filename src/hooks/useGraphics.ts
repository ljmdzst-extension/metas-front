import { useEffect, useState } from 'react';
import {
	GraphicsResponse,
	DataGraficoEje,
	DataGraficoObjEst,
	DataGraficoLy,
	DataGraficoUUAA,
} from '../types/GraphicsProps';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { errorAlert } from '../utils/Alerts';

interface Props {
	year?: number;
}

export const useGraphics = ({ year }: Props) => {
	const { token } = useSelector((state: RootState) => state.authSlice);
	const [isLoading, setIsLoading] = useState(true);
	const [graficoEjes, setGraficoEjes] = useState<DataGraficoEje[]>([]);
	const [graficoObjEst, setGraficoObjEst] = useState<DataGraficoObjEst[]>([]);
	const [graficoLy, setGraficoLy] = useState<DataGraficoLy[]>([]);
	const [graficoUUAA, setGraficoUUAA] = useState<DataGraficoUUAA[]>([]);

	useEffect(() => {
		const getGraphics = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_BASE_URL_METAS}/graficos/general/${year}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					},
				);
	
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || 'Error fetching data');
				}
	
				const data: GraphicsResponse = await response.json();
				setGraficoEjes(data.data.dataGraficoEjes);
				setGraficoObjEst(data.data.dataGraficoObjEst);
				setGraficoLy(data.data.dataGraficoLies);
				setGraficoUUAA(data.data.dataGraficoUUAA);
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					errorAlert(error.message);
				} else {
					errorAlert('An unknown error occurred');
				}
			} finally {
				setIsLoading(false);
			}
		};
		getGraphics();
	}, [token, year]);


	return {
		isLoading,
		graficoEjes,
		graficoObjEst,
		graficoLy,
		graficoUUAA,
	};
};
