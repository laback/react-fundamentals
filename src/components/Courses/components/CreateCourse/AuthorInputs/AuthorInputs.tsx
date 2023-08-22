import React, { useContext, useState } from 'react';
import { DataContext } from 'src/App';
import { Button } from 'src/common/Button/Button';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { Label } from 'src/common/Label/Label';
import { Input } from 'src/common/Input/Input';
import { v4 as uuid } from 'uuid';
import { Author } from 'shared.types';

const buttonClass = 'edit-create-course-button';
const trashButtonClass = 'remove-author-button';
const addButtonClass = 'add-to-course-button';
const labelClass = 'edit-create-course-form-label';
const inputClass = 'edit-create-course-form-input';
const placeholder = 'Input text';

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

const AuthorInputs = ({ addedAuthors, setAddedAuthors }) => {
	const context = useContext(DataContext);
	const authors = context.authors;
	const setAuthors = context.setAuthors;

	const [authorName, setAuthorName] = useState('');

	const onAuthorNameInputChange = (event) => {
		setAuthorName(event.target.value);
	};

	const onCreateAuthorClick = () => {
		const newAuthor: Author = {
			id: uuid(),
			name: authorName,
		};
		setAddedAuthors((prevValue) => {
			return [...prevValue, newAuthor];
		});
		setAuthors((prevValue) => {
			return [...prevValue, newAuthor];
		});
	};

	const onDeleteAuthorAction = (authorId) => {
		removeAuthor([...addedAuthors], authorId, setAddedAuthors);
	};

	const onAddAuthorAction = (authorId) => {
		setAddedAuthors((prevValue) => {
			return [...prevValue, getAuthorById(authors, authorId)];
		});
	};

	const addedAuthorsItems = addedAuthors.map((addedAuthor) => {
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
	const authorsToAddItems = authors
		.filter((author) => !addedAuthors.find(({ id }) => author.id === id))
		.map((authorsToAdd) => {
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
	return (
		<div className='edit-create-course-form-additional-info-left-authors-inputs'>
			<div className='edit-create-course-form-additional-info-left-authors'>
				<div className='edit-create-course-form-additional-info-left-authors-head'>
					Authors
				</div>
				<Label className={labelClass} text='Author name' />
				<div className='edit-create-course-form-additional-info-left-authors-inputs'>
					<Input
						className={inputClass}
						placeholder={placeholder}
						value={authorName}
						onChange={(event) => onAuthorNameInputChange(event)}
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
			<div className='edit-create-course-form-additional-info-right'>
				<div className='edit-create-course-form-additional-info-right-head'>
					Course Authors
				</div>
				<div className='edit-create-course-form-additional-info-right-list'>
					{authorsToAddItems}
				</div>
			</div>
		</div>
	);
};

export { AuthorInputs };
