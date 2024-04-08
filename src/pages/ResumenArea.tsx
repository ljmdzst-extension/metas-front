import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import ElementoResumen from '../components/DataRender/ElementoResumen';
import { ArrowBack, Search } from '@mui/icons-material';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { Actividad } from '../types/ActivityProps';
import Swal from 'sweetalert2'
import { getBases } from '../redux/actions/metasActions'

interface Area {
	idArea: number;
	nom: string;
	listaActividades: Actividad[];
	anio: string;
}

const ResumenArea = () => {
	const [data, setData] = useState<Actividad[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [offset, setOffset] = useState(0);
	const { idArea } = useParams<{ idArea: string }>();
	const navigate = useNavigate();

	const { token } = useSelector((state: RootState) => state.authSlice);
	const { bases } = useSelector((state: RootState) => state.metasSlice);
	const dispatch = useDispatch<AppDispatch>();

	const elementRef = useRef(null);

	useEffect(() => {
		const dispachBases = async () => {
			const action = await dispatch(getBases({ token }));
			if (getBases.rejected.match(action)) {
				const { error } = action.payload as { error: string };
				Swal.fire({
					title: 'Error!',
					text: `${error}`,
					icon: 'error',
					confirmButtonText: 'Ok',
				});
			}
		};
		if (!bases) {
			dispachBases();
		}
	}, [bases, dispatch, token]);

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

		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_BASE_URL_METAS}/areas/resumen/${idArea}/${
					areaData.anio
				}/${offset}/5`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			const resJson = await res.json();
			console.log(resJson);
			if (resJson.data.length === 0) setHasMore(false);
			else {
				setTimeout(() => {
					setData((data) => [...data, ...resJson.data]);
					setOffset((offset) => offset + 5);
				}, 2000);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className=' container'>
			<div className=' d-flex justify-content-between align-items-center m-2'>
				<h3 className=' text-uppercase text-center '>Lista de Actividades</h3>
				<ArrowBack className=' cursor-pointer' onClick={() => navigate(-1)} />
			</div>
			<InputGroup className=' w-50 m-2'>
				<Form.Control
					type='text'
					placeholder='Buscar Actividad'
					name='dni'
					disabled={true}
					size='sm'
				/>
				<Button variant='outline-secondary' disabled={true} size='sm'>
					<Search />
				</Button>
			</InputGroup>
			<div
				className=' list-group mx-auto custom-scrollbar overflow-y-auto gap-2'
				style={{ maxHeight: '500px' }}
			>
				{data.map((el, index) => (
					<ElementoResumen element={el} key={el.desc + '-' + index} />
				))}
				{hasMore && (
					<p className=' text-secondary text-uppercase p-2' ref={elementRef}>
						Cargando datos
					</p>
				)}
			</div>
		</div>
	);
};

export default ResumenArea;
