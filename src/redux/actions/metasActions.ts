import { createAsyncThunk } from '@reduxjs/toolkit';
import { FechBasesProps } from '../../types/BasesProps';

const baseURL = import.meta.env.VITE_API_BASE_URL_METAS;

export const getBases = createAsyncThunk('get/bases', async (token, thunkAPI) => {
	// const token = localStorage.getItem('token');
	const response = await fetch(`${baseURL}/bases`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const errorData: FechBasesProps = await response.json();
		return thunkAPI.rejectWithValue(errorData);
	}
	const data: FechBasesProps = await response.json();
	return data.data;
});
