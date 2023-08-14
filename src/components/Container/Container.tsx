import React, { useState } from 'react';
import { Courses } from '../Courses/Courses';
import { EmptyList } from '../Courses/components/EmptyList/EmptyList';
import { CourseInfo } from '../CourseInfo/CourseInfo';

function replaceAuthorsIds(courses, authors) {
	return courses.map((course) => {
		if (typeof course.authors[0] !== 'object') {
			const courseAuthors = course.authors.map((courseAuthorId) => {
				function findAuthor(author) {
					return author.id === courseAuthorId;
				}

				return authors.find(findAuthor);
			});
			course.authors = courseAuthors;
			return course;
		}
		return course;
	});
}

const Container = (props) => {
	const courses = replaceAuthorsIds(props.courses, props.authors);
	const [showCourse, setShowCourse] = useState(false);
	const [courseInfo, setCourseInfo] = useState();

	const showCourseAction = (courseInfo) => {
		setShowCourse(true);
		setCourseInfo(courseInfo);
	};
	const showCoursesAction = () => {
		setShowCourse(false);
	};
	if (showCourse) {
		return (
			<div className='container'>
				<CourseInfo courseInfo={courseInfo} backAction={showCoursesAction} />
			</div>
		);
	} else {
		const isEmpty = courses.length == 0;

		return (
			<div className='container'>
				{isEmpty ? (
					<EmptyList />
				) : (
					<Courses courses={courses} changeState={showCourseAction} />
				)}
			</div>
		);
	}
};

export { Container };
