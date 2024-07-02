// actions/metasActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchBasesProps } from '@/types/BasesProps';

const baseURL = import.meta.env.VITE_API_BASE_URL_METAS;

export const getBases = createAsyncThunk<
	FetchBasesProps, // Tipo de datos que la acción retornará
	{ token: string }, // Tipo de argumento que la acción recibe
	{ rejectValue: FetchBasesProps | { error: string } } // Tipo de valor de rechazo
>('get/bases', async (credential, thunkAPI) => {
	try {
		const response = await fetch(`${baseURL}/bases`, {
			headers: {
				Authorization: `Bearer ${credential.token}`,
			},
		});

		if (!response.ok) {
			const errorData: FetchBasesProps = await response.json();
			throw errorData;
		}

		const data: FetchBasesProps = await response.json();
		return data;
	} catch (error) {
		if (error) {
			return thunkAPI.rejectWithValue(error as FetchBasesProps);
		} else {
			return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
		}
	}
});
