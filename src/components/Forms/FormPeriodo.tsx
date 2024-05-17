import { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { guardarActividad } from '../../redux/actions/putActividad';
import { Col, Row } from 'react-bootstrap';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

registerLocale('es', es);

export default function FormPeriodo() {
	const dispatch = useDispatch();
	const { activity } = useSelector((state: RootState) => state.actividadSlice);

	// const [isSaving, setIsSaving] = useState<boolean>(false);

	const [fechaDesde, setFechaDesde] = useState<string | null>(activity.fechaDesde ?? null);

	const [fechaHasta, setFechaHasta] = useState<string | null>(activity.fechaHasta ?? null);
	const [erroresRango, setErroresRango] = useState<string>('');
	const [listaFechasPuntuales, setListaFechasPuntuales] = useState<
		{ idFecha: number | null; fecha: string | null }[]
	>(activity.listaFechasPuntuales ?? []);
	const [rangeStart, setRangeStart] = useState<Date | null>(
		activity.fechaDesde ? new Date(activity.fechaDesde?.split('-').join('/')) : null,
	);

	const [rangeEnd, setRangeEnd] = useState<Date | null>(
		activity.fechaHasta ? new Date(activity.fechaHasta?.split('-').join('/')) : null,
	);

	const [indexDates, setIndexDates] = useState<{ idFecha: number | null; fecha: string | null }[]>(
		listaFechasPuntuales.filter((fecha) => fecha.fecha !== null),
	);

	useEffect(() => {
		setIndexDates(listaFechasPuntuales.filter((fecha) => fecha.fecha !== null));
	}, [listaFechasPuntuales]);

	const printDMA = (fecha: string) => fecha?.split('-').reverse().join('/');

	const dateToString = (date: Date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
	};

	const selectDateHandler = (d: Date) => {
		console.log('selectDateHandler', d);
		const dateString = dateToString(d);

		if (!indexDates.find((date) => date.fecha === dateString)) {
			const nuevaFecha = {
				idFecha: 0,
				fecha: dateString,
			};

			const listaOrdenada = [...listaFechasPuntuales, nuevaFecha].sort((a, b) => {
				if (a.fecha && b.fecha) {
					const dateA = new Date(a.fecha);
					const dateB = new Date(b.fecha);
					// console.log(dateA.getTime() - dateB.getTime());
					return dateA.getTime() - dateB.getTime();
				}
				return 0;
			});

			setListaFechasPuntuales(listaOrdenada);
		}
	};

	const selectStartDate = (d: Date) => {
		setRangeStart(d);
		setFechaDesde(dateToString(d));
	};

	const selectEndDate = (d: Date) => {
		setRangeEnd(d);
		setFechaHasta(dateToString(d));
	};

	const eliminarFecha = (date: string) => {
		const filteredDates = listaFechasPuntuales.filter((fecha) => fecha.fecha !== date);
		setListaFechasPuntuales(filteredDates);
	};

	const highlightSelectedDates = () => {
		const highlightDates: Date[] = [];
		indexDates.forEach((date) => {
			if (date.fecha) {
				const dateToHighlight = new Date(date.fecha + 'T00:00:00-03:00');
				dateToHighlight.setDate(dateToHighlight.getDate());
				highlightDates.push(dateToHighlight);
			}
		});
		return highlightDates;
	};

	useEffect(() => {
		const validarRango = () => {
			if (rangeStart && rangeEnd) {
				if (rangeStart.getTime() > rangeEnd.getTime()) {
					setErroresRango('La fecha de inicio no puede ser mayor a la fecha de fin');
					return false;
				}
			}
			setErroresRango('');
			return true;
		};
		validarRango();
	}, [rangeStart, rangeEnd]);

	return (
		<div className=' d-flex flex-column mx-3 h-100'>
			<Row className='mt-3 h-100'>
				<Col style={{ borderRight: '2px solid #acafb3' }} xs={7}>
					<h4 className=' text-center mt-2'>Seleccionar Periodo</h4>
					<p>
						Período que abarca desde el inicio de la planificación hasta la fecha de realización de
						la actividad.
					</p>
					<div className='ConteinerRange gap-2'>
						<div>
							<p>Inicio:</p>
							<DatePicker
								wrapperClassName='datePicker'
								locale='es'
								selectsStart
								dateFormat='dd/MM/yyyy'
								selected={rangeStart || null}
								minDate={new Date('2023/01/01')}
								maxDate={new Date(indexDates[0]?.fecha?.split('-').join('/') ?? '2080-01-01')}
								startDate={rangeStart}
								endDate={rangeEnd}
								onChange={selectStartDate}
							/>
						</div>
						<div>
							<p>Fin:</p>
							<DatePicker
								selectsEnd
								locale='es'
								dateFormat='dd/MM/yyyy'
								selected={rangeEnd || null}
								startDate={rangeStart}
								endDate={rangeEnd}
								minDate={
									new Date(
										indexDates[indexDates.length - 1]?.fecha?.split('-').join('/') ?? '2023/01/02',
									)
								}
								onChange={selectEndDate}
							/>
						</div>
					</div>
					<div>
						{erroresRango && <p className='texto-fechas-error'>{erroresRango}</p>}
						{!erroresRango &&
							(rangeStart && rangeEnd ? (
								<p className='texto-fechas-seleccionadas'>
									El rango seleccionado es desde {printDMA(fechaDesde ?? '')} hasta{' '}
									{printDMA(fechaHasta ?? '')}
								</p>
							) : (
								<p className='texto-fechas-no-seleccionadas'>Seleccione un rango de fechas</p>
							))}
					</div>
				</Col>
				<Col className='  ' xs={5}>
					<h4 className=' text-center mt-2'>Seleccionar Fechas Puntuales</h4>
					<p>
						Seleccione si la actividad se realiza en una fecha puntual (recuerde que debe estar en
						el intervalo de meses seleccionado)
					</p>
					<div>
						<DatePicker
							dateFormat='dd/MM/yyyy'
							locale='es'
							minDate={rangeStart}
							maxDate={rangeEnd}
							placeholderText='Seleccione una fecha'
							onChange={selectDateHandler}
							highlightDates={highlightSelectedDates()}
							disabled={!rangeStart || !rangeEnd}
						/>
					</div>
					<div className='ConteinerDaysSelected m-2 ms-0'>
						<span>Fechas Seleccionadas:</span>
						<div
							className='ConteinerFechas custom-scrollbar'
							style={{ maxHeight: '160px', overflowY: 'auto' }}
						>
							{indexDates.map((date, index) => (
								<ListGroup.Item
									key={index}
									variant='Secondary'
									className=' d-flex p-1 my-1 border rounded border-black align-items-center justify-content-between'
								>
									{printDMA(date.fecha ?? '')}
									<HighlightOffIcon color='error' onClick={() => eliminarFecha(date.fecha ?? '')} />
								</ListGroup.Item>
							))}
						</div>
					</div>
				</Col>
			</Row>

			<div className=' d-flex justify-content-center '>
				<Button
					variant='success'
					className='mt-auto mb-3 align-self-center '
					onClick={() => {
						guardarActividad(
							{
								...activity,
								fechaDesde: fechaDesde,
								fechaHasta: fechaHasta,
								listaFechasPuntuales: listaFechasPuntuales,
							},
							dispatch,
						);
					}}
				>
					Guardar Actividad
				</Button>
			</div>
		</div>
	);
}
