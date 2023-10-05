import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = 'login';
export const loginAction = (user: string, token: string) => ({
	type: login,
	payload: { user, token },
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
