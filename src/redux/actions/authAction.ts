import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = 'login';
export const loginAction = (user: string, token: string) => ({
	type: login,
	payload: { user, token },
});

export const loginAsync = createAsyncThunk(
	'auth/login',
	async (credentials: { user: string; password: string }) => {
		const response = await fetch('http://localhost:3001/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			const message = `An error has occured: ${response.status}`;
			throw new Error(message);
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
