import { asyncAuthorsReducer } from './author/reducer';
import { asyncCoursesReducer } from './course/reducer';
import { usersReducer } from './user/reducer';

export const rootReducer = {
	courses: asyncCoursesReducer,
	authors: asyncAuthorsReducer,
	user: usersReducer,
};
