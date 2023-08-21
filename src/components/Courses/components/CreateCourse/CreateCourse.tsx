import React, { useContext, useEffect, useState } from 'react';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Textarea } from 'src/common/Textarea/Textarea';
import { toHoursAndMinutes } from 'src/constants';
import { useForm } from 'react-hook-form';
import { Button } from 'src/common/Button/Button';
import { AuthorItem } from './AuthorItem/AuthorItem';
import { v4 as uuid } from 'uuid';
import { DataContext } from 'src/App';
import { useNavigate } from 'react-router-dom';

const labelClass = 'edit-create-course-form-label';

const textareaClass = 'edit-create-course-form-textarea';

const buttonClass = 'edit-create-course-button';
const trashButtonClass = 'remove-author-button';
const addButtonClass = 'add-to-course-button';

const inputClass = 'edit-create-course-form-input';
const placeholder = 'Input text';

let newAuthor;
let addedAuthorsItems = [];
let authorsToAddItems = [];

const removeAuthor = (authors, authorId, setAuthors) => {
	const author = getAuthorById(authors, authorId);
	const index = authors.indexOf(author, 0);
	if (index > -1) {
		authors.splice(index, 1);
	}
	setAuthors(authors);
};

const getAuthorById = (authors, authorId) => {
	for (const author of authors) {
		if (author.id == authorId) {
			return author;
		}
	}
};

const convertDate = (date) => {
	const splittedDate = date.split('/');
	console.log(splittedDate);
	return splittedDate[1] + '/' + splittedDate[0] + '/' + splittedDate[2];
};

const CreateCourse = () => {
	const nav = useNavigate();
	const {
		register,
		handleSubmit,
		watch,
		resetField,
		formState: { errors },
	} = useForm();

	const context = useContext(DataContext);
	const setCourses = context.setCourses;
	const authors = context.authors;
	const setAuthors = context.setAuthors;

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

	const authorInput = register('authorInput', {
		minLength: {
			value: 2,
			message: 'Author name should contains at list 2 characters',
		},
	});
	const authorWatch = watch(authorInput.name);

	const [addedAuthors, setAddedAuthors] = useState([]);
	const [authorsToAdd, setAuthorsToAdd] = useState(authors);

	const onCreate = (course) => {
		const newCourse = {
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
	const onCreateAuthorClick = () => {
		console.log('hello1');
		newAuthor = {
			id: uuid(),
			name: authorWatch,
		};
		setAddedAuthors((prevValue) => {
			return [...prevValue, newAuthor];
		});
		setAuthors((prevValue) => {
			return [...prevValue, newAuthor];
		});
		resetField(authorInput.name);
	};

	const onDeleteAuthorAction = (authorId) => {
		removeAuthor([...addedAuthors], authorId, setAddedAuthors);
		setAuthorsToAdd((prevValue) => {
			return [...prevValue, getAuthorById(authors, authorId)];
		});
	};

	const onAddAuthorAction = (authorId) => {
		removeAuthor([...authorsToAdd], authorId, setAuthorsToAdd);
		setAddedAuthors((prevValue) => {
			return [...prevValue, getAuthorById(authors, authorId)];
		});
	};

	useEffect(() => {
		addedAuthorsItems = addedAuthors.map((addedAuthor) => {
			const deleteButton = (
				<Button
					onClick={() => onDeleteAuthorAction(addedAuthor.id)}
					className={trashButtonClass}
					type='button'
				/>
			);
			return (
				<AuthorItem
					authorId={addedAuthor.id}
					key={addedAuthor.id}
					button={deleteButton}
				/>
			);
		});

		authorsToAddItems = authorsToAdd.map((authorsToAdd) => {
			const deleteButton = (
				<Button
					onClick={() => onAddAuthorAction(authorsToAdd.id)}
					className={addButtonClass}
					text='add'
					type='button'
				/>
			);
			return (
				<AuthorItem
					authorId={authorsToAdd.id}
					key={authorsToAdd.id}
					button={deleteButton}
				/>
			);
		});
	}, [authors, addedAuthors, authorsToAdd]);
	return (
		<div className='edit-create-course'>
			<h3 className='edit-create-course-title'>Course Edit/Create Page</h3>
			<form
				onSubmit={handleSubmit(onCreate)}
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
						<div className='edit-create-course-form-additional-info-left-authors'>
							<div className='edit-create-course-form-additional-info-left-authors-head'>
								Authors
							</div>
							<Label className={labelClass} text='Author name' />
							<div className='edit-create-course-form-additional-info-left-authors-inputs'>
								<Input
									className={inputClass}
									placeholder={placeholder}
									{...authorInput}
								/>
								<Button
									text='create author'
									className={buttonClass}
									onClick={onCreateAuthorClick}
									type='button'
								/>
							</div>
							<Label className={labelClass} text='Author List' />
							<div className='edit-create-course-form-additional-info-left-authors-list'>
								{addedAuthorsItems}
							</div>
						</div>
					</div>
					<div className='edit-create-course-form-additional-info-right'>
						<div className='edit-create-course-form-additional-info-right-head'>
							Course Authors
						</div>
						<div className='edit-create-course-form-additional-info-right-list'>
							{authorsToAddItems}
						</div>
					</div>
				</div>
			</form>
			<div className='edit-create-course-buttons'>
				<Button text='cancel' />
				<Button
					type='submit'
					text='create course'
					onClick={handleSubmit((course) => onCreate(course))}
				/>
			</div>
		</div>
	);
};

export { CreateCourse };
