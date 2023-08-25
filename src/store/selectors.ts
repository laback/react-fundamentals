import { RootState } from '.';

export const getLoggedInUser = (state: RootState) => state.user.value;

export const getCourses = (state: RootState) => state.courses.value;
export const getIsCoursesLoaded = (state: RootState) => state.courses.isLoaded;
export const getIsCoursesLoading = (state: RootState) =>
	state.courses.isLoading;

export const getAuthors = (state: RootState) => state.authors.value;
export const getIsAuthorsLoaded = (state: RootState) => state.authors.isLoaded;
export const getIsAuthorsLoading = (state: RootState) =>
	state.authors.isLoading;
