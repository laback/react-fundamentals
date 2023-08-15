import React, { useState, useMemo } from 'react';
import { Courses } from '../Courses/Courses';
import { EmptyList } from '../Courses/components/EmptyList/EmptyList';
import { CourseInfo } from '../CourseInfo/CourseInfo';

function replaceAuthorsIds(courses, authors) {
	return courses.map((course) => {
		const courseAuthors = course.authors.map((courseAuthorId) => {
			function findAuthor(author) {
				return author.id == courseAuthorId;
			}

			return authors.find(findAuthor).name;
		});
		const mappedCourse = {
			...course,
			authors: courseAuthors,
		};
		return mappedCourse;
	});
}

function getCourseById(courses, courseId) {
	for (const course of courses) {
		if (course.id === courseId) {
			return course;
		}
	}
}

const Container = ({ courses, authors }) => {
	const mappedCourses = useMemo(
		() => replaceAuthorsIds(courses, authors),
		[courses, authors]
	);

	const [courseId, setCourseId] = useState();

	const handleShowCourseAction = (courseId) => {
		setCourseId(courseId);
	};

	const handleBackToCoursesAction = () => {
		setCourseId(undefined);
	};

	if (courseId != undefined) {
		const course = getCourseById(mappedCourses, courseId);
		console.log(course);
		return (
			<div className='container'>
				<CourseInfo
					courseInfo={course}
					onBackToCoursesAction={handleBackToCoursesAction}
				/>
			</div>
		);
	} else {
		const isEmpty = mappedCourses.length == 0;

		return (
			<div className='container'>
				{isEmpty ? (
					<EmptyList />
				) : (
					<Courses
						courses={mappedCourses}
						onShowCourseAction={handleShowCourseAction}
					/>
				)}
			</div>
		);
	}
};

export { Container };
