import React from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';
import { SearchBar } from './components/SearchBar/SearchBar';

const buttonText = 'add new course';
const buttonClass = 'add-button';

const Courses = ({ courses, onShowCourseAction }) => {
	const body = [];
	courses.map((course) => {
		body.push(
			<CourseCard
				key={course.id}
				course={course}
				onShowCourseAction={onShowCourseAction}
			/>
		);
	});

	return (
		<div className='courses'>
			<div className='courses-head'>
				<SearchBar />
				<Button text={buttonText} className={buttonClass} />
			</div>
			{body}
		</div>
	);
};

export { Courses };
