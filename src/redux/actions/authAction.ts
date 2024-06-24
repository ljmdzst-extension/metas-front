import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, LoginResponse, RegisterProps } from '@/types/AuthProps';

export const loginAsync = createAsyncThunk(
	'auth/login',
	async (credentials: { email: string; pass: string }, thunkAPI) => {
		const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_AUTH}/login`, {
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

export const authAsync = createAsyncThunk<AuthResponse, string>(
  'auth/auth',
  async (token: string, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_AUTH}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: LoginResponse = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        // Manejar otros tipos de errores
        return thunkAPI.rejectWithValue('Ocurrió un error desconocido');
      }
    }
  },
);

export const registerAsync = createAsyncThunk(
	'auth/register',
	async (values: RegisterProps, thunkAPI) => {
		const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_AUTH}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		});

		if (!response.ok) {
			const errorData: LoginResponse = await response.json();
			return thunkAPI.rejectWithValue(errorData);
		}

		const data: LoginResponse = await response.json();
		return data.data;
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
