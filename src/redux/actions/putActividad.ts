import { AppDispatch } from "../store";
import { CargarDatosActividadAction } from "./activityAction";

export const guardarActividad = (dato: any, dispatch: AppDispatch) => {
  fetch("http://168.197.50.94:4005/metas/v2/actividad", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dato),
  })
    .then((resp) => resp.json())
    .then((data) => {
      data.ok ? alert("actividad guardada !") : alert(data.error);
      dispatch(CargarDatosActividadAction(dato.idActividad));
    })
    .catch((error) => alert(JSON.stringify(error)));
};
