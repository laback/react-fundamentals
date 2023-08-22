import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Textarea } from 'src/common/Textarea/Textarea';
import { toHoursAndMinutes } from 'src/constants';
import { useForm } from 'react-hook-form';
import { Button } from 'src/common/Button/Button';
import { v4 as uuid } from 'uuid';
import { DataContext } from 'src/App';
import { useNavigate } from 'react-router-dom';
import { AuthorInputs } from './AuthorInputs/AuthorInputs';
import { Course } from 'src/shared.types';

const labelClass = 'edit-create-course-form-label';

const textareaClass = 'edit-create-course-form-textarea';

const inputClass = 'edit-create-course-form-input';
const placeholder = 'Input text';

const convertDate = (date) => {
	const splittedDate = date.split('/');
	return splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2];
};

const CreateCourse = () => {
	const nav = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const context = useContext(DataContext);
	const setCourses = context.setCourses;

	const durationInput = register('durationInput', {
		required: 'Duration is required',
		min: {
			value: 1,
			message: 'Duration must me more than 0',
		},
	});
	const hoursWatch = watch(durationInput.name, '0');
	const [hours, setHours] = useState('00:00');
	useEffect(() => {
		setHours(toHoursAndMinutes(hoursWatch));
	}, [hoursWatch]);

	const titleInput = register('titleInput', {
		required: 'Title is required',
		minLength: {
			value: 2,
			message: 'Title should contains at list 2 characters',
		},
	});
	const descriptionInput = register('descriptionInput', {
		required: 'Description is required',
		minLength: {
			value: 2,
			message: 'Description should contains at list 2 characters',
		},
	});

	const [addedAuthors, setAddedAuthors] = useState([]);

	const onCreateAction = (course) => {
		const newCourse: Course = {
			id: uuid(),
			title: course.titleInput,
			duration: course.durationInput,
			creationDate: convertDate(new Date().toLocaleDateString()),
			description: course.descriptionInput,
			authors: addedAuthors.map((addedAuthor) => {
				return addedAuthor.id;
			}),
		};
		console.log(newCourse);
		setCourses((prevValue) => {
			return [...prevValue, newCourse];
		});
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
							{errors[titleInput.name].message}
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
							{errors[descriptionInput.name].message}
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
										{errors[durationInput.name].message}
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

export { CreateCourse };
