import { apiConnector } from "../apiConnector";
import { cartEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const { ADD_TO_CART_API, GET_CART_API, REMOVE_FROM_CART_API } = cartEndpoints;

export async function addToCart(courseId, token) {
    try {
        const response = await apiConnector(
            "POST",
            ADD_TO_CART_API,
            { courseId },
            { Authorization: `Bearer ${token}` }
        );

        if (!response.data.success) {
            toast.error(response.data.message || "Could not add course to cart");
            return response.data;
        }

        toast.success(response.data.message || "Course added to cart");
        return response.data;

    } catch (error) {
        const message = error.response?.data?.message || "Could not add course to cart";
        toast.error(message);
        return { success: false, message };
    }
}

export async function getCart(token) {
    try {
        const response = await apiConnector(
            "GET",
            GET_CART_API,
            null,
            { Authorization: `Bearer ${token}` }
        );

        return response.data;

    } catch (error) {
        const message = error.response?.data?.message || "Failed to load cart";
        toast.error(message);
        return { success: false, message, courses: [], totalItems: 0 };
    }
}

export async function removeFromCart(courseId, token) {
    try {
        const response = await apiConnector(
            "DELETE",
            REMOVE_FROM_CART_API,
            { courseId },
            { Authorization: `Bearer ${token}` }
        );

        if (response.data.success) {
            toast.success(response.data.message || "Course removed from cart");
        }

        return response.data;

    } catch (error) {
        const message = error.response?.data?.message || "Failed to remove course";
        toast.error(message);
        return { success: false, message };
    }
}
