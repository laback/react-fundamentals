import React from 'react';
import { Button } from 'src/common/Button/Button';

const handleAddNewCourse = () => {
	alert('You are trying to add new course');
};

const mockedAddButton = {
	buttonText: 'add new course',
	onClick: handleAddNewCourse,
	buttonClass: 'empty-list-add-button',
};

const EmptyList = () => {
	return (
		<div className='empty-list'>
			<h3 className='empty-list-title'>your list is empty</h3>
			<div className='empty-list-descr'>
				Please use ’Add New Course’ button to add your first course
			</div>
			<Button button={mockedAddButton} />
		</div>
	);
};

export { EmptyList };
