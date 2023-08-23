import React from 'react';
import { Button } from 'src/common/Button/Button';
import dayjs from 'dayjs';
import { toHoursAndMinutes } from 'src/helper';
import { useNavigate } from 'react-router-dom';
import { Author, Course } from 'src/shared.types';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAuthors,
	getCourses,
	getIsAuthorsLoadingStarted,
	getIsCoursesLoadingStarted,
} from 'src/store/selectors';
import { DeleteCourse, GetCourses } from 'src/store/course/actions';
import { GetAuthors } from 'src/store/author/actions';

const showButtonClass = 'show-button';
const showButtonText = 'show course';

const trashButtonClass = 'trash-button';

const editButtonClass = 'edit-button';

const CourseCard = ({ courseId }) => {
	const dispatch = useDispatch<any>();
	let course: Course = useSelector(getCourses).find((c) => c.id === courseId);
	const authors: string[] = useSelector(getAuthors)
		.filter((author) => course.authors.includes(author.id))
		.map((author) => author.name);
	course = { ...course, authors: authors };
	const nav = useNavigate();
	const onShowCourseAction = () => {
		nav(course.id);
	};
	const onDeleteCourseAction = () => {
		dispatch(DeleteCourse(courseId));
	};
	if (course != undefined) {
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
