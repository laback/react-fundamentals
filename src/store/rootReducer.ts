import { authorsReducer } from './author/reducer';
import { coursesReducer } from './course/reducer';
import { usersReducer } from './user/reducer';

export const rootReducer = {
	courses: coursesReducer,
	authors: authorsReducer,
	user: usersReducer,
};
