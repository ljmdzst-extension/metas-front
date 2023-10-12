import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAsync = createAsyncThunk(
	'auth/login',
	async (credentials: { email: string; pass: string }, thunkAPI) => {
		const response = await fetch(`http://168.197.50.94:4004/api/gestor/usr/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			return thunkAPI.rejectWithValue(message);
		}

		const data = await response.json();
		return data;
	},
);

export const logout = 'logout';
export const logoutAction = () => ({
	type: logout,
});

export const loginFailed = 'loginFailed';
export const loginFailedAction = (error: string) => ({
	type: loginFailed,
	payload: error,
});
