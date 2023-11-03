import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { guardarActividad } from "../../redux/actions/putActividad";
import { Col, Container, Row } from "react-bootstrap"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

registerLocale("es", es);

interface FormPeriodoProps {
  onClose: () => void;
}

export default function FormPeriodo({ onClose }: FormPeriodoProps) {
  const dispatch = useDispatch();
  const estadoActualizado = useSelector(
    (state: RootState) => state.actividadSlice
  );

  const [fechaDesde, setFechaDesde] = useState<string | null>(
    estadoActualizado.fechaDesde ?? null
  );

  const [fechaHasta, setFechaHasta] = useState<string | null>(
    estadoActualizado.fechaHasta ?? null
  );
  const [listaFechasPuntuales, setListaFechasPuntuales] = useState<
    { idFecha: number | null; fecha: string | null }[]
  >(estadoActualizado.listaFechasPuntuales ?? []);
  const [startDate, setDate] = useState<Date>(new Date());
  const [rangeStart, setRangeStart] = useState<Date>(
    new Date(estadoActualizado.fechaDesde?.split("-").join("/") || "2023/01/01")
  );

  const [rangeEnd, setRangeEnd] = useState<Date>(
    new Date(estadoActualizado.fechaHasta?.split("-").join("/") || "2023/12/31")
  );


  const [indexDates, setIndexDates] = useState<
    { idFecha: number | null; fecha: string | null }[]
  >(listaFechasPuntuales.filter((fecha) => fecha.fecha !== null));

  useEffect(() => {
    setIndexDates(listaFechasPuntuales.filter((fecha) => fecha.fecha !== null));
  }, [listaFechasPuntuales]);

  const printDMA = (fecha: string) => fecha?.split("-").reverse().join("/");

  const dateToString = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  const selectDateHandler = (d: Date) => {
    const dateString = dateToString(d);

    if (!indexDates.find((date) => date.fecha === dateString)) {
      setDate(d);
      const nuevaFecha = {
        idFecha: 0,
        fecha: dateString,
      };
      setListaFechasPuntuales([...listaFechasPuntuales, nuevaFecha]);
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
    const filteredDates = listaFechasPuntuales.filter(
      (fecha) => fecha.fecha !== date
    );
    setListaFechasPuntuales(filteredDates);
  };

	return (
		<div className=' contenedor-forms mx-3 '>
			<Row className=' justify-content-around'>
				<Col className=' border rounded border-black ' xs={7}>
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
								selected={rangeStart}
								minDate={new Date('2023/01/01')}
								maxDate={new Date(indexDates[0]?.fecha?.split('-').join('/') || '2080-01-01')}
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
								selected={rangeEnd}
								startDate={rangeStart}
								endDate={rangeEnd}
								minDate={
									new Date(
										indexDates[indexDates.length - 1]?.fecha?.split('-').join('/') || '2023/01/02',
									)
								}
								onChange={selectEndDate}
							/>
						</div>
					</div>
					<div>
						<p
							className={`text-center m-2 ${
								fechaDesde && fechaHasta
									? 'texto-fechas-seleccionadas'
									: 'texto-fechas-no-seleccionadas'
							}`}
						>
							{fechaDesde && fechaHasta
								? `El rango seleccionado es desde ${printDMA(fechaDesde)} hasta ${printDMA(
										fechaHasta,
								  )}`
								: 'Seleccione un rango de fechas'}
						</p>
					</div>
				</Col>
				<Col className=' border rounded border-black  ' xs={5}>
					<h4 className=' text-center mt-2'>Seleccionar Fechas Puntuales</h4>
					<p>
						Seleccione si la actividad se realiza en una fecha puntual (recuerde que debe estar en
						el intervalo de meses seleccionado)
					</p>
					<div>
						<p>Seleccione una Fecha:</p>
						<DatePicker
							dateFormat='dd/MM/yyyy'
							locale='es'
							minDate={rangeStart}
							maxDate={rangeEnd}
							selected={startDate}
							onChange={selectDateHandler}
						/>
					</div>
					<div className='ConteinerDaysSelected'>
						<div className='ConteinerFechas'>
							<span>Fechas Seleccionadas:</span>
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
					className='mt-2 align-self-center'
					onClick={() => {
						guardarActividad(
							{
								...estadoActualizado,
								fechaDesde: fechaDesde,
								fechaHasta: fechaHasta,
								listaFechasPuntuales: listaFechasPuntuales,
							},
							dispatch,
						);
						onClose();
					}}
				>
					Guardar Actividad
				</Button>
			</div>
		</div>
	);
}
