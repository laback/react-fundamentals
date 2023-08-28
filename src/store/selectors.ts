import { TUser } from 'src/shared.types';
import { RootState } from '.';

export const getLoggedInUser = (state: RootState) => state.user.value as TUser;
export const getIsUserLoaded = (state: RootState) => state.user.isLoaded;
export const getIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getIsAdmin = (state: RootState) =>
	(state.user.value as TUser).role == 'admin';
export const getToken = (state: RootState) => (state.user.value as TUser).token;

export const getCourses = (state: RootState) => state.courses.value;
export const getIsCoursesLoaded = (state: RootState) => state.courses.isLoaded;

export const getAuthors = (state: RootState) => state.authors.value;
export const getIsAuthorsLoaded = (state: RootState) => state.authors.isLoaded;
