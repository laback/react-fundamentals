import { createAction } from '@reduxjs/toolkit';
import { TUser } from 'src/shared.types.js';

export const Login = createAction<TUser>('user/login');

export const Logout = createAction('user/logout');
