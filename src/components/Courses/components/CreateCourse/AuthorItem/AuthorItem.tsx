import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthors } from 'src/store/selectors';

const getAuthorById = (authorId) => {
	const authors = useSelector(getAuthors);

	for (const author of authors) {
		if (author.id == authorId) {
			return author;
		}
	}
};

const AuthorItem = ({ authorId, button }) => {
	const author = getAuthorById(authorId);

	return (
		<div className='author-item'>
			<div className='author-item-name'>{author.name} + </div>
			{button}
		</div>
	);
};

export { AuthorItem };
