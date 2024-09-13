import { createSlice } from '@reduxjs/toolkit';
import { BasesDataProps } from '@/types/BasesProps';
import { getBases } from '../actions/metasActions';

interface MetasState {
  bases: BasesDataProps;
  loading: boolean;
  error: string | undefined;
  isBasesLoaded: boolean;  
}

const initialState: MetasState = {
  bases: {} as BasesDataProps,  
  loading: false,
  error: undefined,
  isBasesLoaded: false,  
};

const metasSlice = createSlice({
  name: 'metas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Manejo del pending state
    builder.addCase(getBases.pending, (state) => {
      state.loading = true;
      state.error = undefined;  
    });
    
    // Manejo cuando la promesa es resuelta
    builder.addCase(getBases.fulfilled, (state, action) => {
      state.loading = false;
      state.bases = action.payload.data;
      state.isBasesLoaded = true;  
    });
    
    // Manejo de errores
    builder.addCase(getBases.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || 'Error fetching bases';  
      state.isBasesLoaded = false;  
    });
  },
});

export default metasSlice.reducer;
