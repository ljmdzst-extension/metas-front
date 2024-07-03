import { createSlice } from '@reduxjs/toolkit';
import { BasesDataProps } from '@/types/BasesProps';
import { getBases } from '../actions/metasActions';

interface metasState {
	bases: BasesDataProps;
	loading: boolean;
	error: string | undefined;
}

const initialState: metasState = {
	bases: undefined,
	loading: false,
	error: undefined,
};

const metasSlice = createSlice({
	name: 'metas',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getBases.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getBases.fulfilled, (state, action) => {
			state.loading = false;
			state.bases = action.payload.data;
		});
		builder.addCase(getBases.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload?.error;
		});
	},
});

export default metasSlice.reducer;
