import React, { useState } from 'react';
import { Button } from 'src/common/Button/Button';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { Label } from 'src/common/Label/Label';
import { Input } from 'src/common/Input/Input';
import { TAuthor } from 'src/shared.types';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getToken } from 'src/store/selectors';
import { CreateAuthor } from 'src/store/author/actions';

const buttonClass = 'edit-create-course-button';
const trashButtonClass = 'remove-author-button';
const addButtonClass = 'add-to-course-button';
const labelClass = 'edit-create-course-form-label';
const inputClass = 'edit-create-course-form-input';
const placeholder = 'Input text';

const AuthorInputs = ({ addedAuthors, setAddedAuthors }) => {
	const dispatch = useDispatch<any>();
	const authors = useSelector(getAuthors);
	const token = useSelector(getToken);

	const [authorName, setAuthorName] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);

	const onAuthorNameInputChange = (event) => {
		setAuthorName(event.target.value);
	};

	const onCreateAuthorClick = async () => {
		if (authorName.length < 2) {
			setErrorMessage('Author name should contains at least 2 characters');
		} else {
			setErrorMessage(undefined);
			const newAuthor: TAuthor = {
				name: authorName,
			};
			setAuthorName('');
			const addedAuthor: TAuthor = await dispatch(
				CreateAuthor({ author: newAuthor, token: token })
			).unwrap();

			setAddedAuthors((prevValue) => {
				return [...prevValue, addedAuthor];
			});
		}
	};

	const onDeleteAuthorAction = (authorId: string) => {
		setAddedAuthors((prevValue: TAuthor[]) => {
			return prevValue.filter((author) => author.id != authorId);
		});
	};

	const onAddAuthorAction = (authorId: string) => {
		setAddedAuthors((prevValue: TAuthor[]) => {
			return [...prevValue, authors.find((author) => author.id === authorId)];
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
					<div>
						<Input
							className={inputClass}
							placeholder={placeholder}
							value={authorName}
							onChange={(event) => onAuthorNameInputChange(event)}
						/>
						<div className='error-message'>{errorMessage}</div>
					</div>

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
