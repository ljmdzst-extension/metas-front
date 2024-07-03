import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, RegisterProps, UserData } from '@/types/AuthProps';
import { authUser, loginUser, registerUser } from '@/services';

interface loginProps {
	email: string;
	pass: string;
}

export const loginAsync = createAsyncThunk<
	UserData,
	loginProps,
	{ rejectValue: { error: string } }
>('auth/login', async (values, thunkAPI) => {
	try {
		const response = await loginUser(values.email, values.pass);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		} else {
			return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
		}
	}
});

export const authAsync = createAsyncThunk<AuthData, void, { rejectValue: { error: string } }>(
	'auth/auth',
	async (_, thunkAPI) => {
		try {
			const response = await authUser();
			return response.data;
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue({ error: error.message });
			} else {
				return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
			}
		}
	},
);

export const registerAsync = createAsyncThunk<
	UserData,
	RegisterProps,
	{ rejectValue: { error: string } }
>('auth/register', async (values, thunkAPI) => {
	try {
		const response = await registerUser(values);
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			return thunkAPI.rejectWithValue({ error: error.message });
		} else {
			return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
		}
	}
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
