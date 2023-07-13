import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import es from 'date-fns/locale/es'
registerLocale('es',es)

export default function FormPeriodo() {
  const [startDate, setDate] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(new Date());
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 7);
  const [rangeEnd, setRangeEnd] = useState(defaultEndDate);
  const today = new Date();
  const [indexDates, setIndexDates] = useState<string []>([]);

  const selectDateHandler = (d: Date) => {
    setDate(d);
    setIndexDates([...indexDates, d.getDate()+ "-"+ (d.getMonth()+1) +"-"+ d.getFullYear().toString()])
};

  const selectStartDate = (d: Date) => {
    setRangeStart(d);
  };

  const selectEndDate = (d: Date) => {
    setRangeEnd(d);
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
              <p>Desde:</p>
              <DatePicker
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
              <p>Hasta:</p>
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
        </div>
        <div className="ConteinerDay">
          <h3>Seleccion Fechas Puntuales</h3>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            locale="es"
            minDate={rangeStart}
            maxDate={rangeEnd}
            selected={startDate}
            onChange={selectDateHandler}
          />
          <div className="ConteinerDaysSelected">
            <ul>Fechas Seleccionadas:
              {indexDates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <button className="SaveChange">Guardar Cambios</button>
    </>
    
  );
}
