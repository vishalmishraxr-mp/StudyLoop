import { apiConnector } from "../apiConnector";
import { courseEndpoints, tagEndpoints, categories } from "../apis";
import { toast } from "react-hot-toast";

const {
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    DELETE_COURSE_API,
    CHANGE_COURSE_STATUS_API,
    ADD_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    ADD_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
} = courseEndpoints;

const { SHOW_ALL_TAGS_API } = tagEndpoints;
const { CATEGORIES_API } = categories;

function authHeader(token) {
    return { Authorization: `Bearer ${token}` };
}

export async function getAllCategories() {
    try {
        const response = await apiConnector("GET", CATEGORIES_API);
        return response.data;
    } catch (error) {
        toast.error("Could not load categories");
        return { success: false, categories: [] };
    }
}

export async function getAllTags() {
    try {
        const response = await apiConnector("GET", SHOW_ALL_TAGS_API);
        return response.data;
    } catch (error) {
        toast.error("Could not load tags");
        return { success: false, tags: [] };
    }
}

export async function createCourse(formData, token) {
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, authHeader(token));

        if (response.data.success) {
            toast.success(response.data.message || "Course created successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not create course";
        toast.error(message);
        return { success: false, message };
    }
}

export async function updateCourse(formData, token) {
    try {
        const response = await apiConnector("PUT", UPDATE_COURSE_API, formData, authHeader(token));

        if (response.data.success) {
            toast.success(response.data.message || "Course updated successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not update course";
        toast.error(message);
        return { success: false, message };
    }
}

export async function deleteCourse(courseId, token) {
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, { courseId }, authHeader(token));

        if (response.data.success) {
            toast.success(response.data.message || "Course deleted successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not delete course";
        toast.error(message);
        return { success: false, message };
    }
}

export async function changeCourseStatus(courseId, status, token) {
    try {
        const response = await apiConnector(
            "PUT",
            CHANGE_COURSE_STATUS_API,
            { courseId, status },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success(response.data.message || "Course status updated");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not update course status";
        toast.error(message);
        return { success: false, message };
    }
}

export async function addSection(sectionName, courseId, token) {
    try {
        const response = await apiConnector(
            "POST",
            ADD_SECTION_API,
            { sectionName, courseId },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success(response.data.message || "Section added");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not add section";
        toast.error(message);
        return { success: false, message };
    }
}

export async function updateSection(sectionId, sectionName, token) {
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_SECTION_API,
            { sectionId, sectionName },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success(response.data.message || "Section updated");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not update section";
        toast.error(message);
        return { success: false, message };
    }
}

export async function deleteSection(sectionId, token) {
    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_SECTION_API}/${sectionId}`,
            null,
            authHeader(token)
        );

        if (response.data.success) {
            toast.success(response.data.message || "Section deleted");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not delete section";
        toast.error(message);
        return { success: false, message };
    }
}

export async function addSubSection(formData, token) {
    try {
        const response = await apiConnector("POST", ADD_SUBSECTION_API, formData, authHeader(token));

        if (response.data.success) {
            toast.success(response.data.message || "Lecture added");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not add lecture";
        toast.error(message);
        return { success: false, message };
    }
}

export async function updateSubSection(formData, token) {
    try {
        const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, formData, authHeader(token));

        if (response.data.success) {
            toast.success(response.data.message || "Lecture updated");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not update lecture";
        toast.error(message);
        return { success: false, message };
    }
}

export async function deleteSubSection(subSectionId, token) {
    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_SUBSECTION_API}/${subSectionId}`,
            null,
            authHeader(token)
        );

        if (response.data.success) {
            toast.success(response.data.message || "Lecture deleted");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Could not delete lecture";
        toast.error(message);
        return { success: false, message };
    }
}
