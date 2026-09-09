import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ThumbnailImg from "../../../asset/images/ThumbnailImg.png";
import { FiShare2 } from "react-icons/fi";

import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

import ACCOUNT_TYPE from "../../../services/utils/constants";
import { settotalItems } from "../../../slices/cartSlice";
import { addToCart } from "../../../services/operations/cartAPI";

function CardDetailCourse({
    course,
    setConfirmationModal,
    handleBuyCourse,
}) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        _id: courseId,
        price: CurrentPrice = 0,
        studentsEnrolled = [],
        thumbnail,
    } = course || {};

    // ObjectId-safe enrollment check
    const isEnrolled =
        Boolean(user?._id) &&
        studentsEnrolled.some(
            (studentId) =>
                studentId?.toString() === user?._id?.toString()
        );

    const handleAddToCart = async () => {
        // Instructor cannot purchase courses
        if (
            user &&
            user.accountType === ACCOUNT_TYPE.INSTRUCTOR
        ) {
            toast.error(
                "You are an instructor, you can't buy a course!"
            );
            return;
        }

        // Login required
        if (!token) {
            setConfirmationModal({
                text1: "You are not logged in",
                text2: "Please login to add to cart",
                btn1Text: "Login",
                btn2Text: "Cancel",

                btn1Handler: () => {
                    setConfirmationModal(null);
                    navigate("/login");
                },

                btn2Handler: () => {
                    setConfirmationModal(null);
                },
            });

            return;
        }

        if (!courseId) {
            toast.error("Course information is missing");
            return;
        }

        try {
            const response = await addToCart(
                courseId,
                token
            );

            if (response?.success) {
                dispatch(
                    settotalItems(response.totalItems)
                );

                localStorage.setItem(
                    "totalItems",
                    JSON.stringify(response.totalItems)
                );

                toast.success(
                    response.message ||
                        "Course added to cart"
                );
            } else {
                toast.error(
                    response?.message ||
                        "Could not add course to cart"
                );
            }
        } catch (error) {
            console.error("Add to cart error:", error);

            toast.error(
                "Something went wrong while adding to cart"
            );
        }
    };

    const handleShare = async () => {
        try {
            copy(window.location.href);

            toast.success(
                "Course link copied to clipboard"
            );
        } catch (error) {
            console.error("Share error:", error);

            toast.error("Could not copy course link");
        }
    };

    const handleGoToCourse = () => {
        navigate("/dashboard/enrolled-courses");
    };

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">

            {/* Course Thumbnail */}
            <div className="p-3">
                <img
                    src={thumbnail || ThumbnailImg}
                    alt={
                        course?.courseName
                            ? `${course.courseName} thumbnail`
                            : "Course thumbnail"
                    }
                    className="h-[220px] w-full rounded-xl object-cover"
                />
            </div>

            {/* Course Details */}
            <div className="px-5 pb-5">

                {/* Price */}
                <div className="mb-5">
                    <p className="text-sm text-gray-500">
                        Course Price
                    </p>

                    <p className="text-3xl font-bold text-gray-900">
                        ₹{CurrentPrice}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">

                    {/* Buy / Go To Course */}
                    <button
                        onClick={
                            isEnrolled
                                ? handleGoToCourse
                                : handleBuyCourse
                        }
                        className="w-full rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-gray-900 transition hover:bg-yellow-500 active:scale-[0.99]"
                    >
                        {isEnrolled
                            ? "Go To Course"
                            : "Buy Now"}
                    </button>

                    {/* Add To Cart */}
                    {!isEnrolled && (
                        <button
                            onClick={handleAddToCart}
                            className="w-full rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 active:scale-[0.99]"
                        >
                            Add To Cart
                        </button>
                    )}
                </div>

                {/* Money Back */}
                <div className="mt-5 text-center">
                    <p className="text-sm text-gray-600">
                        30 Days Money Back Guarantee
                    </p>
                </div>

                {/* Share */}
                <div className="mt-5">
                    <button
                        onClick={handleShare}
                        className="group flex w-full items-center justify-center gap-2 rounded-md border border-yellow-500 px-6 py-3 font-semibold text-yellow-600 transition-all duration-200 hover:bg-yellow-400 hover:text-black"
                    >
                        <FiShare2
                            className="text-lg transition-transform duration-200 group-hover:scale-110"
                        />

                        Share Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardDetailCourse;
