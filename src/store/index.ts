import { createStore } from 'redux';

import { rootReducer } from './rootReducer';
import { initCoursesState } from './course/reducer';

const appInitialState = {
	courses: initCoursesState,
};
const store = createStore(rootReducer, appInitialState);

export default store;
