export type TAuthor = {
	id?: string;
	name: string;
};

export type TCourse = {
	id?: string;
	title: string;
	description: string;
	creationDate?: string;
	duration: number;
	authors: string[];
};

export type TUser = {
	isAuth: boolean;
	token: string;
	email: string;
	name: string;
	role?: string;
};

export type TServerReturn = {
	successful: boolean;
	result: any;
	errors: string[];
	user?: {
		email: string;
		name: string;
		role?: string;
	};
};
