// actions/metasActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FechBasesProps } from '@/types/BasesProps';

const baseURL = import.meta.env.VITE_API_BASE_URL_METAS;

export const getBases = createAsyncThunk<
	FechBasesProps, // Tipo de datos que la acción retornará
	{ token: string }, // Tipo de argumento que la acción recibe
	{ rejectValue: FechBasesProps | { error: string } } // Tipo de valor de rechazo
>('get/bases', async (credential, thunkAPI) => {
	try {
		const response = await fetch(`${baseURL}/bases`, {
			headers: {
				Authorization: `Bearer ${credential.token}`,
			},
		});

		if (!response.ok) {
			const errorData: FechBasesProps = await response.json();
			throw errorData;
		}

		const data: FechBasesProps = await response.json();
		return data;
	} catch (error) {
		if (error) {
			return thunkAPI.rejectWithValue(error as FechBasesProps);
		} else {
			return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
		}
	}
});
