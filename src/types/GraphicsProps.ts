export interface GraphicsResponse {
	ok: boolean;
	data: GraphicsData;
	error: null;
}

export interface GraphicsData {
	dataGraficoEjes: DataGraficoEje[];
	dataGraficoLies: DataGraficoLy[];
	dataGraficoObjEst: DataGraficoObjEst[];
	dataGraficoUUAA: DataGraficoUUAA[];
}

export interface DataGraficoEje {
	eje: string;
	cantActividades: number;
}

export interface DataGraficoLy {
	lie: string;
	cantActividades: number;
}

export interface DataGraficoObjEst {
	objEst: string;
	cantActividades: number;
}

export interface DataGraficoUUAA {
	ua: string;
	cantActividades: number;
}
