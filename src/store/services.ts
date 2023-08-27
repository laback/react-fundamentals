import { TAuthor, TCourse, TUser, TServerReturn } from 'src/shared.types';

async function doPost(params: {
	url: string;
	payload: object;
	token?: string;
}): Promise<TServerReturn> {
	const { url, payload, token } = params;
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
	const json = await response.json();
	const a = 1;
	return (await response.json()) as TServerReturn;
}

async function doGet(params: {
	url: string;
	token?: string;
}): Promise<TServerReturn> {
	const { url, token } = params;
	let headers = {};
	if (token) {
		headers = {
			Authorization: token,
			'Content-Type': 'application/json',
		};
	} else {
		headers = {
			'Content-Type': 'application/json',
		};
	}
	const response = await fetch(url, {
		headers: headers,
	});
	return (await response.json()) as TServerReturn;
}

async function doDelete(params: {
	url: string;
	token?: string;
}): Promise<TServerReturn> {
	const { url, token } = params;
	const response = await fetch(url, {
		method: 'Delete',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
	return (await response.json()) as TServerReturn;
}

async function doPut(params: {
	url: string;
	token?: string;
	payload: object;
}): Promise<TServerReturn> {
	const { url, token, payload } = params;
	const response = await fetch(url, {
		method: 'Put',
		body: JSON.stringify(payload),
		headers: {
			Authorization: token,
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
		if (errors) {
			return errors;
		} else {
			return [result];
		}
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

export async function logoutUser(token: string): Promise<void> {
	await doDelete({
		token: token,
		url: 'http://localhost:4000/logout',
	});
}

export async function getUser(token: string): Promise<TUser> {
	const { result } = await doGet({
		url: 'http://localhost:4000/users/me',
		token: token,
	});

	return result as TUser;
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

export async function createCourse(params: {
	course: TCourse;
	token: string;
}): Promise<TCourse> {
	const { token, course } = params;
	const { result } = await doPost({
		url: 'http://localhost:4000/courses/add',
		payload: course,
		token: token,
	});
	console.log(result);
	return result as TCourse;
}

export async function deleteCourse(params: {
	courseId: string;
	token: string;
}): Promise<string> {
	const { token, courseId } = params;
	await doDelete({
		url: 'http://localhost:4000/courses/' + courseId,
		token: token,
	});
	return courseId;
}

export async function updateCourse(params: {
	course: TCourse;
	token: string;
}): Promise<TCourse> {
	const { token, course } = params;
	const { result } = await doPut({
		url: 'http://localhost:4000/courses/' + course.id,
		token: token,
		payload: course,
	});
	return result as TCourse;
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

export async function createAuthor(params: {
	author: TAuthor;
	token: string;
}): Promise<TAuthor> {
	const { token, author } = params;
	const { result } = await doPost({
		url: 'http://localhost:4000/authors/add',
		payload: author,
		token: token,
	});
	return result as TAuthor;
}
