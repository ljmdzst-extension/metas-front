import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
interface Area {
    idArea: number;
    nom: string;
    idPrograma: number;
    listaActividades: any[];
  }
  
  interface Programa {
    idPrograma: number;
    nom: string;
    anio: number;
    listaAreas: Area[];
  }
  interface AppState {
    ListProgramas: Programa[];
  }
  const initialState: AppState = {
    ListProgramas: []
  }
  
export const allProgramas = createAsyncThunk(
  "allProgramas",
  async () => {
    try {
      const response = await fetch("http://localhost:4000/metas/v2/programas/2023");
      const data = await response.json();   
      return data.data;
    } catch (error) {
      return (error);   
    }
  }
);
export const programaReducer = createSlice({
    name: 'programaReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(allProgramas.fulfilled, (state, action) => {
          state.ListProgramas = action.payload;
        })
    },
  });
  export default programaReducer.reducer;