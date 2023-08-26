import React, { useEffect, useState } from 'react';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Textarea } from 'src/common/Textarea/Textarea';
import { toHoursAndMinutes } from 'src/helper';
import { useForm } from 'react-hook-form';
import { Button } from 'src/common/Button/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthorInputs } from './AuthorInputs/AuthorInputs';
import { TCourse, TUser } from 'src/shared.types';
import { useDispatch, useSelector } from 'react-redux';
import {
	CreateCourse as CreateCourseAction,
	UpdateCourse,
} from 'src/store/course/actions';
import { getAuthors, getCourses, getLoggedInUser } from 'src/store/selectors';

const labelClass = 'edit-create-course-form-label';

const textareaClass = 'edit-create-course-form-textarea';

const inputClass = 'edit-create-course-form-input';
const placeholder = 'Input text';

const CourseForm = () => {
	const location = useLocation();

	const courseId: string = useParams().courseId;

	const authors = useSelector(getAuthors);
	let course = useSelector(getCourses).find((course) => course.id === courseId);
	if (!course) {
		course = {
			duration: 0,
			description: '',
			title: '',
			authors: [],
		};
	}
	const dispatch = useDispatch<any>();
	const nav = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const durationInput = register('durationInput', {
		value: course.duration,
		required: 'Duration is required',
		min: {
			value: 1,
			message: 'Duration must me more than 0',
		},
	});
	const hoursWatch = watch(durationInput.name, course.duration);
	const [hours, setHours] = useState(toHoursAndMinutes(course.duration));
	useEffect(() => {
		setHours(toHoursAndMinutes(hoursWatch));
	}, [hoursWatch]);

	const titleInput = register('titleInput', {
		value: course.title,
		required: 'Title is required',
		minLength: {
			value: 2,
			message: 'Title should contains at list 2 characters',
		},
	});
	const descriptionInput = register('descriptionInput', {
		value: course.description,
		required: 'Description is required',
		minLength: {
			value: 2,
			message: 'Description should contains at list 2 characters',
		},
	});

	const [addedAuthors, setAddedAuthors] = useState(
		course.authors.map((authorId) =>
			authors.find((author) => author.id === authorId)
		)
	);

	const token = (useSelector(getLoggedInUser) as TUser).token;

	const onCreateAction = async (course) => {
		const newCourse: TCourse = {
			title: course.titleInput,
			duration: parseInt(course.durationInput),
			description: course.descriptionInput,
			authors: addedAuthors.map((addedAuthor) => {
				return addedAuthor.id;
			}),
		};
		if (location.pathname.includes('update')) {
			await dispatch(
				UpdateCourse({ course: { ...newCourse, id: courseId }, token })
			);
		} else {
			await dispatch(CreateCourseAction({ course: newCourse, token }));
		}
		nav('/courses');
	};

	const onCancelAction = () => {
		nav('/courses');
	};

	return (
		<div className='edit-create-course'>
			<h3 className='edit-create-course-title'>Course Edit/Create Page</h3>
			<form
				onSubmit={handleSubmit(onCreateAction)}
				className='edit-create-course-form'
			>
				<div className='edit-create-course-form-head'>Main Info</div>
				<div className='edit-create-course-form-title'>
					<Label className={labelClass} text='Title' />
					<Input
						className={inputClass}
						placeholder={placeholder}
						{...titleInput}
					/>
					{errors[titleInput.name] && (
						<span className='error-message'>
							{errors[titleInput.name].message as string}
						</span>
					)}
				</div>
				<div className='edit-create-course-form-description'>
					<Label className={labelClass} text='Description' />
					<Textarea
						className={textareaClass}
						placeholder={placeholder}
						{...descriptionInput}
					/>
					{errors[descriptionInput.name] && (
						<span className='error-message'>
							{errors[descriptionInput.name].message as string}
						</span>
					)}
				</div>
				<div className='edit-create-course-form-additional-info'>
					<div className='edit-create-course-form-additional-info-left'>
						<div className='edit-create-course-form-additional-info-left-duration'>
							<div className='edit-create-course-form-additional-info-left-duration-head'>
								Duration
							</div>
							<Label className={labelClass} text='Duration' />
							<div className='edit-create-course-form-additional-info-left-duration-inputs'>
								<Input
									className={inputClass}
									placeholder={placeholder}
									{...durationInput}
									type='number'
								/>
								{errors[durationInput.name] && (
									<span className='error-message'>
										{errors[durationInput.name].message as string}
									</span>
								)}
								<div className='edit-create-course-form-additional-info-left-duration-inputs-hours'>
									{hours} hours
								</div>
							</div>
						</div>
					</div>
					<AuthorInputs
						addedAuthors={addedAuthors}
						setAddedAuthors={setAddedAuthors}
					/>
				</div>
			</form>
			<div className='edit-create-course-buttons'>
				<Button text='cancel' onClick={onCancelAction} />
				<Button
					text='create course'
					onClick={handleSubmit((course) => onCreateAction(course))}
				/>
			</div>
		</div>
	);
};

export { CourseForm };
