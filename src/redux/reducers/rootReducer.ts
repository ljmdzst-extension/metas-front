import actividadSlice from "./ActivityReducer";
import { combineReducers } from "redux";

const routeReducer = combineReducers({
    actividadSlice// Puedes acceder al estado de actividadAux como state.actividadAux
});

export default routeReducer;