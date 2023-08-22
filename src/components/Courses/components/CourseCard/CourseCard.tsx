import React from 'react';
import { Button } from 'src/common/Button/Button';
import dayjs from 'dayjs';
import { toHoursAndMinutes } from 'src/constants';
import { useNavigate } from 'react-router-dom';

const showButtonClass = 'show-button';
const showButtonText = 'show course';

const trashButtonClass = 'trash-button';

const editButtonClass = 'edit-button';

const CourseCard = ({ course }) => {
	const nav = useNavigate();
	const onShowCourseAction = () => {
		nav(course.id);
	};
	return (
		<div className='course-card'>
			<div className='course-card-left'>
				<div className='course-card-left-title'>{course.title}</div>
				<div className='course-card-left-descr'>{course.description}</div>
			</div>
			<div className='course-card-right'>
				<div className='course-card-right-info'>
					<div className='course-card-right-info-authors'>
						{course.authors.join(', ')}
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
						className={showButtonClass}
						onClick={() => onShowCourseAction()}
						text={showButtonText}
					/>
					<Button className={trashButtonClass} />
					<Button className={editButtonClass} />
				</div>
			</div>
		</div>
	);
};

export { CourseCard };
