import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { getCart, removeFromCart } from "../services/operations/cartAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { settotalItems } from "../slices/cartSlice";

function Cart() {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cartCourses, setCartCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);

    const loadCart = async () => {
        setLoading(true);
        const response = await getCart(token);
        setCartCourses(response.courses || []);
        dispatch(settotalItems(response.totalItems || 0));
        localStorage.setItem("totalItems", JSON.stringify(response.totalItems || 0));
        setLoading(false);
    };

    useEffect(() => {
        if (token) {
            loadCart();
        }
    }, [token]);

    const totalPrice = cartCourses.reduce(
        (total, course) => total + Number(course.price || 0),
        0
    );

    const handleRemoveFromCart = async (courseId) => {
        const response = await removeFromCart(courseId, token);

        if (response.success) {
            const updatedCourses = cartCourses.filter((course) => course._id !== courseId);
            setCartCourses(updatedCourses);
            dispatch(settotalItems(response.totalItems));
            localStorage.setItem("totalItems", JSON.stringify(response.totalItems));
        }
    };

    const handleBuyAll = async () => {
        if (cartCourses.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setBuying(true);
        const courseIds = cartCourses.map((course) => course._id);
        await buyCourse(token, courseIds, user, navigate, dispatch);
        setBuying(false);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-900">
                <div className="text-lg text-gray-300">Loading cart...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">My Cart</h1>
                    <p className="mt-2 text-gray-400">
                        {cartCourses.length > 0
                            ? `${cartCourses.length} course(s) in your cart`
                            : "Your cart is empty"}
                    </p>
                </div>

                {cartCourses.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-700 bg-gray-800 px-6 text-center">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-700 text-4xl">
                            🛒
                        </div>
                        <h2 className="text-2xl font-semibold text-white">Your cart is empty</h2>
                        <p className="mt-2 max-w-md text-gray-400">
                            Looks like you haven't added any courses to your cart yet.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-6 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-500"
                        >
                            Explore Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

                        <div className="space-y-5">
                            {cartCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="flex flex-col gap-5 rounded-2xl border border-gray-700 bg-gray-800 p-5 transition hover:border-gray-600 sm:flex-row"
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-48 w-full rounded-xl object-cover sm:h-32 sm:w-52"
                                    />

                                    <div className="flex flex-1 flex-col">
                                        <h2 className="text-xl font-semibold text-white">
                                            {course.courseName}
                                        </h2>
                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
                                            {course.courseDescription}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-4">
                                            <span className="text-xl font-bold text-yellow-400">
                                                ₹{course.price}
                                            </span>
                                            <button
                                                onClick={() => handleRemoveFromCart(course._id)}
                                                className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-fit rounded-2xl border border-gray-700 bg-gray-800 p-6 lg:sticky lg:top-6">
                            <h2 className="text-xl font-semibold text-white">Order Summary</h2>
                            <div className="my-5 h-px bg-gray-700" />

                            <div className="flex justify-between text-gray-400">
                                <span>Courses</span>
                                <span>{cartCourses.length}</span>
                            </div>

                            <div className="mt-3 flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <div className="my-5 h-px bg-gray-700" />

                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-white">Total</span>
                                <span className="text-2xl font-bold text-yellow-400">₹{totalPrice}</span>
                            </div>

                            <button
                                onClick={handleBuyAll}
                                disabled={buying}
                                className="mt-6 w-full rounded-xl bg-yellow-400 px-6 py-3.5 font-bold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {buying ? "Processing..." : `Buy All • ₹${totalPrice}`}
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-500">
                                Secure payment powered by Razorpay
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
