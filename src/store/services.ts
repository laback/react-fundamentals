import { TAuthor, TCourse, TUser, TServerReturn } from 'src/shared.types';

async function doPost(params: {
	url: string;
	payload: object;
}): Promise<TServerReturn> {
	const { url, payload } = params;
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return (await response.json()) as TServerReturn;
}

async function doGet(params: { url: string }): Promise<TServerReturn> {
	const { url } = params;
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return (await response.json()) as TServerReturn;
}

export async function loginUser(userData): Promise<TUser | string[]> {
	const { successful, user, result, errors } = await doPost({
		url: 'http://localhost:4000/login',
		payload: userData,
	});

	if (successful) {
		const loggedInUser: TUser = {
			isAuth: true,
			token: result,
			email: user.email,
			name: user.name,
		};
		return loggedInUser;
	} else {
		return errors;
	}
}

export async function registerUser(user): Promise<void | string[]> {
	const { successful, errors } = await doPost({
		url: 'http://localhost:4000/register',
		payload: user,
	});

	if (!successful) {
		return errors;
	}
}

export async function getCourses(): Promise<TCourse[]> {
	const { result } = await doGet({
		url: 'http://localhost:4000/courses/all',
	});

	const courses = result.map((course) => {
		return course as TCourse;
	});
	return courses;
}

export async function getAuthors(): Promise<TAuthor[]> {
	const { result } = await doGet({
		url: 'http://localhost:4000/authors/all',
	});

	const authors = result.map((author) => {
		return author as TAuthor;
	});
	return authors;
}
