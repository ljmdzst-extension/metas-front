import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";


interface Programa {
   idPrograma: number;
   nom: string;
   anio: number;
   listaAreas: Area[];
 }
 
 interface Area {
   idArea: number;
   nom: string;
   idPrograma: number;
   listaActividades: any[]; // Aquí podrías especificar el tipo adecuado para listaActividades si tienes más detalles
 }
 
 interface ApiResponse {
   ok: boolean;
   data: Programa[];
   error: null | any;
 }
 
 const allProgramas = createAsyncThunk<Programa[], void>(
   'allProgramas',
   async (_, { rejectWithValue }) => {
     try {
       const res = await axios.get<ApiResponse>("http://localhost:4000/metas/v2/programas/2023");
       return res.data.data;
     } catch (error) {
       return rejectWithValue("error");
     }
   }
 );
//  const allProgramas = createAsyncThunk ('allProgramas',async ()=>{ 
//     console.log("accion");
    
//     try {
//         const res = await axios.get (`http://localhost:4000/metas/v2/programas/2023`)
//          console.log(res.data);
//          return {
//             ListProgramas: res.data
//          }
//     } catch (error) {
//          console.log("error");
//     }

//  })

const programaAction = {allProgramas }
export default programaAction 