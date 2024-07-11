import { useEffect, useState } from 'react';
import {
	DataGraficoEje,
	DataGraficoObjEst,
	DataGraficoLy,
	DataGraficoUUAA,
} from '../types/GraphicsProps';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { errorAlert } from '@/utils/Alerts';
import { getGraphicsData } from '@/services/api/private/metas';

interface Props {
	year?: number;
}

export const useGraphics = ({ year }: Props) => {
	const { token } = useSelector((state: RootState) => state.auth);
	const [isLoading, setIsLoading] = useState(true);
	const [graficoEjes, setGraficoEjes] = useState<DataGraficoEje[]>([]);
	const [graficoObjEst, setGraficoObjEst] = useState<DataGraficoObjEst[]>([]);
	const [graficoLy, setGraficoLy] = useState<DataGraficoLy[]>([]);
	const [graficoUUAA, setGraficoUUAA] = useState<DataGraficoUUAA[]>([]);

	useEffect(() => {
		getGraphicsData(year)
			.then((data) => {
				setGraficoEjes(data.data.dataGraficoEjes);
				setGraficoObjEst(data.data.dataGraficoObjEst);
				setGraficoLy(data.data.dataGraficoLies);
				setGraficoUUAA(data.data.dataGraficoUUAA);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				if (error instanceof Error) {
					errorAlert(error.message);
				} else {
					errorAlert('An unknown error occurred');
				}
			});
	}, [token, year]);

	return {
		isLoading,
		graficoEjes,
		graficoObjEst,
		graficoLy,
		graficoUUAA,
	};
};
