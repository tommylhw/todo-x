import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import CoursesSlice from './CoursesSlice';

import { combineReducers } from 'redux';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    courses: CoursesSlice,
  },  
});

const rootReducer = combineReducers({
  auth: AuthSlice,
  courses: CoursesSlice,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
