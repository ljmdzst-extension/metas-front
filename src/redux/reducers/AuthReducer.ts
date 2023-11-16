import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAsync, loginAsync, registerAsync } from '../actions/authAction';
interface AuthState {
	user: string;
	token: string;
	loading: boolean;
	error: string | null | undefined;
	isLogged: boolean;
}

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const initialState: AuthState = {
	user: user ?? '',
	token: token ?? '',
	loading: false,
	error: null,
	isLogged: !!token,
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
			console.log('usuario deslogueado');
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		// LOGIN
		builder.addCase(loginAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginAsync.fulfilled, (state, action) => {
			console.log(action.payload);
			state.loading = false;
			state.isLogged = true;
			state.user = action.payload.nom + ' ' + action.payload.ape;
			state.token = action.payload.token;
		});
		builder.addCase(loginAsync.rejected, (state, action) => {
			console.log(action.payload);
			state.loading = false;
			state.error = (action.payload as { error: string }).error;
		});

		// AUTH
		builder.addCase(authAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(authAsync.fulfilled, (state, action) => {
			state.loading = false;
			state.token = action.payload.token;
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
