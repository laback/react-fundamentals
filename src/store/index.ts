import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: rootReducer,
});
type RootState = ReturnType<typeof store.getState>;
export { store, RootState };
