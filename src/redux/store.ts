import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
