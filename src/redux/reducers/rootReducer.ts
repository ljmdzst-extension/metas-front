import { combineReducers } from 'redux';
import actividadSlice from './ActivityReducer';
import authSlice from './AuthReducer';
import metasSlice from './MetasReducer';

const routeReducer = combineReducers({
	actividad: actividadSlice,
	auth: authSlice,
	metas: metasSlice,
});

export default routeReducer;
