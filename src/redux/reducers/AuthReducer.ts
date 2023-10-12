import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAsync } from '../actions/authAction';
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
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.user = '';
			state.token = '';
			state.loading = false;
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginAsync.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginAsync.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.token = action.payload.token;
		});
		builder.addCase(loginAsync.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},	
});

export const { logout, loginFailed } = authSlice.actions;

export default authSlice.reducer;
