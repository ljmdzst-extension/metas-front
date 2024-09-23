import { useEffect, useState } from 'react';
import {
	DataGraficoEje,
	DataGraficoObjEst,
	DataGraficoLy,
	DataGraficoUUAA,
} from '../types/GraphicsProps';
import { getGraphicsData, getGraphicsDataByArea } from '@/services/api/private/metas';
import useAlert from './useAlert';

interface Props {
	year?: number;
	area?: number;  // Nuevo parámetro opcional para área
}

export const useGraphics = ({ year, area }: Props) => {
	const { errorAlert } = useAlert();
	const [isLoading, setIsLoading] = useState(true);
	const [graficoEjes, setGraficoEjes] = useState<DataGraficoEje[]>([]);
	const [graficoObjEst, setGraficoObjEst] = useState<DataGraficoObjEst[]>([]);
	const [graficoLy, setGraficoLy] = useState<DataGraficoLy[]>([]);
	const [graficoUUAA, setGraficoUUAA] = useState<DataGraficoUUAA[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				let data;

				if (area) {
					data = await getGraphicsDataByArea(year, area);
				} else {
					data = await getGraphicsData(year);
				}

				// Establecemos los datos recibidos en los estados correspondientes
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

		fetchData();
	}, [year, area]);

	return {
		isLoading,
		graficoEjes,
		graficoObjEst,
		graficoLy,
		graficoUUAA,
	};
};
