import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { cargarPeriodo } from "../../redux/actions/activityAction";

registerLocale("es", es);

interface FormPeriodoProps {
  onClose: () => void;
}

export default function FormPeriodo({ onClose }: FormPeriodoProps) {
  const dispatch = useDispatch();
  const estadoActualizado = useSelector(
    (state: RootState) => state.activityReducer
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
  const [rangeStart, setRangeStart] = useState<Date>(new Date());
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);
  const [rangeEnd, setRangeEnd] = useState<Date>(defaultEndDate);
  const today = new Date();

  // Sincronizar indexDates con listaFechasPuntuales al principio
  const initialIndexDates = listaFechasPuntuales.filter(
    (fecha) => fecha.fecha !== null
  );
  const [indexDates, setIndexDates] =
    useState<{ idFecha: number | null; fecha: string | null }[]>(
      initialIndexDates
    );

  useEffect(() => {
    setIndexDates(initialIndexDates);
  }, [initialIndexDates]);

  const dateToString = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const selectDateHandler = (d: Date) => {
    const dateString = dateToString(d);

    if (!indexDates.find((date) => date.fecha === dateString)) {
      setDate(d);
      const nuevaFecha = {
        idFecha: null,
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
    dispatch(cargarPeriodo(fechaDesde, fechaHasta, listaFechasPuntuales));
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
                  minDate={today}
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
                  onChange={selectEndDate}
                />
              </div>
            </div>
            <div>
              <p style={{border:"solid black 1px",padding:"2px"}}>
                  El rango seleccionado es desde <span style={{fontSize:"15px",textDecoration:"underline black"}}>{fechaDesde}</span> hasta <span style={{fontSize:"15px", textDecoration:"underline black"}}>{fechaHasta}</span>
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
                    {date.fecha}
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
        onClick={handleCargarFechas}
      >
        Guardar Cambios
      </Button>
    </>
  );
}
