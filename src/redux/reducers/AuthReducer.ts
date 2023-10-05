import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	user: string;
	token: string;
	loading: boolean;
	error: string | null;
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
		login(state, action: PayloadAction<{ user: string; token: string }>) {
			console.log(`User ${action.payload.user} logged in`);
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.loading = false;
			state.error = null;
		},
		logout(state) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = null;
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { login, logout, loginFailed } = authSlice.actions;

export default authSlice.reducer;
