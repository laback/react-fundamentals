import React from 'react';
import { Button } from 'src/common/Button/Button';

const buttonText = 'add new course';
const buttonClass = 'empty-list-add-button';

const EmptyList = () => {
	return (
		<div className='empty-list'>
			<h3 className='empty-list-title'>your list is empty</h3>
			<div className='empty-list-descr'>
				Please use ’Add New Course’ button to add your first course
			</div>
			<Button text={buttonText} className={buttonClass} />
		</div>
	);
};

export { EmptyList };
