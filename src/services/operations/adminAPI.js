import { apiConnector } from "../apiConnector";
import { adminEndpoints, tagEndpoints, categories } from "../apis";
import { toast } from "react-hot-toast";

const {
    ADMIN_STATS_API,
    GET_ALL_USERS_API,
    UPDATE_USER_ROLE_API,
    DELETE_USER_API,
    GET_ALL_COURSES_ADMIN_API,
} = adminEndpoints;

const { CREATE_TAG_API, UPDATE_TAG_API, DELETE_TAG_API } = tagEndpoints;
const { CREATE_CATEGORY_API, UPDATE_CATEGORY_API, DELETE_CATEGORY_API } = categories;

function authHeader(token) {
    return { Authorization: `Bearer ${token}` };
}

// Fetch Admin Stats
export async function getAdminStats(token) {
    try {
        const response = await apiConnector("GET", ADMIN_STATS_API, null, authHeader(token));
        return response.data;
    } catch (error) {
        toast.error("Could not fetch admin statistics");
        return { success: false };
    }
}

// Fetch All Users
export async function getAllUsers(token, role = "") {
    try {
        const url = role ? `${GET_ALL_USERS_API}?role=${role}` : GET_ALL_USERS_API;
        const response = await apiConnector("GET", url, null, authHeader(token));
        return response.data;
    } catch (error) {
        toast.error("Could not fetch user list");
        return { success: false, users: [] };
    }
}

// Update User Role
export async function updateUserRole(userId, newRole, token) {
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_USER_ROLE_API,
            { userId, newRole },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success(response.data.message || `User role updated to ${newRole}`);
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update user role";
        toast.error(message);
        return { success: false, message };
    }
}

// Delete User
export async function deleteUser(userId, token) {
    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_USER_API,
            { userId },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("User deleted successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete user";
        toast.error(message);
        return { success: false, message };
    }
}

// Get All Platform Courses for Admin
export async function getAllCoursesAdmin(token) {
    try {
        const response = await apiConnector("GET", GET_ALL_COURSES_ADMIN_API, null, authHeader(token));
        return response.data;
    } catch (error) {
        toast.error("Could not fetch platform courses");
        return { success: false, courses: [] };
    }
}

// Create Tag (Admin)
export async function createTag(name, description, token) {
    try {
        const response = await apiConnector(
            "POST",
            CREATE_TAG_API,
            { name, description },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("Tag created successfully!");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to create tag";
        toast.error(message);
        return { success: false, message };
    }
}

// Update Tag (Admin)
export async function updateTag(tagId, name, description, token) {
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_TAG_API,
            { tagId, name, description },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("Tag updated successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update tag";
        toast.error(message);
        return { success: false, message };
    }
}

// Delete Tag (Admin)
export async function deleteTag(tagId, token) {
    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_TAG_API}/${tagId}`,
            null,
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("Tag deleted successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete tag";
        toast.error(message);
        return { success: false, message };
    }
}

// Create Category (Admin)
export async function createCategory(name, description, token) {
    try {
        const response = await apiConnector(
            "POST",
            CREATE_CATEGORY_API,
            { name, description },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("Category created successfully!");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to create category";
        toast.error(message);
        return { success: false, message };
    }
}

// Update Category (Admin)
export async function updateCategory(categoryId, name, description, token) {
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_CATEGORY_API,
            { categoryId, name, description },
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("Category updated successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to update category";
        toast.error(message);
        return { success: false, message };
    }
}

// Delete Category (Admin)
export async function deleteCategory(categoryId, token) {
    try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_CATEGORY_API}/${categoryId}`,
            null,
            authHeader(token)
        );

        if (response.data.success) {
            toast.success("Category deleted successfully");
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to delete category";
        toast.error(message);
        return { success: false, message };
    }
}

