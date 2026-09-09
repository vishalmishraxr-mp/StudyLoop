import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    entireCourseData: {},
    completedLectures: [],
    totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState: initialState,
    reducers: {
        setCourseSectionData(state, value) {
            state.courseSectionData = value.payload;
        },
        setEntireCourseData(state, value) {
            state.entireCourseData = value.payload;
        },
        setCompletedLectures(state, value) {
            state.completedLectures = value.payload;
        },
        setTotalNoOfLectures(state, value) {
            state.totalNoOfLectures = value.payload;
        },
    },
});

export const {
    setCourseSectionData,
    setEntireCourseData,
    setCompletedLectures,
    setTotalNoOfLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
