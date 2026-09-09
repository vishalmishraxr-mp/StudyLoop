import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const { COURSE_DETAILS_API, CREATE_RATING_API } = courseEndpoints;

export const fetchCourseDetails = async (courseId) => {
    try {

        const response = await apiConnector(
            "POST",
            COURSE_DETAILS_API,
            {
                courseId: courseId,
            }
        );


        return response.data;

    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Could not fetch course details",
        };
    }
};

export const getFullDetailsOfCourse = async (courseId) => {
    try {

        const response = await apiConnector(
            "POST",
            COURSE_DETAILS_API,
            {
                courseId: courseId,
            }
        );

        return response.data;

    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Could not fetch full course details",
        };
    }
};

export const createRating = async ({ courseId, rating, review }, token) => {
    try {

        const response = await apiConnector(
            "POST",
            CREATE_RATING_API,
            {
                courseId,
                rating,
                review,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        return response.data;

    } catch (error) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Could not submit review",
        };
    }
};