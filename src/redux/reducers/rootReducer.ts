import { combineReducers } from 'redux';
import actividadSlice from './ActivityReducer';
import authSlice from './AuthReducer';
import metasSlice from './MetasReducer';

const routeReducer = combineReducers({
	actividadSlice,
	authSlice,
	metasSlice,
});

export default routeReducer;
