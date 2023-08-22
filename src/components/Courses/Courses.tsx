import React, { useMemo, useContext } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';
import { SearchBar } from './components/SearchBar/SearchBar';
import { DataContext } from 'src/App';
import { Outlet, useNavigate } from 'react-router-dom';
import { EmptyList } from './components/EmptyList/EmptyList';

const buttonText = 'add new course';
const buttonClass = 'add-button';

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

export const useMappedCourses = () => {
	const { courses, authors } = useContext(DataContext);
	const mappedCourses = useMemo(() => {
		const mappedCourses = replaceAuthorsIds(courses, authors);
		return mappedCourses;
	}, [courses, authors]);
	return mappedCourses;
};

const Courses = () => {
	const nav = useNavigate();
	const onAddCourseAction = () => {
		nav('add');
	};
	const body = [];
	useMappedCourses().map((course) => {
		body.push(<CourseCard key={course.id} course={course} />);
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
