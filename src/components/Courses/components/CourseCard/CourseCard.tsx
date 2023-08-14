import React from 'react';
import { Button } from 'src/common/Button/Button';
import dayjs from 'dayjs';
import { toHoursAndMinutes } from 'src/constants';

const mockedShowButton = {
	buttonClass: 'show-button',
	buttonText: 'Show Course',
};

const mockedTrashButton = {
	buttonClass: 'trash-button',
};

const mockedEditButton = {
	buttonClass: 'edit-button',
};

const CourseCard = (props) => {
	const course = props.course;
	return (
		<div className='course-card'>
			<div className='course-card-left'>
				<div className='course-card-left-title'>{course.title}</div>
				<div className='course-card-left-descr'>{course.description}</div>
			</div>
			<div className='course-card-right'>
				<div className='course-card-right-info'>
					<div className='course-card-right-info-authors'>
						{course.authors
							.map((author) => {
								return author.name;
							})
							.join(', ')}
					</div>
					<div className='course-card-right-info-duration'>
						{toHoursAndMinutes(course.duration)}
					</div>
					<div className='course-card-right-info-created'>
						{dayjs(new Date(course.creationDate)).format('MM.DD.YYYY')}
					</div>
				</div>
				<div className='course-card-right-buttons'>
					<Button
						button={mockedShowButton}
						onClick={() => props.changeState(course)}
					/>
					<Button button={mockedTrashButton} />
					<Button button={mockedEditButton} />
				</div>
			</div>
		</div>
	);
};

export { CourseCard };
