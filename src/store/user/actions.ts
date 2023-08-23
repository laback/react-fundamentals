import { createAction } from '@reduxjs/toolkit';
import { User } from 'src/shared.types.js';

export const Login = createAction<User>('user/login');

export const Logout = createAction('user/logout');
