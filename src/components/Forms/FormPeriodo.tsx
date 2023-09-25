import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CARGAR_PERIODO } from "../../redux/reducers/ActivityReducer";

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
  const [rangeStart, setRangeStart] = useState<Date>( new Date( estadoActualizado.fechaDesde?.split('-').join('/') || '2023/01/01'));

  const [rangeEnd, setRangeEnd] = useState<Date>(  new Date(estadoActualizado.fechaHasta?.split('-').join('/') ||  '2023/12/31' ));

  console.log(estadoActualizado.fechaDesde);
  

  const [indexDates, setIndexDates] =
    useState<{ idFecha: number | null; fecha: string | null }[]>(
      listaFechasPuntuales.filter(
        (fecha) => fecha.fecha !== null
      )
    );

  useEffect(() => {
    setIndexDates( listaFechasPuntuales.filter(
      (fecha) => fecha.fecha !== null
    ));
  }, [listaFechasPuntuales]);

  const printDMA = (fecha : string) => fecha?.split('-').reverse().join('/');

  const dateToString = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  const selectDateHandler = (d: Date ) => {
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

  const handleCargarFechas = () => {
    console.log('llamando dispatch')
    dispatch(CARGAR_PERIODO({fechaDesde, fechaHasta, listaFechasPuntuales}));
    onClose();
  };

  return (
    <>
      <div className="FormDescription">
        <h1>Periodo</h1>
        <div className="ConteinerBigDate">
          <div className="ConteinerDate">
            <h3>Seleccionar Periodo</h3>
            <p>
              Período que abarca desde el inicio de la planificación hasta la
              fecha de realización de la actividad.
            </p>
            <div className="ConteinerRange">
              <div>
                <p>Inicio:</p>
                <DatePicker
                  wrapperClassName="datePicker"
                  locale="es"
                  selectsStart
                  dateFormat="dd/MM/yyyy"
                  selected={rangeStart}
                  minDate={new Date( '2023/01/01')}
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
                  locale="es"
                  dateFormat="dd/MM/yyyy"
                  selected={rangeEnd}
                  startDate={rangeStart}
                  endDate={rangeEnd}
                  minDate={new Date(indexDates[indexDates.length-1]?.fecha?.split('-').join('/') || '2023/01/02')}
                  onChange={selectEndDate}
                />
              </div>
            </div>
            <div>
              <p style={{border:"solid black 1px",padding:"2px"}}>
                  El rango seleccionado es desde <span style={{fontSize:"15px",textDecoration:"underline black"}}>{printDMA(fechaDesde || '')}</span> hasta <span style={{fontSize:"15px", textDecoration:"underline black"}}>{printDMA(fechaHasta || '')}</span>
              </p>
            </div>
          </div>
          <div className="ConteinerDay">
            <h3>Seleccionar Fechas Puntuales</h3>
            <p>
              Seleccione si la actividad se realiza en una fecha puntual
              (recuerde que debe estar en el intervalo de meses seleccionado)
            </p>
            <div>
              <p>Seleccione una Fecha:</p>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                locale="es"
                minDate={rangeStart}
                maxDate={rangeEnd}
                selected={startDate}
                onChange={selectDateHandler}
              />
            </div>
            <div className="ConteinerDaysSelected">
              <div className="ConteinerFechas">
                <span>Fechas Seleccionadas:</span>
                {indexDates.map((date, index) => (
                  <ListGroup.Item
                    key={index}
                    variant="secondary"
                    style={{
                      width: "100%",
                      display: "flex",
                      padding: "3px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                      borderRadius: "7px",
                    }}
                  >
                    {printDMA(date.fecha ||'')}
                    <Button
                      variant="danger"
                      onClick={() => eliminarFecha(date.fecha || "")}
                    >
                      Eliminar
                    </Button>
                  </ListGroup.Item>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="success"
        className="SaveChange"
        onClick={()=>handleCargarFechas()}
      >
        Guardar Cambios
      </Button>
    </>
  );
}
