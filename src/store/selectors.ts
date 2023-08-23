import { RootState } from '.';

export const getLoggedInUser = (state: RootState) => state.user.value;

export const getCourses = (state: RootState) => state.courses.value;
export const getIsCoursesLoadingStarted = (state: RootState) =>
	state.courses.isLoadingStarted;

export const getAuthors = (state: RootState) => state.authors.value;
export const getIsAuthorsLoadingStarted = (state: RootState) =>
	state.authors.isLoadingStarted;
