import { CoursesActionTypes } from './types.js';
import { Course } from 'src/shared.types.js';

interface SaveCourses {
	type: CoursesActionTypes.SAVE_COURSES;
	payload: Course[];
}

interface AddCourse {
	type: CoursesActionTypes.ADD_COURSE;
	payload: Course;
}

interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
}

export type CoursesAction = SaveCourses | AddCourse | DeleteCourse;
