import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { toHoursAndMinutes } from 'src/helper';
import { Button } from 'src/common/Button/Button';
import { TCourse } from 'src/shared.types';
import { useCourseById } from 'src/hooks';
import { useSelector } from 'react-redux';
import { getAuthors, getCourses } from 'src/store/selectors';

const buttonClass = 'course-info-button';
const buttonText = 'back';

const CourseInfo = () => {
	const courseId: string = useParams().courseId;
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);
	const courseInfo: TCourse = useCourseById(courseId, courses, authors);
	const nav = useNavigate();
	const onBackAction = () => {
		nav('/courses');
	};
	return (
		<div className='course-info'>
			<h3 className='course-info-title'>{courseInfo.title}</h3>
			<div className='course-info-block'>
				<div className='course-info-block-left'>
					<div className='course-info-block-left-title'>Description</div>
					<div className='course-info-block-left-descr'>
						{courseInfo.description}
					</div>
				</div>
				<div className='course-info-block-delimiter'></div>
				<div className='course-info-block-right'>
					<div className='course-info-block-right-names'>
						<div className='course-info-block-right-names-id'>ID:</div>
						<div className='course-info-block-right-names-duration'>
							Duration:
						</div>
						<div className='course-info-block-right-names-created'>
							Created:
						</div>
						<div className='course-info-block-right-names-authors'>
							Authors:
						</div>
					</div>
					<div className='course-info-block-right-values'>
						<div className='course-info-block-right-values-id'>
							{courseInfo.id}
						</div>
						<div className='course-info-block-right-values-duration'>
							{toHoursAndMinutes(courseInfo.duration)}
						</div>
						<div className='course-info-block-right-values-created'>
							{dayjs(new Date(courseInfo.creationDate)).format('MM.DD.YYYY')}
						</div>
						<div className='course-info-block-right-values-authors'>
							{courseInfo.authors.join(', ')}
						</div>
					</div>
				</div>
			</div>
			<Button
				className={buttonClass}
				text={buttonText}
				onClick={() => onBackAction()}
			/>
		</div>
	);
};

export { CourseInfo };
