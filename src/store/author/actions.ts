import { AuthorActionTypes } from './types.js';
import { Author } from 'src/shared.types.js';

interface SaveAuthors {
	type: AuthorActionTypes.SAVE_AUTHORS;
	payload: Author[];
}

interface AddAuthor {
	type: AuthorActionTypes.ADD_AUTHOR;
	payload: Author[];
}

export type AuthorsAction = SaveAuthors | AddAuthor;
