const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
    CATEGORIES_API: BASE_URL + "/category/showAllCategories",
    CREATE_CATEGORY_API: BASE_URL + "/category/create",
    UPDATE_CATEGORY_API: BASE_URL + "/category/update",
    DELETE_CATEGORY_API: BASE_URL + "/category/delete",
    CATEGORY_PAGE_DETAILS_API: BASE_URL + "/category/categoryPageDetails",
};

export const auth = {
    SENDOTP_API: BASE_URL + "/auth/send-otp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
    LOGIN_API: BASE_URL + "/auth/login",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const studetnEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_MAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
};

export const cartEndpoints = {
    ADD_TO_CART_API: BASE_URL + "/cart/add",
    GET_CART_API: BASE_URL + "/cart",
    REMOVE_FROM_CART_API: BASE_URL + "/cart/remove",
};

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/get-user-details",
    UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
    DELETE_PROFILE_API: BASE_URL + "/profile/delete-profile",
};

export const courseEndpoints = {
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    CREATE_COURSE_API: BASE_URL + "/course/create",
    UPDATE_COURSE_API: BASE_URL + "/course/updateCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    CHANGE_COURSE_STATUS_API: BASE_URL + "/course/changeCourseStatus",
    ADD_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    ADD_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
};

export const tagEndpoints = {
    SHOW_ALL_TAGS_API: BASE_URL + "/tag/showAllTags",
    CREATE_TAG_API: BASE_URL + "/tag/create",
    UPDATE_TAG_API: BASE_URL + "/tag/update",
    DELETE_TAG_API: BASE_URL + "/tag/delete",
};

export const adminEndpoints = {
    ADMIN_STATS_API: BASE_URL + "/admin/stats",
    GET_ALL_USERS_API: BASE_URL + "/admin/users",
    UPDATE_USER_ROLE_API: BASE_URL + "/admin/user/role",
    DELETE_USER_API: BASE_URL + "/admin/user/delete",
    GET_ALL_COURSES_ADMIN_API: BASE_URL + "/admin/courses",
};