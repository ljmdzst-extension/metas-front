import actividadSlice from './ActivityReducer';
import { combineReducers } from 'redux';
import authSlice from './AuthReducer';

const routeReducer = combineReducers({
	actividadSlice,
	authSlice,
});

export default routeReducer;
