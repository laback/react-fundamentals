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

export type User = {
	isAuth: boolean;
	token: string;
	email: string;
	name: string;
};
