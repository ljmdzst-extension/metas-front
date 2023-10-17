import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/AuthProps';

export const loginAsync = createAsyncThunk(
	'auth/login',
	async (credentials: { email: string; pass: string }, thunkAPI) => {
		const response = await fetch(`http://168.197.50.94:4006/api/v2/usr/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			const errorData: LoginResponse = await response.json();
			return thunkAPI.rejectWithValue(errorData);
		}

		const data: LoginResponse = await response.json();
		return data.data;
	},
);

export const authAsync = createAsyncThunk('auth/auth', async (token: string, thunkAPI) => {
	const response = await fetch(`http://168.197.50.94:4006/api/v2/usr/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		const errorData: LoginResponse = await response.json();
		console.log(errorData);
		return thunkAPI.rejectWithValue(errorData);
	}

	const data: LoginResponse = await response.json();
	return data.data;
});

export const logout = 'logout';
export const logoutAction = () => ({
	type: logout,
});

export const loginFailed = 'loginFailed';
export const loginFailedAction = (error: string) => ({
	type: loginFailed,
	payload: error,
});
