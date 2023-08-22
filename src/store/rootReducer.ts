import { combineReducers } from '@reduxjs/toolkit';

import { coursesReducer } from './course/reducer';
import { authorsReducer } from './author/reducer';

export const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
});
