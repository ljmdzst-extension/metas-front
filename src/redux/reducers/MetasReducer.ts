import { createSlice } from '@reduxjs/toolkit';
import { BasesDataProps } from '../../types/AppProps';
import { getBases } from '../actions/metasActions';

interface metasState {
	bases: BasesDataProps | undefined;
	loading: boolean;
	error: string | null | undefined;
}

const initialState: metasState = {
	bases: undefined,
	loading: false,
	error: null,
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
			state.bases = action.payload;
		});
		builder.addCase(getBases.rejected, (state, action) => {
			state.loading = false;
			state.error = (action.payload as { error: string }).error;
		});
	},
});

export default metasSlice.reducer;
