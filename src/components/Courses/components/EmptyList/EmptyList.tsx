import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInContext } from 'src/App';
import { Button } from 'src/common/Button/Button';

const buttonText = 'add new course';
const buttonClass = 'empty-list-add-button';

const EmptyList = () => {
	const loggedInUser = useContext(LoggedInContext).loggedInUser;
	console.log(loggedInUser);
	const nav = useNavigate();
	const onAddAction = () => {
		nav('add');
	};
	return (
		<div className='empty-list'>
			<h3 className='empty-list-title'>your list is empty</h3>
			<div className='empty-list-descr'>
				Please use ’Add New Course’ button to add your first course
			</div>
			{loggedInUser.email == 'admin@email.com' ? (
				<Button
					text={buttonText}
					className={buttonClass}
					onClick={onAddAction}
				/>
			) : (
				<div className='empty-list-descr'>
					You don't have permissions to create a course. Please log in as ADMIN
				</div>
			)}
		</div>
	);
};

export { EmptyList };
