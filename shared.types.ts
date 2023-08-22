export type LoggedInUserContextType = {
	loggedInUser: AuthUser;
	setLoggedInUser: (AuthUser) => void;
};

type AuthorArray = Author[];
type CourseArray = Course[];

export type DataContextType = {
	authors: Author[];
	courses: Course[];
	setAuthors: (AuthorArray) => void;
	setCourses: (CourseArray) => void;
};

export type Author = {
	id: string;
	name: string;
};

export type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type AuthUser = {
	token: string;
	email: string;
	name: string;
};
