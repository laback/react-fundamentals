import { TAuthor, TCourse } from './shared.types';

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
