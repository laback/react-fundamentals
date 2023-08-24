import { TAuthor, TCourse } from './shared.types';
import { GetCourses } from './store/course/actions';
import { GetAuthors } from './store/author/actions';

export const useCourseById = (
	courseId: string,
	courses: TCourse[],
	authors: TAuthor[]
): TCourse => {
	let course: TCourse = courses.find((c) => c.id === courseId);
	const authorsNames: string[] = authors
		.filter((author) => course.authors.includes(author.id))
		.map((author) => author.name);
	course = { ...course, authors: authorsNames };
	return course;
};

export const useLoadFullData = (
	dispatch,
	isCoursesLoaded: boolean,
	isCoursesLoading: boolean,
	isAuthorsLoaded: boolean,
	isAuthorsLoading: boolean
): void => {
	useLoadCourses(dispatch, isCoursesLoaded, isCoursesLoading);
	useLoadAuthors(dispatch, isAuthorsLoaded, isAuthorsLoading);
};

export const useLoadAuthors = (
	dispatch,
	isLoaded: boolean,
	isLoading: boolean
): void => {
	if (!isLoaded && !isLoading) {
		dispatch(GetAuthors());
	}
};

export const useLoadCourses = (
	dispatch,
	isLoaded: boolean,
	isLoading: boolean
): void => {
	if (!isLoaded && !isLoading) {
		dispatch(GetCourses());
	}
};
