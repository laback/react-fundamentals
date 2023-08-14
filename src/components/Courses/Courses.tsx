import React from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'src/common/Button/Button';
import { SearchBar } from './components/SearchBar/SearchBar';

const mockedAddButton = {
	buttonText: 'add new course',
	buttonClass: 'add-button',
};

const Courses = (props) => {
	const body = [];
	props.courses.map((course) => {
		body.push(<CourseCard course={course} changeState={props.changeState} />);
	});

	return (
		<div className='courses'>
			<div className='courses-head'>
				<SearchBar />
				<Button button={mockedAddButton} />
			</div>
			{body}
		</div>
	);
};

export { Courses };
