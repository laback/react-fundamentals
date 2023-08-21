import React, { useMemo, useContext } from 'react';
import { DataContext } from 'src/App';

const getAuthorById = (authorId) => {
	const authors = useContext(DataContext).authors;

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
