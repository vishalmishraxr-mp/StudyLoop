
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThumbnailImg from "../../../asset/images/ThumbnailImg.png";
import { FiShare2 } from "react-icons/fi";
import copy from 'copy-to-clipboard';
import {toast} from "react-hot-toast";
import ACCOUNT_TYPE from "../../../services/utils/constants";
import { settotalItems } from "../../../slices/cartSlice";
import { addToCart } from "../../../services/operations/cartAPI";

function CardDetailCourse({
    course,
    setConfirmationModal,
    handleBuyCourse
}) {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const {
    price: CurrentPrice,
    studentEnrolled = [],
} = course || {};

    const isEnrolled =
        user?._id && studentEnrolled.includes(user._id);

         const { token } = useSelector((state) => state.auth);
         const dispatch = useDispatch();
    const handleAddToCart = async () => {
                if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
                    toast.error("You are an instructor, you can't buy a course!");
                    return;
                }

                if (!token) {
                    setConfirmationModal({
                    text1: "You are not logged in",
                    text2: "Please login to add to cart",
                    btn1Text: "Login",
                    btn2Text: "Cancel",
                    btn1Handler: () => navigate("/login"),
                    btn2Handler: () => setConfirmationModal(null),
                });

                return;
            }

            const response = await addToCart(course._id, token);

            if (response.success) {
                dispatch(settotalItems(response.totalItems));

                localStorage.setItem(
                    "totalItems",
                    JSON.stringify(response.totalItems)
                );
            }
        };

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200">

            {/* Course Thumbnail */}
            <div className="p-3">
                <img
                    src={ThumbnailImg}
                    alt="Course thumbnail"
                    className="h-[220px] w-full object-cover rounded-xl"
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
                                ? () =>
                                      navigate(
                                          "/dashboard/enrolled-courses"
                                      )
                                : handleBuyCourse
                        }
                        className="w-full rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-gray-900 transition hover:bg-yellow-500"
                    >
                        {isEnrolled
                            ? "Go To Course"
                            : "Buy Now"}
                    </button>

                    {/* Add To Cart */}
                    {!isEnrolled && (
                        <button
                            onClick={handleAddToCart}
                            className="w-full rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Add To Cart
                        </button>
                    )}
                </div>
                <div className="text-black mt-5">
                    <p>30 Days Money Back Gurantee</p>
                </div>
                <div className="mt-5">
                    <button onClick={handleShare}
                        className="group flex items-center gap-2 rounded-md border border-yellow-400 
                                px-6 py-3 font-semibold text-yellow-400 transition-all duration-200 
                                hover:bg-yellow-400 hover:text-black"
                    >
                        <FiShare2
                            className="text-lg transition-transform duration-200 
                                    group-hover:scale-110"
                        />
                        Share
                    </button>
                </div>
            </div>
        </div>

    );
}

export default CardDetailCourse;