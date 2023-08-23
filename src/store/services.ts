import { Author, Course, User } from 'src/shared.types';

export async function loginUser(user): Promise<User | string[]> {
	const response = await fetch('http://localhost:4000/login', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	if (result.successful) {
		console.log(result);
		const token = result.result;
		const user: User = {
			isAuth: true,
			token: token,
			email: result.user.email,
			name: result.user.name,
		};
		return user;
	} else {
		console.log(result);
		return result.errors.join('\n');
	}
}

export async function registerUser(user): Promise<void | string> {
	const response = await fetch('http://localhost:4000/register', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	console.log(result);
	if (!result.successful) {
		return result.errors.join('\n');
	}
}

export async function getCourses(): Promise<Course[]> {
	const response = await fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	const courses = result.result.map((course) => {
		return course as Course;
	});
	return courses;
}

export async function getAuthors(): Promise<Author[]> {
	const response = await fetch('http://localhost:4000/authors/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	const authors = result.result.map((author) => {
		return author as Author;
	});
	return authors;
}
