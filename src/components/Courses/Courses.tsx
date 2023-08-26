import React, { useEffect } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { EmptyList } from './components/EmptyList/EmptyList';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCourses,
	getAuthors,
	getIsAuthorsLoaded,
	getIsCoursesLoaded,
} from 'src/store/selectors';
import { useCourseById, useLoadFullData } from 'src/hooks';
import { TCourse } from 'src/shared.types';

const buttonText = 'add new course';
const buttonClass = 'add-button';

function getCoursesToDisplay(): TCourse[] {
	const authors = useSelector(getAuthors);
	const courses = useSelector(getCourses);
	return courses.map((course) => {
		return useCourseById(course.id, courses, authors);
	});
}

const Courses = () => {
	const dispatch = useDispatch<any>();

	const isCoursesLoaded = useSelector(getIsCoursesLoaded);
	const isAuthorsLoaded = useSelector(getIsAuthorsLoaded);
	useEffect(() => {
		useLoadFullData(dispatch, isCoursesLoaded, isAuthorsLoaded);
	}, []);
	const nav = useNavigate();
	const onAddCourseAction = () => {
		nav('/courses/add');
	};
	const body = [];
	getCoursesToDisplay().map((course) => {
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
