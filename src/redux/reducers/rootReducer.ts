import actividadSlice from "./ActivityReducer";
import { combineReducers } from "redux";

const routeReducer = combineReducers({
    actividadSlice
});

export default routeReducer;