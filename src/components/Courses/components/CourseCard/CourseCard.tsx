import React from 'react';
import { Button } from 'src/common/Button/Button';
import dayjs from 'dayjs';
import { toHoursAndMinutes } from 'src/helper';
import { useNavigate } from 'react-router-dom';
import { TCourse } from 'src/shared.types';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCourse } from 'src/store/course/actions';
import { useCourseById } from 'src/hooks';
import { getCourses, getAuthors } from 'src/store/selectors';

const showButtonClass = 'show-button';
const showButtonText = 'show course';

const trashButtonClass = 'trash-button';

const editButtonClass = 'edit-button';

const CourseCard = ({ courseId }) => {
	const dispatch = useDispatch<any>();

	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const course: TCourse = useCourseById(courseId, courses, authors);
	const nav = useNavigate();
	const onShowCourseAction = () => {
		nav(course.id);
	};
	const onDeleteCourseAction = () => {
		dispatch(DeleteCourse(courseId));
	};
	if (course) {
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
						<Button
							className={trashButtonClass}
							onClick={() => onDeleteCourseAction()}
						/>
						<Button className={editButtonClass} />
					</div>
				</div>
			</div>
		);
	}
};

export { CourseCard };
