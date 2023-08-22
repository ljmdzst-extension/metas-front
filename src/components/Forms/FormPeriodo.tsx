import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import es from "date-fns/locale/es";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
registerLocale("es", es);

export default function FormPeriodo() {
  const [startDate, setDate] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(new Date());
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);
  const [rangeEnd, setRangeEnd] = useState(defaultEndDate);
  const today = new Date();
  const [indexDates, setIndexDates] = useState<string[]>([]);

  const selectDateHandler = (d: Date) => {
    setDate(d);
    setIndexDates([
      ...indexDates,
      d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear().toString(),
    ]);
  };

  const selectStartDate = (d: Date) => {
    setRangeStart(d);
  };

  const selectEndDate = (d: Date) => {
    setRangeEnd(d);
  };
  const eliminarFecha = (date: string) => {
    setIndexDates(indexDates.filter((item) => item !== date));
  };
  return (
    <>
      <div className="FormDescription">
        <h1>Periodo</h1>
        <div className="ConteinerBigDate">
          <div className="ConteinerDate">
            <h3>Seleccionar Periodo</h3>
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
                  open
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
                  open
                />
              </div>
            </div>
          </div>
          <div className="ConteinerDay">
            <h3>Seleccionar Fechas Puntuales</h3>
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
                      padding:"3px",
                      justifyContent:"space-between",
                      alignItems:"center",
                      marginBottom: "5px",
                      borderRadius: "7px"
                    }}
                  >
                    {date}
                    <Button variant="danger">
                      <img
                        src="./assets/img/eliminar.png"
                        className="imgboton"
                        alt="eliminar"
                        onClick={() => eliminarFecha(date)}
                      />
                    </Button>
                  </ListGroup.Item>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button variant="success" className="SaveChange">
        Guardar Cambios
      </Button>
    </>
  );
}
