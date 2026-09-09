import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { GET_USER_DETAILS_API, UPDATE_PROFILE_API, DELETE_PROFILE_API } = profileEndpoints;

export async function getUserDetails(token) {
    try {
        const response = await apiConnector(
            "GET",
            GET_USER_DETAILS_API,
            null,
            { Authorization: `Bearer ${token}` }
        );

        return response.data;

    } catch (error) {
        const message = error.response?.data?.message || "Could not fetch profile details";
        toast.error(message);
        return { success: false, message };
    }
}

export async function updateProfile(profileData, token) {
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_PROFILE_API,
            profileData,
            { Authorization: `Bearer ${token}` }
        );

        if (response.data.success) {
            toast.success(response.data.message || "Profile updated successfully");
        }

        return response.data;

    } catch (error) {
        const message = error.response?.data?.message || "Could not update profile";
        toast.error(message);
        return { success: false, message };
    }
}

export async function deleteProfile(token) {
    try {
        const response = await apiConnector(
            "DELETE",
            DELETE_PROFILE_API,
            null,
            { Authorization: `Bearer ${token}` }
        );

        if (response.data.success) {
            toast.success(response.data.message || "Account deleted successfully");
        }

        return response.data;

    } catch (error) {
        const message = error.response?.data?.message || "Could not delete account";
        toast.error(message);
        return { success: false, message };
    }
}
