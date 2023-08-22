import { Course } from 'src/shared.types';
import { CoursesAction } from './actions';
import { CoursesActionTypes } from './types';

const initCoursesState = [] as Course[];

function coursesReducer(state = initCoursesState, action: CoursesAction) {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return action.payload;

		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];
		default:
			return state;
	}
}

export { initCoursesState, coursesReducer };
