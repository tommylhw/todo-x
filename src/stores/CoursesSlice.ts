import { createSlice } from "@reduxjs/toolkit";

interface COURSES_INTERFACE {
  courses: any[];
}

const initialState: COURSES_INTERFACE = {
  courses: [],
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    }
  }
});

export const {
  setCourses
} = coursesSlice.actions;

export const selectCourses = (state: any) => state.courses.courses;

export default coursesSlice.reducer;