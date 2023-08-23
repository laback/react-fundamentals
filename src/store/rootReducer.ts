import { asyncAuthorsReducer } from './author/reducer';
import { asyncCoursesReducer } from './course/reducer';
import { usersReducer } from './user/reducer';
import { combineReducers } from 'redux';

export const rootReducer = {
	courses: asyncCoursesReducer,
	authors: asyncAuthorsReducer,
	user: usersReducer,
};
