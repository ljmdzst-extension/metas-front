import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAsync, loginAsync, registerAsync } from '../actions/authAction';
interface AuthState {
	user: string;
	token: string;
	loading: boolean;
	permisos: string[];
	error: string | null | undefined;
	isLogged: boolean;
	puedeEditar: boolean;
}

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const permisos = localStorage.getItem('permisos');
const initialState: AuthState = {
	user: user ?? '',
	token: token ?? '',
	permisos: permisos ? JSON.parse(permisos) : [],
	loading: false,
	error: null,
	isLogged: !!token && !!user,
	puedeEditar: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = null;
			state.isLogged = false;
			state.permisos = [];
			console.log('usuario deslogueado');
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = action.payload;
			state.isLogged = false;
			state.permisos = [];
		},
	},
	extraReducers: (builder) => {
		// LOGIN
		builder.addCase(loginAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginAsync.fulfilled, (state, action) => {
			// console.log(action.payload);
			state.loading = false;
			state.isLogged = true;
			state.user = action.payload.nom + ' ' + action.payload.ape;
			state.token = action.payload.token;
			state.permisos = action.payload.permisos;
			state.puedeEditar = state.permisos.includes('METAS_EDICION');
		});
		builder.addCase(loginAsync.rejected, (state, action) => {
			// console.log(action.payload);
			state.loading = false;
			state.error = (action.payload as { error: string }).error;
		});

		// AUTH
		builder.addCase(authAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(authAsync.fulfilled, (state, action) => {
			state.loading = false;
			state.token = action.payload.data.token;
		});
		builder.addCase(authAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = (action.payload as { error: string }).error;
		});

		// REGISTER
		builder.addCase(registerAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(registerAsync.fulfilled, (state, action) => {
			state.loading = false;
			state.token = action.payload.token;
		});
		builder.addCase(registerAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const { logout, loginFailed } = authSlice.actions;

export default authSlice.reducer;
