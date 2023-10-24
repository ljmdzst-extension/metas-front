import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAsync, loginAsync, registerAsync } from '../actions/authAction';
interface AuthState {
	user: string;
	token: string;
	loading: boolean;
	error: string | null | undefined;
}

const initialState: AuthState = {
	user: '',
	token: '',
	loading: false,
	error: null,
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
			console.log('usuario deslogueado');
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = action.payload;
		},
		setUserData(state, action: PayloadAction<{ user: string; token: string }>) {
			state.user = action.payload.user;
			state.token = action.payload.token;
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

export const { logout, loginFailed, setUserData } = authSlice.actions;

export default authSlice.reducer;
