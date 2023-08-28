import { TAuthor, TCourse, TUser, TServerReturn } from 'src/shared.types';

async function doPost(params: {
	url: string;
	payload: object;
}): Promise<TServerReturn> {
	const { url, payload } = params;
	const token = localStorage.getItem('token');
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

async function doGet(params: { url: string }): Promise<TServerReturn> {
	const { url } = params;
	const token = localStorage.getItem('token');
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

async function doDelete(params: { url: string }): Promise<void> {
	const { url } = params;
	const token = localStorage.getItem('token');
	await fetch(url, {
		method: 'Delete',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
}

async function doPut(params: {
	url: string;
	payload: object;
}): Promise<TServerReturn> {
	const token = localStorage.getItem('token');
	const { url, payload } = params;
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

export async function logoutUser(): Promise<void> {
	await doDelete({
		url: 'http://localhost:4000/logout',
	});
}

export async function getUser(): Promise<TUser> {
	const { result } = await doGet({
		url: 'http://localhost:4000/users/me',
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

export async function createCourse(course: TCourse): Promise<TCourse> {
	const { result } = await doPost({
		url: 'http://localhost:4000/courses/add',
		payload: course,
	});
	console.log(result);
	return result as TCourse;
}

export async function deleteCourse(courseId: string): Promise<string> {
	await doDelete({
		url: 'http://localhost:4000/courses/' + courseId,
	});
	return courseId;
}

export async function updateCourse(course: TCourse): Promise<TCourse> {
	const { result } = await doPut({
		url: 'http://localhost:4000/courses/' + course.id,
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

export async function createAuthor(author: TAuthor): Promise<TAuthor> {
	const { result } = await doPost({
		url: 'http://localhost:4000/authors/add',
		payload: author,
	});
	return result as TAuthor;
}
