import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchBasesProps } from '@/types/BasesProps';
import { getBases as getBasesService } from '@/services/api/private/metas';

export const getBases = createAsyncThunk<
	FetchBasesProps, // Tipo de datos que la acción retornará
	void, // Tipo de argumento que la acción recibe (si no hay argumento, usa void)
	{ rejectValue: { error: string } } // Tipo de valor de rechazo
>('get/bases', async (_, thunkAPI) => {
	try {
		const data = await getBasesService();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		} else {
			return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
		}
	}
});
