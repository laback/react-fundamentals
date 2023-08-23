import React, { useEffect, useMemo } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { EmptyList } from './components/EmptyList/EmptyList';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCourses,
	getAuthors,
	getIsCoursesLoadingStarted,
	getIsAuthorsLoadingStarted,
} from 'src/store/selectors';
import { GetCourses } from 'src/store/course/actions';
import { GetAuthors } from 'src/store/author/actions';

const buttonText = 'add new course';
const buttonClass = 'add-button';

function replaceAuthorsIds(courses, authors) {
	if (courses.length == 0 || authors.length == 0) {
		return [];
	}
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

export const useMappedCourses = () => {
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const mappedCourses = useMemo(() => {
		const mappedCourses = replaceAuthorsIds(courses, authors);
		return mappedCourses;
	}, [courses, authors]);
	return mappedCourses;
	// const isCoursesLoaded = useSelector(getIsCoursesLoaded);
	// const isAuthorsLoaded = useSelector(getIsAuthorsLoaded);
	// if (isAuthorsLoaded && isCoursesLoaded) {

	// }
	// return [];
};

const Courses = () => {
	const dispatch = useDispatch<any>();

	const isCoursesLoadingStarted = useSelector(getIsCoursesLoadingStarted);
	const isAuthorsLoadingStarted = useSelector(getIsAuthorsLoadingStarted);
	if (!isCoursesLoadingStarted) {
		dispatch(GetCourses());
	}
	if (!isAuthorsLoadingStarted) {
		dispatch(GetAuthors());
	}
	const nav = useNavigate();
	const onAddCourseAction = () => {
		nav('add');
	};
	const body = [];
	useMappedCourses().map((course) => {
		body.push(<CourseCard key={course.id} courseId={course.id} />);
	});

	return (
		<>
			<div className='courses'>
				{body.length > 0 ? (
					<>
						<div className='courses-head'>
							<SearchBar />
							<Button
								text={buttonText}
								onClick={onAddCourseAction}
								className={buttonClass}
							/>
						</div>
						{body}
					</>
				) : (
					<EmptyList />
				)}
			</div>
		</>
	);
};

export default Courses;
