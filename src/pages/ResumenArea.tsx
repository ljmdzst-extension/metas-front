import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Area {
	idArea: number;
	nom: string;
	listaActividades: any[]; // Reemplaza esto con el tipo correcto si es necesario
	anio: string;
}

const ScrollableDataComponent: React.FC = () => {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMoreData, setHasMoreData] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	const { idArea } = useParams<{ idArea: string }>();
	const { token } = useSelector((state: RootState) => state.authSlice);

	const [currentPage, setCurrentPage] = useState(1);

	const fetchNextPage = async () => {
		if (!hasMoreData || loading) {
			return;
		}

		setLoading(true);

		const stringAreaData = localStorage.getItem('currentArea');
		const areaData = JSON.parse(stringAreaData!) as Area;

		const response = await fetch(
			`${import.meta.env.VITE_API_BASE_URL_METAS}/areas/resumen/${idArea}/${
				areaData.anio
			}/${currentPage}/2`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		const { data } = await response.json();
		console.log(data);
		if (Array.isArray(data) && data.length === 0) {
			setHasMoreData(false);
		} else {
			setData((prevData) => [...prevData, ...data]);
			setCurrentPage((prevPage) => prevPage + 1);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchNextPage();
	}, [idArea, token]);

	return (
		<div>
			<h1>Scrollable Data</h1>
			<InfiniteScroll
				dataLength={data.length}
				next={fetchNextPage}
				hasMore={hasMoreData}
				loader={<h4>Cargando...</h4>}
				endMessage={<h4>¡Fin de los datos!</h4>}
				containerTagName='div'
				style={{ overflowY: 'auto', height: '300px', border: '1px solid #ccc' }}
				ref={containerRef}
			>
				{data.map((item, index) => (
					<div key={'Actividad' + index}>
						<h2>{item.desc}</h2>
						<h3>Contenido de la actividad {item.desc}</h3>
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
};

export default ScrollableDataComponent;
