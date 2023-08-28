import { GetAuthors } from './store/author/actions';
import { GetCourses } from './store/course/actions';

export function toHoursAndMinutes(totalMinutes) {
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);

	return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

export function formatCreationDate(creationDate: string) {
	const splittedDate = creationDate.split('/');
	return splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2];
}

export const loadFullData = (
	dispatch,
	isCoursesLoaded: boolean,
	isAuthorsLoaded: boolean
): void => {
	loadCourses(dispatch, isCoursesLoaded);
	loadAuthors(dispatch, isAuthorsLoaded);
};

export const loadAuthors = (dispatch, isLoaded: boolean): void => {
	if (!isLoaded) {
		dispatch(GetAuthors());
	}
};

export const loadCourses = (dispatch, isLoaded: boolean): void => {
	if (!isLoaded) {
		dispatch(GetCourses());
	}
};
