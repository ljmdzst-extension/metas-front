import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack, Replay } from '@mui/icons-material';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { Actividad } from '@/types/ActivityProps';
import { getAreasResumen } from '@/services/api/private/metas';
import LoadingSpinner from '@/components/Common/Spinner/LoadingSpinner';
import ElementoResumen from '@/components/metas/DataRender/ElementoResumen'

interface Area {
	idArea: number;
	nom: string;
	listaActividades: Actividad[];
	anio: string;
}

const ResumenAreaScreen = () => {
	const [data, setData] = useState<Actividad[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [offset, setOffset] = useState(0);
	const { idArea } = useParams<{ idArea: string }>();
	const navigate = useNavigate();

	const [search, setSearch] = useState<string>('');

	const elementRef = useRef(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSearch = () => {
		if (search.length > 3 || search.length === 0) {
			setOffset(0);
			setData([]);
			setHasMore(true);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(OnIntersection);
		if (observer && elementRef.current) observer.observe(elementRef.current);
		return () => {
			if (observer) observer.disconnect();
		};
	}, [data]);

	const OnIntersection = async (entries: IntersectionObserverEntry[]) => {
		const firstEntry = entries[0];
		if (firstEntry.isIntersecting && hasMore) await getData(offset);
	};

	const getData = async (offset: number) => {
		const stringAreaData = localStorage.getItem('currentArea');
		const areaData = JSON.parse(stringAreaData!) as Area;

		if (idArea) {
			getAreasResumen(idArea, areaData.anio, offset.toString(), '5').then((res) => {
				if (res.data.length === 0) {
					setHasMore(false);
				} else {
					setTimeout(() => {
						setData((data) => [...data, ...res.data]);
						setOffset((offset) => offset + 5);
					}, 2000);
				}
			});
		}
	};

	return (
		<div
			className=' d-flex flex-column h-100 m-2 border rounded'
			style={{ backgroundColor: '#fefefe' }}
		>
			<div className=' d-flex justify-content-between align-items-center m-2'>
				<h3 className=' text-uppercase text-center '>Lista de Actividades</h3>
				<ArrowBack className=' cursor-pointer' onClick={() => navigate(-1)} />
			</div>
			<InputGroup className=' w-50 m-2'>
				<Form.Control
					type='text'
					placeholder='Buscar Actividad'
					name='dni'
					onChange={handleChange}
					size='sm'
				/>
				<Button variant='primary' size='sm' onClick={handleSearch}>
					<Replay />
				</Button>
			</InputGroup>
			<div
				className=' list-group mx-auto custom-scrollbar overflow-y-auto gap-4 p-2 m-2'
				style={{ height: '100%' }}
			>
				{data.map((el, index) => (
					<ElementoResumen element={el} key={el.desc + '-' + index} />
				))}
				{hasMore && (
					<div className='d-flex align-items-center h-100' ref={elementRef}>
						<LoadingSpinner />
					</div>
				)}
			</div>
		</div>
	);
};

export default ResumenAreaScreen;
