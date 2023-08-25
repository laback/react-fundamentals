import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthors } from 'src/store/selectors';

const AuthorItem = ({ authorId, button }) => {
	const author = useSelector(getAuthors).find(
		(author) => author.id === authorId
	);

	return (
		<div className='author-item'>
			<div className='author-item-name'>{author.name} + </div>
			{button}
		</div>
	);
};

export { AuthorItem };
